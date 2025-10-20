export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  isStablecoin?: boolean;
  isTokenizedStock?: boolean;
  ticker?: string;
  requiresCompliance?: boolean;
  factsheetUrl?: string;
}

export interface TokensByChain {
  [chainId: number]: Token[];
}

// Mainnet token addresses (examples - update with real addresses)
export const tokens: TokensByChain = {
  // Ethereum Mainnet
  1: [
    // Stablecoins
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdt.png",
    },
    {
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      isStablecoin: true,
      logoURI: "/dai.png",
    },
    {
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      logoURI: "/wbtc.png",
    },
    {
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      logoURI: "/weth.png",
    },
    // Tokenized Stocks (simulated addresses - replace with actual Backed Finance or similar)
    {
      address: "0x0000000000000000000000000000000000000001",
      symbol: "bAAPL",
      name: "Backed AAPL",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "AAPL",
      requiresCompliance: true,
      logoURI: "/apple.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-AAPLx.pdf",
    },
    {
      address: "0x0000000000000000000000000000000000000002",
      symbol: "bTSLA",
      name: "Backed TSLA",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "TSLA",
      requiresCompliance: true,
      logoURI: "/tsla.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-TSLAx.pdf",
    },
    {
      address: "0x0000000000000000000000000000000000000003",
      symbol: "bGOOGL",
      name: "Backed GOOGL",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "GOOGL",
      requiresCompliance: true,
      logoURI: "/google.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-GOOGLx.pdf",
    },
    {
      address: "0x0000000000000000000000000000000000000004",
      symbol: "bAMZN",
      name: "Backed AMZN",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "AMZN",
      requiresCompliance: true,
      logoURI: "/amazon.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-AMZNx.pdf",
    },
    {
      address: "0x0000000000000000000000000000000000000005",
      symbol: "bMSFT",
      name: "Backed MSFT",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "MSFT",
      requiresCompliance: true,
      logoURI: "/microsoft.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-MSFTx.pdf",
    },
  ],
  // Arbitrum
  42161: [
    {
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdt.png",
    },
    {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      isStablecoin: true,
      logoURI: "/dai.png",
    },
    {
      address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      logoURI: "/wbtc.png",
    },
    {
      address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      logoURI: "/weth.png",
    },
    // Tokenized stocks on Arbitrum
    {
      address: "0x0000000000000000000000000000000000000011",
      symbol: "bAAPL",
      name: "Backed AAPL",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "AAPL",
      requiresCompliance: true,
      logoURI: "/apple.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-AAPLx.pdf",
    },
    {
      address: "0x0000000000000000000000000000000000000012",
      symbol: "bTSLA",
      name: "Backed TSLA",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "TSLA",
      requiresCompliance: true,
      logoURI: "/tsla.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-TSLAx.pdf",
    },
  ],
  // Optimism
  10: [
    {
      address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdt.png",
    },
    {
      address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      isStablecoin: true,
      logoURI: "/dai.png",
    },
    {
      address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      logoURI: "/wbtc.png",
    },
    {
      address: "0x4200000000000000000000000000000000000006",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      logoURI: "/weth.png",
    },
  ],
  // Base
  8453: [
    {
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      isStablecoin: true,
      logoURI: "/dai.png",
    },
    {
      address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
      symbol: "cbETH",
      name: "Coinbase Wrapped Staked ETH",
      decimals: 18,
      logoURI: "/cbeth.png",
    },
  ],
  // Polygon
  137: [
    {
      address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdt.png",
    },
    {
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      isStablecoin: true,
      logoURI: "/dai.png",
    },
    {
      address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
      symbol: "WBTC",
      name: "Wrapped BTC",
      decimals: 8,
      logoURI: "/wbtc.png",
    },
    {
      address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      logoURI: "/weth.png",
    },
  ],
  // Sepolia Testnet
  11155111: [
    {
      address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      symbol: "USDC",
      name: "USD Coin (Test)",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
    {
      address: "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06",
      symbol: "USDT",
      name: "Tether USD (Test)",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdt.png",
    },
    // Test tokenized stocks
    {
      address: "0x0000000000000000000000000000000000000101",
      symbol: "bAAPL",
      name: "Backed AAPL (Test)",
      decimals: 18,
      isTokenizedStock: true,
      ticker: "AAPL",
      requiresCompliance: true,
      logoURI: "/apple.svg",
      factsheetUrl: "https://documents.backed.fi/backed-assets-factsheet-AAPLx.pdf",
    },
  ],
  // Arbitrum Sepolia
  421614: [
    {
      address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
      symbol: "USDC",
      name: "USD Coin (Test)",
      decimals: 6,
      isStablecoin: true,
      logoURI: "/usdc.png",
    },
  ],
};

export function getTokensByChain(chainId: number): Token[] {
  return tokens[chainId] || [];
}

export function getTokenByAddress(chainId: number, address: string): Token | undefined {
  const chainTokens = getTokensByChain(chainId);
  return chainTokens.find((token) => token.address.toLowerCase() === address.toLowerCase());
}

export function getStablecoins(chainId: number): Token[] {
  return getTokensByChain(chainId).filter((token) => token.isStablecoin);
}

export function getTokenizedStocks(chainId: number, includeRegulated: boolean = true): Token[] {
  const stocks = getTokensByChain(chainId).filter((token) => token.isTokenizedStock);
  if (includeRegulated) {
    return stocks;
  }
  return stocks.filter((token) => !token.requiresCompliance);
}

