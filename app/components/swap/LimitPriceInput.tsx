"use client";

import { Token } from "@/config/tokens";
import { motion } from "framer-motion";

interface LimitPriceInputProps {
  fromToken: Token | null;
  toToken: Token | null;
  limitPrice: string;
  onLimitPriceChange: (price: string) => void;
  currentMarketPrice?: string;
}

export default function LimitPriceInput({
  fromToken,
  toToken,
  limitPrice,
  onLimitPriceChange,
  currentMarketPrice,
}: LimitPriceInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string, numbers, and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      onLimitPriceChange(value);
    }
  };

  const getPriceDifference = () => {
    if (!limitPrice || !currentMarketPrice) return null;
    const limit = parseFloat(limitPrice);
    const market = parseFloat(currentMarketPrice);
    if (isNaN(limit) || isNaN(market) || market === 0) return null;
    
    const difference = ((limit - market) / market) * 100;
    return difference;
  };

  const priceDiff = getPriceDifference();

  return (
    <div className="glass rounded-xl p-2.5 mb-2">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3.5 h-3.5 text-amber-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
            />
          </svg>
          <span className="text-xs font-medium text-white">Limit Price</span>
        </div>
        {currentMarketPrice && (
          <span className="text-[10px] text-gray-400">
            Market: {parseFloat(currentMarketPrice).toFixed(6)}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={limitPrice}
          onChange={handleInputChange}
          placeholder="0.00"
          className="flex-1 bg-transparent text-lg font-semibold text-white outline-none placeholder-gray-600"
        />
        <span className="text-gray-400 text-xs whitespace-nowrap">
          {fromToken?.symbol}/{toToken?.symbol}
        </span>
      </div>
      
      {priceDiff !== null && (
        <div className="mt-1.5 flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold ${
              priceDiff > 0
                ? "text-green-400"
                : priceDiff < 0
                ? "text-red-400"
                : "text-gray-400"
            }`}
          >
            {priceDiff > 0 ? "+" : ""}
            {priceDiff.toFixed(2)}% {priceDiff > 0 ? "above" : "below"} market
          </span>
          <span className="text-[10px] text-gray-500">
            Fills at target
          </span>
        </div>
      )}
    </div>
  );
}

