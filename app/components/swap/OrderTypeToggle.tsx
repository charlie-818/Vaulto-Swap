"use client";

import { motion } from "framer-motion";

export type OrderType = "market" | "limit";

interface OrderTypeToggleProps {
  orderType: OrderType;
  onOrderTypeChange: (type: OrderType) => void;
}

export default function OrderTypeToggle({
  orderType,
  onOrderTypeChange,
}: OrderTypeToggleProps) {
  return (
    <div className="w-full flex gap-2 mb-6">
      <button
        onClick={() => onOrderTypeChange("market")}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all relative overflow-hidden ${
          orderType === "market"
            ? "text-white"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        {orderType === "market" && (
          <motion.div
            layoutId="orderTypeBackground"
            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">Market</span>
      </button>
      <button
        onClick={() => onOrderTypeChange("limit")}
        className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all relative overflow-hidden ${
          orderType === "limit"
            ? "text-white"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        {orderType === "limit" && (
          <motion.div
            layoutId="orderTypeBackground"
            className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">Limit</span>
      </button>
    </div>
  );
}

