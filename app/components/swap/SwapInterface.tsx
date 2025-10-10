"use client";

import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import PriceQuote from "./PriceQuote";
import SwapButton from "./SwapButton";
import OrderTypeToggle, { OrderType } from "./OrderTypeToggle";
import LimitPriceInput from "./LimitPriceInput";
import { Token, getStablecoins, getTokenizedStocks } from "@/config/tokens";
import { motion, AnimatePresence } from "framer-motion";

interface SwapInterfaceProps {
  isRestricted?: boolean;
}

export default function SwapInterface({ isRestricted = false }: SwapInterfaceProps) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { open } = useWeb3Modal();

  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");
  const [isLoadingQuote, setIsLoadingQuote] = useState<boolean>(false);
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [currentMarketPrice, setCurrentMarketPrice] = useState<string>("");
  const showRegulated = true; // Always show regulated assets

  // Set USDC and TSLA as default tokens on mount
  useEffect(() => {
    if (chainId && !fromToken && !toToken) {
      const stablecoins = getStablecoins(chainId);
      const usdc = stablecoins.find(token => token.symbol === "USDC");
      if (usdc) {
        setFromToken(usdc);
      }

      const stocks = getTokenizedStocks(chainId, true);
      const tsla = stocks.find(token => token.symbol === "bTSLA");
      if (tsla) {
        setToToken(tsla);
      }
    }
  }, [chainId, fromToken, toToken]);

  const handleSwapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleQuoteReceived = (amount: string, rate?: string) => {
    setToAmount(amount);
    if (rate) {
      setCurrentMarketPrice(rate);
    }
  };

  // Calculate output amount for limit orders
  useEffect(() => {
    if (orderType === "limit" && fromAmount && limitPrice) {
      const amount = parseFloat(fromAmount);
      const price = parseFloat(limitPrice);
      if (!isNaN(amount) && !isNaN(price) && price > 0) {
        const output = amount / price;
        setToAmount(output.toFixed(6));
      }
    }
  }, [orderType, fromAmount, limitPrice]);

  return (
    <div className="mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-strong rounded-2xl p-6 shadow-2xl w-[480px]"
      >
        {/* Order Type Toggle */}
        <OrderTypeToggle orderType={orderType} onOrderTypeChange={setOrderType} />

        {/* From Token */}
        <div className="mb-2">
          <label className="text-sm text-gray-400 mb-2 block">From</label>
          <TokenSelector
            selectedToken={fromToken}
            onSelectToken={setFromToken}
            otherToken={toToken}
            filterStablecoins={true}
            showRegulated={showRegulated}
          />
          <AmountInput
            token={fromToken}
            amount={fromAmount}
            onAmountChange={setFromAmount}
            isConnected={isConnected}
            address={address}
            chainId={chainId}
          />
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center my-4">
          <button
            onClick={handleSwapTokens}
            disabled={!fromToken || !toToken}
            className="p-2 rounded-lg glass hover:glass-strong transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
          </button>
        </div>

        {/* To Token */}
        <div className="mb-6">
          <label className="text-sm text-gray-400 mb-2 block">To</label>
          <TokenSelector
            selectedToken={toToken}
            onSelectToken={setToToken}
            otherToken={fromToken}
            filterStablecoins={false}
            showRegulated={showRegulated}
          />
          <AmountInput
            token={toToken}
            amount={toAmount}
            onAmountChange={setToAmount}
            isConnected={isConnected}
            address={address}
            chainId={chainId}
            readOnly={orderType === "market"}
          />
        </div>

        {/* Limit Price Input */}
        <AnimatePresence>
          {orderType === "limit" && (
            <LimitPriceInput
              fromToken={fromToken}
              toToken={toToken}
              limitPrice={limitPrice}
              onLimitPriceChange={setLimitPrice}
              currentMarketPrice={currentMarketPrice}
            />
          )}
        </AnimatePresence>

        {/* Price Quote */}
        <AnimatePresence>
          {orderType === "market" && fromToken && toToken && fromAmount && (
            <PriceQuote
              fromToken={fromToken}
              toToken={toToken}
              fromAmount={fromAmount}
              onQuoteReceived={handleQuoteReceived}
              onLoadingChange={setIsLoadingQuote}
              chainId={chainId}
            />
          )}
        </AnimatePresence>

        {/* Swap Button */}
        <div className="relative">
          <SwapButton
            isConnected={isConnected}
            fromToken={fromToken}
            toToken={toToken}
            fromAmount={fromAmount}
            toAmount={toAmount}
            isLoadingQuote={isLoadingQuote}
            onConnect={() => open()}
            address={address}
            chainId={chainId}
            disabled={isRestricted}
            orderType={orderType}
            limitPrice={limitPrice}
          />
          {isRestricted && (
            <div className="absolute inset-0 bg-red-600 rounded-xl flex items-center justify-center pointer-events-none">
              <span className="text-white font-semibold text-sm">
                Restricted Region
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

