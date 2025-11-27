/**
 * Token Details Module
 * 
 * Fetches detailed token information and historical data from Uniswap v3 subgraphs.
 */

import { queryUniswapV3Subgraph } from './client';
import { isChainSupported, type VaultoChainId } from './subgraphs';
import { getPoolsForToken } from './pools';

/**
 * GraphQL token structure from subgraph
 */
interface GraphQLToken {
  id: string; // Token address (lowercase)
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  derivedETH: string | null;
  derivedUSD: string | null;
}

/**
 * GraphQL TokenDayData structure from subgraph
 */
interface GraphQLTokenDayData {
  date: number; // Unix timestamp
  priceUSD: string;
  totalValueLockedUSD: string;
  volumeUSD: string;
  feesUSD: string;
}

/**
 * GraphQL response structure for token query
 * Using direct token query (single token, not array)
 */
interface TokenResponse {
  token: GraphQLToken | null;
}

/**
 * GraphQL response structure for TokenDayData query
 */
interface TokenDayDataResponse {
  tokenDayDatas: GraphQLTokenDayData[];
}

/**
 * Token query - fetches a single token by address
 * Uses the same pattern as pools query - direct field matching
 * Tries both id and id_in approaches
 */
const TOKEN_BY_ADDRESS_QUERY = `
  query TokenByAddress($id: ID!) {
    token(id: $id) {
      id
      symbol
      name
      decimals
      totalSupply
      volumeUSD
      totalValueLockedUSD
      derivedETH
      derivedUSD
    }
  }
`;

/**
 * TokenDayData query - fetches historical data for a token
 */
const TOKEN_DAY_DATA_QUERY = `
  query TokenDayData($token: String!, $startTime: Int!, $skip: Int!, $first: Int!) {
    tokenDayDatas(
      where: { token: $token, date_gte: $startTime }
      orderBy: date
      orderDirection: asc
      skip: $skip
      first: $first
    ) {
      date
      priceUSD
      totalValueLockedUSD
      volumeUSD
      feesUSD
    }
  }
`;

/**
 * Transformed token details result
 */
export interface TokenDetailsResult {
  address: string; // Lowercased
  symbol: string;
  name: string;
  decimals: number;
  totalSupply: string;
  tvlUSD: number;
  volumeUSD: number;
  derivedETH: string | null;
  derivedUSD: string | null;
  priceUSD: number; // Current price in USD
}

/**
 * Transformed token day data point
 */
export interface TokenHistoryPoint {
  timestamp: number; // Unix timestamp in seconds
  priceUSD: number;
  tvlUSD: number;
  volumeUSD: number;
  feesUSD: number;
}

/**
 * Result with token details and history
 */
export interface TokenDetailsWithHistory {
  chainId: VaultoChainId;
  token: TokenDetailsResult;
  priceHistory: TokenHistoryPoint[];
  tvlHistory: TokenHistoryPoint[];
  volumeHistory: TokenHistoryPoint[];
}

/**
 * Get detailed token information by address.
 * 
 * @param chainId - The chain ID to query
 * @param tokenAddress - The token address (will be lowercased)
 * @returns Token details or null if not found
 */
export async function getTokenDetails(
  chainId: number,
  tokenAddress: string
): Promise<TokenDetailsResult | null> {
  if (!isChainSupported(chainId)) {
    console.debug(`Chain ${chainId} is not supported for token details`);
    return null;
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    return null;
  }

  const normalizedAddress = tokenAddress.toLowerCase();

  console.log(`[getTokenDetails] chainId=${chainId}, address=${normalizedAddress}`);

  try {
    // Workaround: Since direct token query doesn't work, get token info from pools
    // getPoolsForToken works, so we'll use it to get token data
    console.log(`[getTokenDetails] Using getPoolsForToken to get token info...`);
    const poolsResult = await getPoolsForToken(chainId, normalizedAddress, 1);
    
    if (!poolsResult.pools || poolsResult.pools.length === 0) {
      console.log(`[getTokenDetails] No pools found for token ${normalizedAddress}, cannot get token info`);
      // Try direct query as fallback
      const response = await queryUniswapV3Subgraph<TokenResponse>(
        chainId,
        TOKEN_BY_ADDRESS_QUERY,
        {
          id: normalizedAddress,
        }
      );
      
      if (response.token) {
        const token = response.token;
        const priceUSD = token.derivedUSD 
          ? parseFloat(token.derivedUSD) 
          : (token.derivedETH ? parseFloat(token.derivedETH) * 2000 : 0);
        
        return {
          address: normalizedAddress,
          symbol: token.symbol || '',
          name: token.name || '',
          decimals: token.decimals || 18,
          totalSupply: token.totalSupply || '0',
          tvlUSD: parseFloat(token.totalValueLockedUSD || '0'),
          volumeUSD: parseFloat(token.volumeUSD || '0'),
          derivedETH: token.derivedETH,
          derivedUSD: token.derivedUSD,
          priceUSD,
        };
      }
      
      return null;
    }
    
    // Extract token info from the first pool
    const firstPool = poolsResult.pools[0];
    const tokenInfo = firstPool.token0.address.toLowerCase() === normalizedAddress 
      ? firstPool.token0 
      : firstPool.token1;
    
    console.log(`[getTokenDetails] Found token via pools: ${tokenInfo.symbol} (${tokenInfo.name})`);
    
    // Now try to get full token data with TVL/volume using direct query
    let fullTokenData: GraphQLToken | null = null;
    try {
      const response = await queryUniswapV3Subgraph<TokenResponse>(
        chainId,
        TOKEN_BY_ADDRESS_QUERY,
        {
          id: normalizedAddress,
        }
      );
      fullTokenData = response.token;
    } catch (queryError) {
      console.log(`[getTokenDetails] Direct query failed, using pool data only`);
    }
    
    // Use token-level TVL from subgraph (authoritative - includes ALL pools, not just top 50-100)
    // Fallback to summing pools if token-level TVL is not available
    let totalTVL = 0;
    if (fullTokenData?.totalValueLockedUSD) {
      totalTVL = parseFloat(fullTokenData.totalValueLockedUSD);
      console.log(`[getTokenDetails] Using token-level TVL: ${totalTVL}`);
    } else {
      // Fallback: sum TVL from fetched pools (may be incomplete if token has >100 pools)
      totalTVL = poolsResult.pools.reduce((sum, pool) => sum + pool.tvlUSD, 0);
      console.log(`[getTokenDetails] Using summed pool TVL (from ${poolsResult.pools.length} pools): ${totalTVL}`);
    }
    
    // Note: volumeUSD here is all-time volume from token entity (not 24h)
    // 24h volume should be calculated from TokenDayData in the API route
    const totalVolume = fullTokenData?.volumeUSD 
      ? parseFloat(fullTokenData.volumeUSD) 
      : poolsResult.pools.reduce((sum, pool) => sum + pool.volumeUSD, 0);
    
    // Calculate price: try fullTokenData first, otherwise default to 0 (will be fixed by API route from history)
    let priceUSD = 0;
    if (fullTokenData?.derivedUSD) {
      priceUSD = parseFloat(fullTokenData.derivedUSD);
    } else if (fullTokenData?.derivedETH) {
      // Estimate price from ETH value (ETH price roughly $2000-3000, use 2500 as average)
      priceUSD = parseFloat(fullTokenData.derivedETH) * 2500;
    }
    
    // If we still don't have a price, try to get from token day data (most recent)
    if (!priceUSD || priceUSD === 0) {
      try {
        const recentDayData = await getTokenDayData(chainId, normalizedAddress, 1); // Just get last day
        if (recentDayData.length > 0) {
          const mostRecent = recentDayData.sort((a, b) => b.timestamp - a.timestamp)[0];
          if (mostRecent.priceUSD && mostRecent.priceUSD > 0) {
            priceUSD = mostRecent.priceUSD;
            console.log(`[getTokenDetails] Using price from day data: ${priceUSD}`);
          }
        }
      } catch (dayDataError) {
        console.log(`[getTokenDetails] Could not fetch day data for price:`, dayDataError);
      }
    }

    return {
      address: normalizedAddress,
      symbol: tokenInfo.symbol || '',
      name: tokenInfo.name || '',
      decimals: tokenInfo.decimals || 18,
      totalSupply: fullTokenData?.totalSupply || '0',
      tvlUSD: totalTVL, // Token-level TVL (authoritative, includes all pools)
      volumeUSD: totalVolume, // All-time volume from token entity (24h volume calculated separately from TokenDayData)
      derivedETH: fullTokenData?.derivedETH || null,
      derivedUSD: fullTokenData?.derivedUSD || null,
      priceUSD, // Will be overridden by API route with most recent from history if 0
    };
  } catch (error) {
    console.error(`[getTokenDetails] Error fetching token details for ${normalizedAddress} on chain ${chainId}:`, error);
    if (error instanceof Error) {
      console.error(`[getTokenDetails] Error message: ${error.message}`);
    }
    return null;
  }
}

/**
 * Get token day data (historical price, TVL, volume) for a token.
 * 
 * @param chainId - The chain ID to query
 * @param tokenAddress - The token address (will be lowercased)
 * @param days - Number of days of history to fetch (default: 30)
 * @returns Array of historical data points
 */
export async function getTokenDayData(
  chainId: number,
  tokenAddress: string,
  days: number = 30
): Promise<TokenHistoryPoint[]> {
  if (!isChainSupported(chainId)) {
    console.debug(`Chain ${chainId} is not supported for token day data`);
    return [];
  }

  if (!tokenAddress || typeof tokenAddress !== 'string') {
    return [];
  }

  const normalizedAddress = tokenAddress.toLowerCase();
  
  // Calculate start time (days ago in seconds)
  const now = Math.floor(Date.now() / 1000);
  const startTime = now - (days * 24 * 60 * 60);

  const allData: GraphQLTokenDayData[] = [];
  let skip = 0;
  const first = 1000; // Max items per query
  let hasMore = true;

  try {
    // Paginate through results if needed
    while (hasMore) {
      const response = await queryUniswapV3Subgraph<TokenDayDataResponse>(
        chainId,
        TOKEN_DAY_DATA_QUERY,
        {
          token: normalizedAddress,
          startTime,
          skip,
          first,
        }
      );

      const tokenDayDatas = response.tokenDayDatas || [];
      allData.push(...tokenDayDatas);

      // Check if we got fewer results than requested (last page)
      if (tokenDayDatas.length < first) {
        hasMore = false;
      } else {
        skip += first;
      }

      // Safety limit to prevent infinite loops
      if (skip > 10000) {
        hasMore = false;
      }
    }

    // Transform to our format
    return allData.map((dayData) => ({
      timestamp: dayData.date,
      priceUSD: parseFloat(dayData.priceUSD || '0'),
      tvlUSD: parseFloat(dayData.totalValueLockedUSD || '0'),
      volumeUSD: parseFloat(dayData.volumeUSD || '0'),
      feesUSD: parseFloat(dayData.feesUSD || '0'),
    }));
  } catch (error) {
    console.error(`Error fetching token day data for ${normalizedAddress} on chain ${chainId}:`, error);
    return [];
  }
}

/**
 * Get complete token details with history.
 * 
 * @param chainId - The chain ID to query
 * @param tokenAddress - The token address (will be lowercased)
 * @param days - Number of days of history to fetch (default: 30)
 * @returns Token details with history or null if token not found
 */
export async function getTokenDetailsWithHistory(
  chainId: number,
  tokenAddress: string,
  days: number = 30
): Promise<TokenDetailsWithHistory | null> {
  const token = await getTokenDetails(chainId, tokenAddress);
  
  if (!token) {
    return null;
  }

  const dayData = await getTokenDayData(chainId, tokenAddress, days);

  // Separate into different history arrays
  const priceHistory: TokenHistoryPoint[] = dayData.map((point) => ({
    timestamp: point.timestamp,
    priceUSD: point.priceUSD,
    tvlUSD: 0, // Not needed for price history
    volumeUSD: 0,
    feesUSD: 0,
  }));

  const tvlHistory: TokenHistoryPoint[] = dayData.map((point) => ({
    timestamp: point.timestamp,
    priceUSD: 0,
    tvlUSD: point.tvlUSD,
    volumeUSD: 0,
    feesUSD: 0,
  }));

  const volumeHistory: TokenHistoryPoint[] = dayData.map((point) => ({
    timestamp: point.timestamp,
    priceUSD: 0,
    tvlUSD: 0,
    volumeUSD: point.volumeUSD,
    feesUSD: 0,
  }));

  return {
    chainId: chainId as VaultoChainId,
    token,
    priceHistory,
    tvlHistory,
    volumeHistory,
  };
}


