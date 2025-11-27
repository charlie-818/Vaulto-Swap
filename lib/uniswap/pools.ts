/**
 * Pool Fetching Module
 * 
 * Fetches pools for a given token from Uniswap v3 subgraphs.
 */

import { queryUniswapV3Subgraph } from './client';
import { isChainSupported, type VaultoChainId } from './subgraphs';

/**
 * GraphQL token structure in pool query
 */
interface GraphQLPoolToken {
  id: string; // Token address (lowercase)
  symbol: string;
  name: string;
  decimals: number;
}

/**
 * GraphQL pool structure from subgraph
 */
interface GraphQLPool {
  id: string; // Pool address (lowercase)
  feeTier: string; // Fee tier in basis points (e.g., "500" = 0.05%)
  liquidity: string;
  sqrtPrice: string;
  tick: string | null;
  totalValueLockedUSD: string;
  volumeUSD: string;
  token0: GraphQLPoolToken;
  token1: GraphQLPoolToken;
}

/**
 * GraphQL pool day data structure
 */
interface GraphQLPoolDayData {
  date: number; // Unix timestamp
  volumeUSD: string;
}

/**
 * GraphQL response structure for pool query
 */
interface PoolsResponse {
  pools: GraphQLPool[];
}

/**
 * GraphQL response structure for pool day data query
 */
interface PoolDayDataResponse {
  poolDayDatas: GraphQLPoolDayData[];
}

/**
 * Transformed pool result
 */
export interface PoolResult {
  poolAddress: string; // Lowercased
  chainId: VaultoChainId;
  feeTierBps: number; // Fee tier in basis points
  liquidity: string;
  sqrtPrice: string;
  tick: number | null;
  tvlUSD: number;
  volumeUSD: number;
  volumeUSD24h: number; // 24-hour volume
  volumeUSD7d: number; // 7-day volume
  token0: {
    address: string; // Lowercased
    symbol: string;
    name: string;
    decimals: number;
  };
  token1: {
    address: string; // Lowercased
    symbol: string;
    name: string;
    decimals: number;
  };
}

/**
 * Result with chain and token address context
 */
export interface PoolsForTokenResult {
  chainId: VaultoChainId;
  tokenAddress: string;
  pools: PoolResult[];
}

/**
 * GraphQL query for fetching pools for a token
 */
const POOLS_FOR_TOKEN_QUERY = `
  query PoolsForToken($token: String!, $first: Int!) {
    pools(
      where: {
        or: [
          { token0: $token }
          { token1: $token }
        ]
      }
      orderBy: totalValueLockedUSD
      orderDirection: desc
      first: $first
    ) {
      id
      feeTier
      liquidity
      sqrtPrice
      tick
      totalValueLockedUSD
      volumeUSD
      token0 {
        id
        symbol
        name
        decimals
      }
      token1 {
        id
        symbol
        name
        decimals
      }
    }
  }
`;

/**
 * GraphQL query for fetching pool day data (for volume history)
 */
const POOL_DAY_DATA_QUERY = `
  query PoolDayData($pool: String!, $startTime24h: Int!, $startTime7d: Int!) {
    poolDayDatas24h: poolDayDatas(
      where: { pool: $pool, date_gte: $startTime24h }
      orderBy: date
      orderDirection: desc
      first: 2
    ) {
      date
      volumeUSD
    }
    poolDayDatas7d: poolDayDatas(
      where: { pool: $pool, date_gte: $startTime7d }
      orderBy: date
      orderDirection: desc
      first: 7
    ) {
      date
      volumeUSD
    }
  }
`;

/**
 * Get 24h and 7d volume for a pool
 */
async function getPoolVolumes(
  chainId: number,
  poolAddress: string
): Promise<{ volume24h: number; volume7d: number }> {
  if (!isChainSupported(chainId)) {
    return { volume24h: 0, volume7d: 0 };
  }

  const normalizedAddress = poolAddress.toLowerCase();
  const now = Math.floor(Date.now() / 1000);
  const startTime24h = now - (24 * 60 * 60);
  const startTime7d = now - (7 * 24 * 60 * 60);

  try {
    const response = await queryUniswapV3Subgraph<{
      poolDayDatas24h: GraphQLPoolDayData[];
      poolDayDatas7d: GraphQLPoolDayData[];
    }>(
      chainId,
      POOL_DAY_DATA_QUERY,
      {
        pool: normalizedAddress,
        startTime24h,
        startTime7d,
      }
    );

    // Sum up 24h volume (last 24 hours)
    const volume24h = response.poolDayDatas24h.reduce(
      (sum, day) => sum + parseFloat(day.volumeUSD || '0'),
      0
    );

    // Sum up 7d volume (last 7 days)
    const volume7d = response.poolDayDatas7d.reduce(
      (sum, day) => sum + parseFloat(day.volumeUSD || '0'),
      0
    );

    return { volume24h, volume7d };
  } catch (error) {
    console.error(`Error fetching pool volumes for ${normalizedAddress} on chain ${chainId}:`, error);
    return { volume24h: 0, volume7d: 0 };
  }
}

/**
 * Get pools for a given token address.
 * 
 * @param chainId - The chain ID to query
 * @param tokenAddress - The token address (will be lowercased)
 * @param limit - Maximum number of pools to return (default: 10)
 * @returns Array of pools sorted by TVL descending, or empty array on error
 */
export async function getPoolsForToken(
  chainId: number,
  tokenAddress: string,
  limit: number = 10
): Promise<PoolsForTokenResult> {
  // Return empty result if chain is not supported
  if (!isChainSupported(chainId)) {
    console.debug(`Chain ${chainId} is not supported for pool queries`);
    return {
      chainId: chainId as VaultoChainId,
      tokenAddress: tokenAddress.toLowerCase(),
      pools: [],
    };
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    return {
      chainId: chainId as VaultoChainId,
      tokenAddress: '',
      pools: [],
    };
  }

  const normalizedAddress = tokenAddress.toLowerCase();

  try {
    const response = await queryUniswapV3Subgraph<PoolsResponse>(
      chainId,
      POOLS_FOR_TOKEN_QUERY,
      {
        token: normalizedAddress,
        first: Math.min(limit, 100), // Cap at 100 for safety
      }
    );

    const pools = await Promise.all(
      (response.pools || []).map(async (pool) => {
        // Fee tier is already in basis points (e.g., "500" = 0.05%)
        const feeTierBps = parseInt(pool.feeTier || '0', 10);
        
        // Get 24h and 7d volumes
        const volumes = await getPoolVolumes(chainId, pool.id);
        
        return {
          poolAddress: pool.id.toLowerCase(), // Ensure lowercase
          chainId: chainId as VaultoChainId,
          feeTierBps,
          liquidity: pool.liquidity || '0',
          sqrtPrice: pool.sqrtPrice || '0',
          tick: pool.tick ? parseInt(pool.tick, 10) : null,
          tvlUSD: parseFloat(pool.totalValueLockedUSD || '0'),
          volumeUSD: parseFloat(pool.volumeUSD || '0'),
          volumeUSD24h: volumes.volume24h,
          volumeUSD7d: volumes.volume7d,
          token0: {
            address: pool.token0.id.toLowerCase(), // Ensure lowercase
            symbol: pool.token0.symbol || '',
            name: pool.token0.name || '',
            decimals: pool.token0.decimals || 18,
          },
          token1: {
            address: pool.token1.id.toLowerCase(), // Ensure lowercase
            symbol: pool.token1.symbol || '',
            name: pool.token1.name || '',
            decimals: pool.token1.decimals || 18,
          },
        };
      })
    );

    return {
      chainId: chainId as VaultoChainId,
      tokenAddress: normalizedAddress,
      pools,
    };
  } catch (error) {
    // Log error but don't throw - return empty array for graceful degradation
    console.error(`Error fetching pools for token ${normalizedAddress} on chain ${chainId}:`, error);
    return {
      chainId: chainId as VaultoChainId,
      tokenAddress: normalizedAddress,
      pools: [],
    };
  }
}

