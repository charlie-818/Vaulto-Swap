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
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 overflow-hidden"
      style={{ width: "100%" }}
    >
      <div className="glass rounded-xl p-4" style={{ width: "100%" }}>
        <div className="flex justify-between items-center mb-2">
          <label className="text-sm text-gray-400">Limit Price</label>
          {currentMarketPrice && (
            <span className="text-xs text-gray-500">
              Market: {parseFloat(currentMarketPrice).toFixed(6)} {fromToken?.symbol}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={limitPrice}
            onChange={handleInputChange}
            placeholder="0.00"
            className="flex-1 bg-transparent text-2xl font-bold text-white outline-none"
          />
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">
              {fromToken?.symbol} per {toToken?.symbol}
            </span>
          </div>
        </div>
        {priceDiff !== null && (
          <div className="mt-2">
            <span
              className={`text-xs font-semibold ${
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
          </div>
        )}
        <div className="mt-3 text-xs text-gray-500">
          Your limit order will execute when the market price reaches your target price.
        </div>
      </div>
    </motion.div>
  );
}

