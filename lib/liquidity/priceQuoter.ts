import { Token } from "@/config/tokens";
import { getUniswapQuote } from "./uniswapFallback";

interface QuoteResult {
  rate: string;
  outputAmount: string;
  source: "Custom Pool" | "Uniswap V3" | "Mock";
}

/**
 * Simulates fetching a quote from custom liquidity pools
 * In production, this would call actual smart contracts
 */
async function getCustomPoolQuote(
  fromToken: Token,
  toToken: Token,
  fromAmount: string,
  chainId: number
): Promise<QuoteResult | null> {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // For demo purposes, simulate a pool that exists with a mock rate
    // In production, this would query actual deployed pool contracts
    const mockRate = fromToken.isStablecoin ? 150.0 : 0.0066; // Simplified mock pricing
    const outputAmount = (parseFloat(fromAmount) * mockRate).toFixed(6);

    return {
      rate: mockRate.toFixed(6),
      outputAmount,
      source: "Custom Pool",
    };
  } catch (error) {
    console.error("Custom pool quote error:", error);
    return null;
  }
}

/**
 * Aggregates best price from custom pools and Uniswap
 */
export async function getSwapQuote(
  fromToken: Token,
  toToken: Token,
  fromAmount: string,
  chainId: number
): Promise<QuoteResult> {
  // Try custom pool first
  try {
    const customPoolQuote = await getCustomPoolQuote(
      fromToken,
      toToken,
      fromAmount,
      chainId
    );

    if (customPoolQuote) {
      // In production, also fetch Uniswap quote and compare
      // For now, return custom pool quote
      return customPoolQuote;
    }
  } catch (error) {
    console.error("Custom pool error, falling back to Uniswap:", error);
  }

  // Fallback to Uniswap
  try {
    const uniswapQuote = await getUniswapQuote(
      fromToken,
      toToken,
      fromAmount,
      chainId
    );

    if (uniswapQuote) {
      return uniswapQuote;
    }
  } catch (error) {
    console.error("Uniswap quote error:", error);
  }

  // If both fail, return mock quote for demo
  const mockRate = fromToken.isStablecoin ? 150.0 : 0.0066;
  const outputAmount = (parseFloat(fromAmount) * mockRate).toFixed(6);

  return {
    rate: mockRate.toFixed(6),
    outputAmount,
    source: "Mock",
  };
}

/**
 * Compares multiple quotes and returns the best one
 */
export function getBestQuote(quotes: QuoteResult[]): QuoteResult {
  return quotes.reduce((best, current) => {
    const bestOutput = parseFloat(best.outputAmount);
    const currentOutput = parseFloat(current.outputAmount);
    return currentOutput > bestOutput ? current : best;
  });
}

