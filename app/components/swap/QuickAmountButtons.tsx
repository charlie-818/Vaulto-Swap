"use client";

import { motion } from "framer-motion";

interface QuickAmountButtonsProps {
  balance: string;
  onAmountSelect: (amount: string) => void;
  decimals?: number;
}

export default function QuickAmountButtons({
  balance,
  onAmountSelect,
  decimals = 2,
}: QuickAmountButtonsProps) {
  const percentages = [25, 50, 75, 100];

  const handleClick = (percentage: number) => {
    const amount = (parseFloat(balance) * percentage) / 100;
    onAmountSelect(amount.toFixed(decimals));
  };

  if (!balance || parseFloat(balance) <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex gap-2 mt-2"
    >
      {percentages.map((percentage) => (
        <button
          key={percentage}
          onClick={() => handleClick(percentage)}
          className="flex-1 py-1 px-2 rounded-md glass hover:glass-strong text-xs font-medium text-gray-300 hover:text-white transition-all"
        >
          {percentage}%
        </button>
      ))}
    </motion.div>
  );
}

