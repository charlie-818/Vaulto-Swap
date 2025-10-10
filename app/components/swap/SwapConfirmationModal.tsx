"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Token } from "@/config/tokens";
import Image from "next/image";

interface SwapConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  fromToken: Token;
  toToken: Token;
  fromAmount: string;
  toAmount: string;
  rate: string;
  slippage: number;
  minimumReceived: string;
  estimatedGas?: string;
  priceImpact?: number;
  orderType?: "market" | "limit";
  limitPrice?: string;
}

export default function SwapConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  rate,
  slippage,
  minimumReceived,
  estimatedGas,
  priceImpact,
  orderType = "market",
  limitPrice,
}: SwapConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-6 shadow-2xl w-full max-w-md border border-gray-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">
                  {orderType === "limit" ? "Confirm Limit Order" : "Confirm Swap"}
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Swap Preview */}
              <div className="space-y-3 mb-6">
                {/* From Token */}
                <div className="glass rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-2">You're Sending</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={fromToken.logo}
                          alt={fromToken.symbol}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">
                          {fromAmount}
                        </div>
                        <div className="text-sm text-gray-400">
                          {fromToken.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex justify-center">
                  <div className="p-2 rounded-lg glass">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5 text-amber-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
                      />
                    </svg>
                  </div>
                </div>

                {/* To Token */}
                <div className="glass rounded-xl p-4">
                  <div className="text-xs text-gray-400 mb-2">
                    {orderType === "limit" ? "You'll Receive (when filled)" : "You're Receiving"}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={toToken.logo}
                          alt={toToken.symbol}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-white">
                          {toAmount}
                        </div>
                        <div className="text-sm text-gray-400">
                          {toToken.symbol}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="glass rounded-xl p-4 space-y-3 mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Transaction Details
                </div>

                {orderType === "limit" && limitPrice && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Limit Price</span>
                    <span className="text-white font-medium">
                      {limitPrice} {fromToken.symbol}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-white font-medium">
                    1 {fromToken.symbol} = {parseFloat(rate).toFixed(6)} {toToken.symbol}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <span className="text-white font-medium">{slippage}%</span>
                </div>

                {orderType === "market" && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Minimum Received</span>
                    <span className="text-white font-medium">
                      {minimumReceived} {toToken.symbol}
                    </span>
                  </div>
                )}

                {priceImpact !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Price Impact</span>
                    <span
                      className={`font-medium ${
                        priceImpact < 1
                          ? "text-green-400"
                          : priceImpact < 3
                          ? "text-yellow-400"
                          : "text-red-400"
                      }`}
                    >
                      {priceImpact.toFixed(2)}%
                    </span>
                  </div>
                )}

                {estimatedGas && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span className="text-white font-medium">${estimatedGas}</span>
                  </div>
                )}
              </div>

              {/* Warning for high price impact */}
              {priceImpact !== undefined && priceImpact >= 5 && (
                <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-start gap-2 text-red-400 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 flex-shrink-0 mt-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                      />
                    </svg>
                    <div>
                      <div className="font-semibold mb-1">High Price Impact</div>
                      <div className="text-xs">
                        This trade will significantly affect the market price. Consider splitting into smaller trades.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onClose}
                  className="py-3 px-4 rounded-xl glass hover:glass-strong font-semibold text-white transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 font-semibold text-black transition-all shadow-lg hover:shadow-xl"
                >
                  {orderType === "limit" ? "Place Order" : "Confirm Swap"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

