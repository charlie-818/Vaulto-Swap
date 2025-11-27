import { NextRequest, NextResponse } from 'next/server';
import { searchTokens } from '@/lib/uniswap/tokenSearch';
import { getPoolsForToken } from '@/lib/uniswap/pools';

/**
 * GET /api/debug/uniswap-direct
 * 
 * Server-side direct function calls to inspect what the subgraph returns.
 * This logs directly to the server console for debugging.
 * 
 * Query params:
 * - chainId: number (required)
 * - query: string (required)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const chainIdParam = searchParams.get('chainId');
    const query = searchParams.get('query');

    // Validate chainId
    const chainId = chainIdParam ? parseInt(chainIdParam, 10) : null;
    if (!chainId || isNaN(chainId)) {
      return NextResponse.json(
        { error: 'Invalid chainId. Must be a number.' },
        { status: 400 }
      );
    }

    // Validate query
    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Invalid query. Must be a non-empty string.' },
        { status: 400 }
      );
    }

    console.log('\n=== SERVER-SIDE DEBUG: Starting direct function calls ===');
    console.log('Parameters:', { chainId, query: query.trim() });
    console.log('Timestamp:', new Date().toISOString());

    // Call searchTokens directly
    console.log('\n--- Calling searchTokens ---');
    const searchResult = await searchTokens(chainId, query.trim(), 10);
    console.log('searchTokens result:', JSON.stringify(searchResult, null, 2));
    console.log(`Found ${searchResult.tokens?.length || 0} tokens`);

    const result: any = {
      searchTokens: searchResult,
      poolsResults: [] as any[],
    };

    // Get pools for first token if available
    if (searchResult.tokens && searchResult.tokens.length > 0) {
      const firstToken = searchResult.tokens[0];
      console.log(`\n--- Calling getPoolsForToken for ${firstToken.symbol} (${firstToken.address}) ---`);
      console.log('Token details:', {
        address: firstToken.address,
        symbol: firstToken.symbol,
        name: firstToken.name,
        tvlUSD: firstToken.tvlUSD,
        volumeUSD: firstToken.volumeUSD,
      });

      const poolsResult = await getPoolsForToken(chainId, firstToken.address, 10);
      console.log('getPoolsForToken result:', JSON.stringify(poolsResult, null, 2));
      console.log(`Found ${poolsResult.pools?.length || 0} pools`);

      result.poolsResults.push({
        token: firstToken,
        pools: poolsResult,
      });

      // Log each pool's details
      if (poolsResult.pools && poolsResult.pools.length > 0) {
        console.log('\n--- Pool Details ---');
        poolsResult.pools.forEach((pool, index) => {
          console.log(`Pool ${index + 1}:`, {
            poolAddress: pool.poolAddress,
            feeTierBps: pool.feeTierBps,
            tvlUSD: pool.tvlUSD,
            volumeUSD: pool.volumeUSD,
            volumeUSD24h: pool.volumeUSD24h,
            volumeUSD7d: pool.volumeUSD7d,
            token0: `${pool.token0.symbol} (${pool.token0.address.slice(0, 10)}...)`,
            token1: `${pool.token1.symbol} (${pool.token1.address.slice(0, 10)}...)`,
          });
        });
      }
    } else {
      console.log('\n--- No tokens found, skipping pool fetch ---');
    }

    console.log('\n=== SERVER-SIDE DEBUG: Complete ===\n');

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('\n=== SERVER-SIDE DEBUG: Error ===');
    console.error(error);
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('=== End Error ===\n');

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

