import { getTokenByAddress, getTokensByChain, type Token } from '@/config/tokens';

/**
 * Get token by address across all chains
 * Returns the first match found across all configured chains
 */
export function getTokenByAddressAnyChain(address: string): { token: Token; chainId: number } | null {
  const normalizedAddress = address.toLowerCase();
  
  // Check all supported chains
  const supportedChains = [1, 42161, 10, 8453, 137, 11155111, 421614, 100];
  
  for (const chainId of supportedChains) {
    const token = getTokenByAddress(chainId, normalizedAddress);
    if (token) {
      return { token, chainId };
    }
  }
  
  return null;
}

/**
 * Get token by address for a specific chain
 */
export function getTokenByAddressForChain(chainId: number, address: string): Token | undefined {
  return getTokenByAddress(chainId, address);
}

/**
 * Check if a token is a tokenized stock
 */
export function isTokenizedStock(token: Token | undefined | null): boolean {
  return token?.isTokenizedStock === true;
}

/**
 * Get the stock ticker for a tokenized stock
 */
export function getStockTicker(token: Token | undefined | null): string | null {
  if (isTokenizedStock(token) && token?.ticker) {
    return token.ticker;
  }
  return null;
}

/**
 * Normalize token address to lowercase for consistent lookups
 */
export function normalizeTokenAddress(address: string): string {
  return address.toLowerCase();
}

/**
 * Get token metadata by address, searching across all chains
 * Returns token info along with chainId
 */
export function getTokenMetadata(address: string): { token: Token; chainId: number } | null {
  return getTokenByAddressAnyChain(address);
}

/**
 * Check if token requires compliance
 */
export function requiresCompliance(token: Token | undefined | null): boolean {
  return token?.requiresCompliance === true;
}

/**
 * Get token factsheet URL if available
 */
export function getFactsheetUrl(token: Token | undefined | null): string | null {
  return token?.factsheetUrl || null;
}

