"use client";

import { motion } from "framer-motion";
import { Token } from "@/config/tokens";

interface SwapStatsProps {
  fromToken: Token;
  toToken: Token;
  rate: string;
  estimatedGas?: string;
  minimumReceived?: string;
  liquiditySource?: string;
  route?: string[];
}

export default function SwapStats({
  fromToken,
  toToken,
  rate,
  estimatedGas,
  minimumReceived,
  liquiditySource,
  route,
}: SwapStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-xl p-2.5 space-y-1.5 mb-2"
    >

      {/* Exchange Rate */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-gray-400">Rate</span>
        <span className="text-white font-medium">
          1 {fromToken.symbol} = {parseFloat(rate).toFixed(6)} {toToken.symbol}
        </span>
      </div>

      {/* Minimum Received */}
      {minimumReceived && (
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Minimum Received</span>
          <span className="text-white font-medium">
            {minimumReceived} {toToken.symbol}
          </span>
        </div>
      )}

      {/* Network Fee and Liquidity Source */}
      <div className="flex items-center justify-between text-[10px]">
        {estimatedGas && (
          <>
            <span className="text-gray-400">Network Fee</span>
            <span className="text-white font-medium">${estimatedGas}</span>
          </>
        )}
      </div>

      {liquiditySource && (
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-gray-400">Liquidity Source</span>
          <span className="text-amber-500 font-medium">{liquiditySource}</span>
        </div>
      )}

      {/* Swap Route - More Compact */}
      {route && route.length > 0 && (
        <div className="pt-1.5 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Route</span>
            <div className="flex items-center gap-1">
              {route.map((token, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-[10px] text-white font-medium">
                    {token}
                  </span>
                  {index < route.length - 1 && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3 h-3 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

