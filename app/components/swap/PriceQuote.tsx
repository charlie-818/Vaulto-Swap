"use client";

import { useEffect, useState } from "react";
import { Token } from "@/config/tokens";
import { getSwapQuote } from "@/lib/liquidity/priceQuoter";
import { motion } from "framer-motion";

interface PriceQuoteProps {
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  onQuoteReceived: (amount: string, rate?: string) => void;
  onLoadingChange: (loading: boolean) => void;
  chainId?: number;
}

export default function PriceQuote({
  fromToken,
  toToken,
  fromAmount,
  onQuoteReceived,
  onLoadingChange,
  chainId,
}: PriceQuoteProps) {
  const [quote, setQuote] = useState<{
    rate: string;
    outputAmount: string;
    source: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchQuote = async () => {
      if (!fromAmount || parseFloat(fromAmount) <= 0) {
        setQuote(null);
        onQuoteReceived("");
        return;
      }

      setIsLoading(true);
      setError(null);
      onLoadingChange(true);

      try {
        const result = await getSwapQuote(
          fromToken,
          toToken,
          fromAmount,
          chainId || 1
        );

        if (!isCancelled) {
          setQuote(result);
          // Format to 2 decimals for stablecoins
          const formattedOutput = toToken.isStablecoin
            ? parseFloat(result.outputAmount).toFixed(2)
            : result.outputAmount;
          onQuoteReceived(formattedOutput, result.rate);
        }
      } catch (err) {
        if (!isCancelled) {
          setError("Unable to fetch quote");
          console.error("Quote error:", err);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
          onLoadingChange(false);
        }
      }
    };

    // Debounce quote fetching
    const timer = setTimeout(fetchQuote, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [fromToken, toToken, fromAmount, chainId, onQuoteReceived, onLoadingChange]);

  // Auto-refresh quote every 10 seconds
  useEffect(() => {
    if (!quote) return;

    const interval = setInterval(async () => {
      if (fromAmount && parseFloat(fromAmount) > 0) {
        try {
          const result = await getSwapQuote(
            fromToken,
            toToken,
            fromAmount,
            chainId || 1
          );
          setQuote(result);
          // Format to 2 decimals for stablecoins
          const formattedOutput = toToken.isStablecoin
            ? parseFloat(result.outputAmount).toFixed(2)
            : result.outputAmount;
          onQuoteReceived(formattedOutput, result.rate);
        } catch (err) {
          console.error("Quote refresh error:", err);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [quote, fromToken, toToken, fromAmount, chainId, onQuoteReceived]);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-2 overflow-hidden"
        style={{ width: "100%" }}
      >
        <div className="glass rounded-xl p-2.5 border-l-4 border-red-500" style={{ width: "100%" }}>
          <div className="flex items-center gap-2 text-red-400 text-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            {error}
          </div>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-2 overflow-hidden"
        style={{ width: "100%" }}
      >
        <div className="glass rounded-xl p-2.5" style={{ width: "100%" }}>
          <div className="flex items-center gap-2 text-gray-400 text-[10px]">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            Fetching best price...
          </div>
        </div>
      </motion.div>
    );
  }

  if (!quote) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-2 overflow-hidden"
      style={{ width: "100%" }}
    >
      <div className="glass rounded-xl p-2.5 space-y-1.5" style={{ width: "100%" }}>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Rate</span>
          <span className="text-white font-semibold">
            1 {fromToken.symbol} = {parseFloat(quote.rate).toFixed(6)} {toToken.symbol}
          </span>
        </div>
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Source</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-medium">{quote.source}</span>
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-500 text-[9px]">Live</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

