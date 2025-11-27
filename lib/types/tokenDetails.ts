/**
 * Type definitions for token details API responses
 */

import type { TokenDetailsResult, TokenHistoryPoint } from '@/lib/uniswap/tokenDetails';
import type { PoolResult } from '@/lib/uniswap/pools';

/**
 * Pool details for token details page (extends PoolResult with additional fields)
 */
export interface PoolDetails extends PoolResult {
  // Additional fields can be added here if needed
  token0Price?: number;
  token1Price?: number;
}

/**
 * Token details with history for API response
 */
export interface TokenDetailsData {
  chainId: number;
  token: TokenDetailsResult & {
    priceHistory: TokenHistoryPoint[];
    tvlHistory: TokenHistoryPoint[];
    volumeHistory: TokenHistoryPoint[];
  };
  pools: PoolDetails[];
}

/**
 * API response format for token details
 */
export interface TokenDetailsApiResponse {
  chainId: number;
  token: TokenDetailsResult & {
    priceHistory: TokenHistoryPoint[];
    tvlHistory: TokenHistoryPoint[];
    volumeHistory: TokenHistoryPoint[];
  };
  pools: PoolDetails[];
  error?: string;
}


