"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlippageControlProps {
  slippage: number;
  onSlippageChange: (value: number) => void;
}

export default function SlippageControl({ slippage, onSlippageChange }: SlippageControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customValue, setCustomValue] = useState("");
  
  const presetValues = [0.1, 0.5, 1.0];

  const handlePresetClick = (value: number) => {
    onSlippageChange(value);
    setCustomValue("");
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCustomValue(value);
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 50) {
        onSlippageChange(numValue);
      }
    }
  };

  const getWarningLevel = () => {
    if (slippage < 0.1) return { color: "text-red-400", message: "Transaction may fail" };
    if (slippage > 5) return { color: "text-yellow-400", message: "High slippage - may lose value" };
    return { color: "text-green-400", message: "Optimal" };
  };

  const warning = getWarningLevel();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center p-2 rounded-lg glass hover:glass-strong transition-all"
        title={`Slippage: ${slippage}%`}
      >
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Popover */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 z-50 w-80 glass-strong rounded-xl p-4 shadow-2xl border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white">Slippage Tolerance</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {presetValues.map((value) => (
                  <button
                    key={value}
                    onClick={() => handlePresetClick(value)}
                    className={`py-2 rounded-lg text-sm font-medium transition-all ${
                      slippage === value && !customValue
                        ? "bg-amber-500 text-black"
                        : "glass hover:glass-strong text-gray-300"
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>

              <div className="relative mb-3">
                <input
                  type="text"
                  value={customValue}
                  onChange={handleCustomChange}
                  placeholder="Custom"
                  className="w-full px-3 py-2 rounded-lg glass text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  %
                </span>
              </div>

              <div className={`flex items-center gap-2 text-xs ${warning.color}`}>
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
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>{warning.message}</span>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

