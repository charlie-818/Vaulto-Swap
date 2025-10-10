import { Token } from "@/config/tokens";
import { parseUnits } from "viem";

interface SwapParams {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  address: `0x${string}`;
  chainId: number;
}

interface SwapResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

/**
 * Check if token approval is needed
 */
async function checkAndApproveToken(
  token: Token,
  amount: string,
  spenderAddress: string,
  userAddress: `0x${string}`
): Promise<boolean> {
  try {
    // In production, this would:
    // 1. Call ERC20.allowance(userAddress, spenderAddress)
    // 2. If allowance < amount, call ERC20.approve(spenderAddress, amount)
    // 3. Wait for approval transaction to confirm

    // For demo, simulate approval
    console.log(`Checking approval for ${token.symbol}...`);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  } catch (error) {
    console.error("Approval error:", error);
    return false;
  }
}

/**
 * Execute swap through custom pool
 */
async function swapThroughCustomPool(
  params: SwapParams
): Promise<SwapResult> {
  try {
    const { fromToken, toToken, fromAmount, address, chainId } = params;

    // Get pool contract address (would come from factory or config)
    const poolAddress = "0x0000000000000000000000000000000000000000"; // Mock address

    // Check and approve token
    const approved = await checkAndApproveToken(
      fromToken,
      fromAmount,
      poolAddress,
      address
    );

    if (!approved) {
      return {
        success: false,
        error: "Token approval failed",
      };
    }

    // Execute swap
    // In production, this would call the pool contract's swap function
    console.log(`Executing swap: ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substring(2, 66)}`, // Mock tx hash
    };
  } catch (error: any) {
    console.error("Custom pool swap error:", error);
    return {
      success: false,
      error: error.message || "Swap failed",
    };
  }
}

/**
 * Execute swap through Uniswap
 */
async function swapThroughUniswap(
  params: SwapParams
): Promise<SwapResult> {
  try {
    const { fromToken, toToken, fromAmount, address } = params;

    // Uniswap Router address (example for mainnet)
    const routerAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router

    // Check and approve token
    const approved = await checkAndApproveToken(
      fromToken,
      fromAmount,
      routerAddress,
      address
    );

    if (!approved) {
      return {
        success: false,
        error: "Token approval failed",
      };
    }

    // Execute swap via Uniswap router
    console.log(`Executing Uniswap swap: ${fromAmount} ${fromToken.symbol} -> ${toToken.symbol}`);
    
    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substring(2, 66)}`, // Mock tx hash
    };
  } catch (error: any) {
    console.error("Uniswap swap error:", error);
    return {
      success: false,
      error: error.message || "Swap failed",
    };
  }
}

/**
 * Main swap execution function
 * Routes through best available liquidity source
 */
export async function executeSwap(params: SwapParams): Promise<SwapResult> {
  try {
    // Try custom pool first
    const customPoolResult = await swapThroughCustomPool(params);
    
    if (customPoolResult.success) {
      return customPoolResult;
    }

    // Fallback to Uniswap
    console.log("Custom pool swap failed, trying Uniswap...");
    return await swapThroughUniswap(params);
    
  } catch (error: any) {
    console.error("Swap execution error:", error);
    return {
      success: false,
      error: error.message || "Swap failed",
    };
  }
}

/**
 * Store transaction in local history
 */
export function saveTransactionToHistory(
  txHash: string,
  params: SwapParams
): void {
  try {
    const history = JSON.parse(localStorage.getItem("swapHistory") || "[]");
    history.unshift({
      txHash,
      from: params.fromToken.symbol,
      to: params.toToken.symbol,
      fromAmount: params.fromAmount,
      toAmount: params.toAmount,
      timestamp: Date.now(),
      chainId: params.chainId,
    });
    // Keep only last 50 transactions
    localStorage.setItem("swapHistory", JSON.stringify(history.slice(0, 50)));
  } catch (error) {
    console.error("Failed to save transaction history:", error);
  }
}

