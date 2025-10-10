export type OrderType = "market" | "limit";

export interface SwapQuote {
  rate: string;
  outputAmount: string;
  source: "Custom Pool" | "Uniswap V3" | "Mock";
  priceImpact?: string;
  minimumReceived?: string;
}

export interface LimitOrder {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: string;
  limitPrice: string;
  status: "pending" | "filled" | "cancelled" | "expired";
  createdAt: number;
  expiresAt?: number;
}

export interface SwapTransaction {
  hash: string;
  from: string;
  to: string;
  fromAmount: string;
  toAmount: string;
  timestamp: number;
  chainId: number;
  status: "pending" | "confirmed" | "failed";
}

export interface LiquidityPool {
  address: string;
  token0: string;
  token1: string;
  reserve0: string;
  reserve1: string;
  totalLiquidity: string;
  fee: number;
}

export interface TokenApproval {
  token: string;
  spender: string;
  amount: string;
  isApproved: boolean;
}

