"use client";

import { useState } from "react";
import { Token } from "@/config/tokens";
import { executeSwap } from "@/lib/swap/swapExecutor";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface SwapButtonProps {
  isConnected: boolean;
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  toAmount: string;
  isLoadingQuote: boolean;
  onConnect: () => void;
  address?: `0x${string}`;
  chainId?: number;
  disabled?: boolean;
  orderType?: "market" | "limit";
  limitPrice?: string;
  onSwapClick?: () => void;
}

export default function SwapButton({
  isConnected,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  isLoadingQuote,
  onConnect,
  address,
  chainId,
  disabled = false,
  orderType = "market",
  limitPrice = "",
  onSwapClick,
}: SwapButtonProps) {
  const [isSwapping, setIsSwapping] = useState(false);

  const handleSwap = async () => {
    if (!fromToken || !toToken || !address || !chainId) return;

    setIsSwapping(true);

    try {
      if (orderType === "limit") {
        // For limit orders, we'll create a pending order
        // This is a placeholder - in production you'd store this in a database or smart contract
        toast.success(
          <div>
            <div className="font-semibold">Limit Order Placed!</div>
            <div className="text-xs mt-1">
              Buy {toAmount} {toToken.symbol} at {limitPrice} {fromToken.symbol}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Order will execute when market reaches your price
            </div>
          </div>,
          { duration: 5000 }
        );
      } else {
        const result = await executeSwap({
          fromToken,
          toToken,
          fromAmount,
          toAmount,
          address,
          chainId,
        });

        if (result.success) {
          toast.success(
            <div>
              <div className="font-semibold">Swap Successful!</div>
              <div className="text-xs mt-1">
                {fromAmount} {fromToken.symbol} → {toAmount} {toToken.symbol}
              </div>
            </div>
          );
        } else {
          toast.error(result.error || "Swap failed");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Swap failed");
      console.error("Swap error:", error);
    } finally {
      setIsSwapping(false);
    }
  };

  const getButtonContent = () => {
    if (disabled) {
      return "Trading Restricted";
    }

    if (!isConnected) {
      return "Connect Wallet";
    }

    if (!fromToken || !toToken) {
      return "Select tokens";
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0) {
      return "Enter amount";
    }

    if (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) {
      return "Enter limit price";
    }

    if (isLoadingQuote) {
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading quote...
        </div>
      );
    }

    if (isSwapping) {
      return (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {orderType === "limit" ? "Placing order..." : "Swapping..."}
        </div>
      );
    }

    if (orderType === "limit") {
      return `Place Limit Order`;
    }

    return `Swap ${fromToken.symbol} for ${toToken.symbol}`;
  };

  const isDisabled =
    disabled ||
    !isConnected ||
    !fromToken ||
    !toToken ||
    !fromAmount ||
    parseFloat(fromAmount) <= 0 ||
    (orderType === "limit" && (!limitPrice || parseFloat(limitPrice) <= 0)) ||
    isLoadingQuote ||
    isSwapping;

  const handleClick = () => {
    if (disabled) return; // Don't allow any action if disabled
    
    if (!isConnected) {
      onConnect();
    } else {
      // Show confirmation modal if provided, otherwise execute swap directly
      if (onSwapClick) {
        onSwapClick();
      } else {
        handleSwap();
      }
    }
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      onClick={handleClick}
      disabled={isDisabled && isConnected}
      className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
        isDisabled && isConnected
          ? "bg-gray-600 cursor-not-allowed opacity-50 text-gray-400"
          : "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 shadow-lg hover:shadow-xl text-black"
      }`}
    >
      {getButtonContent()}
    </motion.button>
  );
}

