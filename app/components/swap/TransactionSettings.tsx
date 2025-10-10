"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TransactionSettingsProps {
  deadline: number; // in minutes
  onDeadlineChange: (value: number) => void;
  gasPrice?: string;
}

export default function TransactionSettings({
  deadline,
  onDeadlineChange,
  gasPrice,
}: TransactionSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customDeadline, setCustomDeadline] = useState(deadline.toString());
  
  const presetDeadlines = [5, 10, 20, 30];

  const handlePresetClick = (value: number) => {
    onDeadlineChange(value);
    setCustomDeadline(value.toString());
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomDeadline(value);
      const numValue = parseInt(value);
      if (!isNaN(numValue) && numValue > 0 && numValue <= 1440) {
        onDeadlineChange(numValue);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:glass-strong transition-all text-sm"
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
            d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-gray-300">Settings</span>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Transaction Settings</h3>
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

              {/* Gas Price Info */}
              {gasPrice && (
                <div className="mb-4 p-3 rounded-lg glass">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Current Gas Price</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-white font-medium">{gasPrice} Gwei</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Transaction Deadline */}
              <div className="mb-3">
                <label className="text-sm text-gray-400 mb-2 block">
                  Transaction Deadline
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {presetDeadlines.map((value) => (
                    <button
                      key={value}
                      onClick={() => handlePresetClick(value)}
                      className={`py-2 rounded-lg text-xs font-medium transition-all ${
                        deadline === value
                          ? "bg-amber-500 text-black"
                          : "glass hover:glass-strong text-gray-300"
                      }`}
                    >
                      {value}m
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={customDeadline}
                    onChange={handleCustomChange}
                    placeholder="Custom"
                    className="w-full px-3 py-2 rounded-lg glass text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    minutes
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mt-0.5 flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                <span>
                  Your transaction will revert if it is pending for more than this duration.
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

