"use client";

import { Token } from "@/config/tokens";

interface MarketExecutionInfoProps {
  fromToken: Token | null;
  toToken: Token | null;
  fromAmount: string;
  currentRate?: string;
  liquidityDepth?: "high" | "medium" | "low";
}

export default function MarketExecutionInfo({
  fromToken,
  toToken,
  fromAmount,
  currentRate,
  liquidityDepth = "high",
}: MarketExecutionInfoProps) {
  const getLiquidityInfo = () => {
    switch (liquidityDepth) {
      case "high":
        return {
          color: "text-green-400",
          bgColor: "bg-green-500/10",
          label: "Excellent",
          description: "Instant execution guaranteed",
        };
      case "medium":
        return {
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/10",
          label: "Good",
          description: "Fast execution expected",
        };
      case "low":
        return {
          color: "text-orange-400",
          bgColor: "bg-orange-500/10",
          label: "Fair",
          description: "May take longer to fill",
        };
    }
  };

  const liquidity = getLiquidityInfo();
  const hasAmount = fromAmount && parseFloat(fromAmount) > 0;

  return (
    <div className="glass rounded-xl p-2.5 mb-2">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-white">Market Execution</span>
      </div>

      <div className="space-y-1.5">
        {/* Execution Type */}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Execution Type</span>
          <span className="text-white font-medium">Instant Market Order</span>
        </div>

        {/* Liquidity Status */}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Liquidity Status</span>
          <span className={liquidity.color}>{liquidity.description}</span>
        </div>

        {/* Current Best Price */}
        {currentRate && hasAmount && (
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-400">Best Available Price</span>
            <span className="text-white font-medium">
              {parseFloat(currentRate).toFixed(6)} {toToken?.symbol}
            </span>
          </div>
        )}

        {/* Expected Fill */}
        {hasAmount && (
          <div className="pt-1.5 border-t border-gray-700/50 flex items-center justify-between text-[10px]">
            <span className="text-gray-400">Expected Fill</span>
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3 h-3 text-green-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-green-400 font-semibold">100% at market</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

