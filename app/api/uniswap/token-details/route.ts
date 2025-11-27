import { NextRequest, NextResponse } from 'next/server';
import { getTokenDetails, getTokenDayData } from '@/lib/uniswap/tokenDetails';
import { getPoolsForToken } from '@/lib/uniswap/pools';
import { isChainSupported } from '@/lib/uniswap/subgraphs';
import type { TokenDetailsApiResponse, PoolDetails } from '@/lib/types/tokenDetails';

/**
 * GET /api/uniswap/token-details
 * 
 * Fetches detailed token information including price history, TVL, volume, and pools.
 * 
 * Query params:
 * - chainId: number (required)
 * - address: string (required, token address)
 * 
 * Response:
 * {
 *   chainId: number,
 *   token: { ...token data + histories },
 *   pools: [ ...pool data ],
 *   error?: string
 * }
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chainIdParam = searchParams.get('chainId');
    const address = searchParams.get('address');

    // Validate chainId
    const chainId = chainIdParam ? parseInt(chainIdParam, 10) : null;
    if (!chainId || isNaN(chainId)) {
      return NextResponse.json<TokenDetailsApiResponse>(
        {
          chainId: 0,
          token: {
            address: '',
            symbol: '',
            name: '',
            decimals: 18,
            totalSupply: '0',
            tvlUSD: 0,
            volumeUSD: 0,
            derivedETH: null,
            derivedUSD: null,
            priceUSD: 0,
            priceHistory: [],
            tvlHistory: [],
            volumeHistory: [],
          },
          pools: [],
          error: 'Invalid chainId. Must be a number.',
        },
        { status: 400 }
      );
    }

    // Validate address
    if (!address || typeof address !== 'string' || !address.trim()) {
      return NextResponse.json<TokenDetailsApiResponse>(
        {
          chainId,
          token: {
            address: '',
            symbol: '',
            name: '',
            decimals: 18,
            totalSupply: '0',
            tvlUSD: 0,
            volumeUSD: 0,
            derivedETH: null,
            derivedUSD: null,
            priceUSD: 0,
            priceHistory: [],
            tvlHistory: [],
            volumeHistory: [],
          },
          pools: [],
          error: 'Invalid address. Must be a non-empty string.',
        },
        { status: 400 }
      );
    }

    const normalizedAddress = address.trim().toLowerCase();

    // Check if chain is supported for Uniswap
    if (!isChainSupported(chainId)) {
      return NextResponse.json<TokenDetailsApiResponse>(
        {
          chainId,
          token: {
            address: '',
            symbol: '',
            name: '',
            decimals: 18,
            totalSupply: '0',
            tvlUSD: 0,
            volumeUSD: 0,
            derivedETH: null,
            derivedUSD: null,
            priceUSD: 0,
            priceHistory: [],
            tvlHistory: [],
            volumeHistory: [],
          },
          pools: [],
          error: `Chain ${chainId} is not supported or does not have a Uniswap v3 subgraph.`,
        },
        { status: 400 }
      );
    }

    // Fetch token details directly by address using Uniswap v3 subgraph
    console.log(`[token-details] Fetching token for chainId=${chainId}, address=${normalizedAddress}`);
    const token = await getTokenDetails(chainId, normalizedAddress);
    
    if (!token) {
      console.log(`[token-details] Token not found in Uniswap subgraph for ${normalizedAddress} on chain ${chainId}`);
      return NextResponse.json<TokenDetailsApiResponse>(
        {
          chainId,
          token: {
            address: '',
            symbol: '',
            name: '',
            decimals: 18,
            totalSupply: '0',
            tvlUSD: 0,
            volumeUSD: 0,
            derivedETH: null,
            derivedUSD: null,
            priceUSD: 0,
            priceHistory: [],
            tvlHistory: [],
            volumeHistory: [],
          },
          pools: [],
          error: 'Token not found in Uniswap v3 subgraph.',
        },
        { status: 404 }
      );
    }

    console.log(`[token-details] Found token: ${token.symbol} (${token.name})`);

    // Fetch historical data
    const dayData = await getTokenDayData(chainId, normalizedAddress, 30);
    console.log(`[token-details] Fetched ${dayData.length} days of historical data`);

    // Transform history data
    const priceHistory = dayData.map((point) => ({
      timestamp: point.timestamp,
      priceUSD: point.priceUSD,
      tvlUSD: 0,
      volumeUSD: 0,
      feesUSD: 0,
    }));

    const tvlHistory = dayData.map((point) => ({
      timestamp: point.timestamp,
      priceUSD: 0,
      tvlUSD: point.tvlUSD,
      volumeUSD: 0,
      feesUSD: 0,
    }));

    const volumeHistory = dayData.map((point) => ({
      timestamp: point.timestamp,
      priceUSD: 0,
      tvlUSD: 0,
      volumeUSD: point.volumeUSD,
      feesUSD: 0,
    }));

    // Fetch pools for this token
    console.log(`[token-details] Fetching pools for token ${normalizedAddress}`);
    const poolsResult = await getPoolsForToken(chainId, normalizedAddress, 50);
    console.log(`[token-details] Found ${poolsResult.pools.length} pools`);
    
    const pools: PoolDetails[] = poolsResult.pools.map((pool) => ({
      ...pool,
    }));

    // Calculate price: ALWAYS use most recent price from history if available (most accurate)
    // Fallback to token.priceUSD only if history is empty
    let finalPriceUSD = 0;
    
    // Priority 1: Get most recent price from history (most accurate and up-to-date)
    if (priceHistory && priceHistory.length > 0) {
      // Sort by timestamp descending to get most recent first
      const sortedHistory = [...priceHistory].sort((a, b) => b.timestamp - a.timestamp);
      // Find the most recent valid price (must be > 0, not NaN, and finite)
      for (const point of sortedHistory) {
        const price = point.priceUSD;
        if (price && typeof price === 'number' && price > 0 && !isNaN(price) && isFinite(price)) {
          finalPriceUSD = price;
          console.log(`[token-details] Using price from history: ${finalPriceUSD} (timestamp: ${point.timestamp})`);
          break;
        }
      }
      
      if (!finalPriceUSD || finalPriceUSD === 0) {
        console.log(`[token-details] No valid price found in ${sortedHistory.length} history points. First 3 prices:`, 
          sortedHistory.slice(0, 3).map(p => ({ price: p.priceUSD, timestamp: p.timestamp })));
      }
    } else {
      console.log(`[token-details] No price history available (priceHistory.length = 0)`);
    }
    
    // Priority 2: Fallback to token.priceUSD if we don't have a valid price from history
    if ((!finalPriceUSD || finalPriceUSD === 0 || isNaN(finalPriceUSD)) && token.priceUSD) {
      const tokenPrice = typeof token.priceUSD === 'number' ? token.priceUSD : parseFloat(String(token.priceUSD));
      if (tokenPrice && tokenPrice > 0 && !isNaN(tokenPrice) && isFinite(tokenPrice)) {
        finalPriceUSD = tokenPrice;
        console.log(`[token-details] Using token.priceUSD as fallback: ${finalPriceUSD}`);
      } else {
        console.log(`[token-details] token.priceUSD is invalid: ${token.priceUSD} (type: ${typeof token.priceUSD})`);
      }
    }
    
    // Final check: ensure we have a valid number
    if (!finalPriceUSD || finalPriceUSD === 0 || isNaN(finalPriceUSD) || !isFinite(finalPriceUSD)) {
      console.log(`[token-details] WARNING: Final priceUSD is invalid: ${finalPriceUSD}. Price will show as N/A.`);
      finalPriceUSD = 0; // Will show as N/A in UI
    }
    
    console.log(`[token-details] Final priceUSD: ${finalPriceUSD} (token.priceUSD: ${token.priceUSD}, history points: ${priceHistory.length})`);

    // Use token-level totalValueLockedUSD for TVL (this is the authoritative value from subgraph)
    // Token entity's totalValueLockedUSD includes ALL pools automatically aggregated
    let finalTVL = token.tvlUSD;
    console.log(`[token-details] Using token-level TVL: ${finalTVL}`);
    
    // Calculate 24h volume: Use most recent day's volumeUSD from TokenDayData
    // Uniswap shows the most recent day's volume as "24h volume"
    let final24hVolume = 0;
    if (dayData.length > 0) {
      // Sort by timestamp descending to get most recent first
      const sortedDayData = [...dayData].sort((a, b) => b.timestamp - a.timestamp);
      const mostRecent = sortedDayData[0];
      
      // Use most recent day's volumeUSD (this represents a full day's volume)
      if (mostRecent.volumeUSD && mostRecent.volumeUSD > 0) {
        final24hVolume = mostRecent.volumeUSD;
        console.log(`[token-details] Using most recent day's volumeUSD: ${final24hVolume}`);
      } else {
        // Fallback: sum volumes from last 24 hours
        const now = Math.floor(Date.now() / 1000);
        const last24h = now - (24 * 60 * 60);
        final24hVolume = volumeHistory
          .filter((v) => v.timestamp >= last24h)
          .reduce((sum, v) => sum + v.volumeUSD, 0);
        console.log(`[token-details] Fallback: Calculated 24h volume from filtered history: ${final24hVolume}`);
      }
    }
    
    console.log(`[token-details] Final TVL: ${finalTVL}`);
    console.log(`[token-details] Final 24h Volume: ${final24hVolume}`);
    
    // Construct response with token data including histories
    // Note: 
    // - tvlUSD: Uses most recent TokenDayData.totalValueLockedUSD (matches Uniswap frontend)
    // - volumeUSD: 24h volume calculated from TokenDayData volumeHistory (UI also calculates this)
    const response: TokenDetailsApiResponse = {
      chainId,
      token: {
        address: token.address,
        symbol: token.symbol,
        name: token.name,
        decimals: token.decimals,
        totalSupply: token.totalSupply,
        tvlUSD: finalTVL, // Most recent TokenDayData TVL (matches Uniswap)
        volumeUSD: final24hVolume, // 24h volume from TokenDayData (matches Uniswap)
        derivedETH: token.derivedETH,
        derivedUSD: token.derivedUSD,
        priceUSD: finalPriceUSD, // Use calculated price
        priceHistory,
        tvlHistory,
        volumeHistory,
      },
      pools,
    };

    console.log(`[token-details] Returning token details for ${token.symbol}`);

    return NextResponse.json<TokenDetailsApiResponse>(response);
  } catch (error) {
    console.error('Error in /api/uniswap/token-details:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json<TokenDetailsApiResponse>(
      {
        chainId: 0,
        token: {
          address: '',
          symbol: '',
          name: '',
          decimals: 18,
          totalSupply: '0',
          tvlUSD: 0,
          volumeUSD: 0,
          derivedETH: null,
          derivedUSD: null,
          priceUSD: 0,
          priceHistory: [],
          tvlHistory: [],
          volumeHistory: [],
        },
        pools: [],
        error: `Failed to fetch token details: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}


