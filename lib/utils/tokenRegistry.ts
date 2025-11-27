/**
 * Token Registry Utilities
 * 
 * Helper functions to look up tokens from the local token registry (token-list.json).
 */

interface LocalToken {
  name: string;
  symbol: string;
  address: string;
  chainId: number;
  decimals: number;
  logoURI?: string;
}

interface TokenListResponse {
  tokens: LocalToken[];
}

let tokenListCache: LocalToken[] | null = null;

/**
 * Load token list from public/token-list.json
 * Caches the result for subsequent calls
 */
async function loadTokenList(): Promise<LocalToken[]> {
  if (tokenListCache) {
    return tokenListCache;
  }

  try {
    const tokenListUrl = '/token-list.json';
    const response = await fetch(tokenListUrl);
    
    if (!response.ok) {
      console.warn('Failed to load token-list.json');
      return [];
    }

    const data: TokenListResponse = await response.json();
    tokenListCache = data.tokens || [];
    return tokenListCache;
  } catch (error) {
    console.error('Error loading token list:', error);
    return [];
  }
}

/**
 * Get a token from the local registry by chainId and address
 * 
 * @param chainId - The chain ID
 * @param address - The token address (will be lowercased for comparison)
 * @returns The token if found, null otherwise
 */
export async function getTokenFromRegistry(
  chainId: number,
  address: string
): Promise<LocalToken | null> {
  const normalizedAddress = address.toLowerCase();
  const tokens = await loadTokenList();
  
  return tokens.find(
    (token) =>
      token.chainId === chainId &&
      token.address.toLowerCase() === normalizedAddress
  ) || null;
}

/**
 * Get a token from the local registry (server-side version)
 * This version reads directly from the file system
 */
export async function getTokenFromRegistryServer(
  chainId: number,
  address: string
): Promise<LocalToken | null> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    
    const tokenListPath = path.join(process.cwd(), 'public', 'token-list.json');
    const tokenListData = fs.readFileSync(tokenListPath, 'utf-8');
    const tokenList: TokenListResponse = JSON.parse(tokenListData);
    
    const normalizedAddress = address.toLowerCase();
    const token = (tokenList.tokens || []).find(
      (t) =>
        t.chainId === chainId &&
        t.address.toLowerCase() === normalizedAddress
    );
    
    return token || null;
  } catch (error) {
    console.error('Error reading token list from file system:', error);
    return null;
  }
}

