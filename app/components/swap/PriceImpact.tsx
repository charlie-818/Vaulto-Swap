"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

interface PriceImpactProps {
  priceImpact: number; // percentage
}

export default function PriceImpact({ priceImpact }: PriceImpactProps) {
  const impactLevel = useMemo(() => {
    if (priceImpact < 1) {
      return {
        color: "text-green-400",
        bgColor: "bg-green-500/10",
        borderColor: "border-green-500/30",
        icon: "✓",
        label: "Low Impact",
      };
    } else if (priceImpact < 3) {
      return {
        color: "text-yellow-400",
        bgColor: "bg-yellow-500/10",
        borderColor: "border-yellow-500/30",
        icon: "⚠",
        label: "Medium Impact",
      };
    } else if (priceImpact < 5) {
      return {
        color: "text-orange-400",
        bgColor: "bg-orange-500/10",
        borderColor: "border-orange-500/30",
        icon: "⚠",
        label: "High Impact",
      };
    } else {
      return {
        color: "text-red-400",
        bgColor: "bg-red-500/10",
        borderColor: "border-red-500/30",
        icon: "⛔",
        label: "Very High Impact",
      };
    }
  }, [priceImpact]);

  if (priceImpact <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-lg p-2.5 border ${impactLevel.bgColor} ${impactLevel.borderColor} mb-2`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{impactLevel.icon}</span>
          <div>
            <div className="text-xs font-medium text-white">
              Price Impact: {priceImpact.toFixed(2)}%
            </div>
            <div className={`text-[10px] ${impactLevel.color}`}>
              {impactLevel.label}
            </div>
          </div>
        </div>
        
        {priceImpact >= 5 && (
          <div className="text-[10px] text-gray-400 max-w-[120px] text-right">
            Split into smaller trades
          </div>
        )}
      </div>
    </motion.div>
  );
}

