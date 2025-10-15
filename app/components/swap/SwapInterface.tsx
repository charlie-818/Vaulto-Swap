"use client";

import { useState, useEffect } from "react";
import { useAccount, useChainId, useBalance } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatUnits } from "viem";
import TokenSelector from "./TokenSelector";
import AmountInput from "./AmountInput";
import PriceQuote from "./PriceQuote";
import SwapButton from "./SwapButton";
import OrderTypeToggle, { OrderType } from "./OrderTypeToggle";
import LimitPriceInput from "./LimitPriceInput";
import SlippageControl from "./SlippageControl";
import TransactionSettings from "./TransactionSettings";
import PriceImpact from "./PriceImpact";
import QuickAmountButtons from "./QuickAmountButtons";
import SwapStats from "./SwapStats";
import SwapConfirmationModal from "./SwapConfirmationModal";
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
  const [slippage, setSlippage] = useState<number>(0.5);
  const [deadline, setDeadline] = useState<number>(20);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [priceImpact, setPriceImpact] = useState<number>(0);
  const showRegulated = true; // Always show regulated assets

  // Get balance for quick amount buttons
  const { data: fromBalance } = useBalance({
    address: address,
    token: fromToken?.address as `0x${string}`,
    chainId: chainId,
  });

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
      
      // Calculate price impact (simplified calculation)
      // In production, this would come from the liquidity pool
      const inputValue = parseFloat(fromAmount);
      if (inputValue > 1000) {
        setPriceImpact((inputValue / 10000) * 0.5); // Simplified formula
      } else if (inputValue > 10000) {
        setPriceImpact((inputValue / 10000) * 1.2);
      } else {
        setPriceImpact(0.3);
      }
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

  // Calculate minimum received
  const minimumReceived = toAmount
    ? (parseFloat(toAmount) * (1 - slippage / 100)).toFixed(6)
    : "0";

  // Format balance for quick buttons
  const formattedBalance = fromBalance
    ? formatUnits(fromBalance.value, fromBalance.decimals)
    : "0";

  return (
    <div className="mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          height: orderType === "market" ? "auto" : "auto"
        }}
        transition={{ 
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
        }}
        className="glass-strong rounded-2xl p-6 shadow-2xl w-[540px] overflow-hidden"
      >
        {/* Header with Settings */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white">
            {orderType === "limit" ? "Limit Order" : "Swap Tokens"}
          </h2>
          <div className="flex items-center gap-2">
            <SlippageControl slippage={slippage} onSlippageChange={setSlippage} />
            <TransactionSettings
              deadline={deadline}
              onDeadlineChange={setDeadline}
              gasPrice="25"
            />
          </div>
        </div>

        {/* Order Type Toggle */}
        <OrderTypeToggle orderType={orderType} onOrderTypeChange={setOrderType} />

        {/* From Token */}
        <div className="mb-1">
          <label className="text-xs text-gray-400 mb-1.5 block">From</label>
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
          {/* Quick Amount Buttons */}
          {isConnected && fromToken && (
            <QuickAmountButtons
              balance={formattedBalance}
              onAmountSelect={setFromAmount}
              decimals={fromToken.isStablecoin ? 2 : 6}
            />
          )}
        </div>

        {/* Compact Divider with Swap Button */}
        <div className="relative flex items-center justify-center my-1">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700/50"></div>
          </div>
          <div className="relative">
            <button
              onClick={handleSwapTokens}
              disabled={!fromToken || !toToken}
              className="p-1.5 rounded-lg glass hover:glass-strong transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              title="Reverse swap direction"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 text-amber-500 group-hover:rotate-180 transition-transform duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* To Token */}
        <div className="mb-2">
          <label className="text-xs text-gray-400 mb-1.5 block">To</label>
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

        {/* Dynamic Info Section with Accordion Effect */}
        <motion.div 
          animate={{ 
            height: orderType === "market" ? "auto" : "auto",
            marginBottom: orderType === "market" ? "0.5rem" : "0.5rem"
          }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <AnimatePresence mode="wait">
            {orderType === "limit" ? (
              <motion.div
                key="limit-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Limit Price Input */}
                {fromToken && toToken && (
                  <LimitPriceInput
                    fromToken={fromToken}
                    toToken={toToken}
                    limitPrice={limitPrice}
                    onLimitPriceChange={setLimitPrice}
                    currentMarketPrice={currentMarketPrice}
                  />
                )}
                
                {/* Swap Stats for Limit Orders */}
                {fromToken && toToken && fromAmount && toAmount && currentMarketPrice && (
                  <SwapStats
                    fromToken={fromToken}
                    toToken={toToken}
                    rate={currentMarketPrice}
                    estimatedGas="2.45"
                    minimumReceived={minimumReceived}
                    liquiditySource="Vaulto Pool"
                    route={[fromToken.symbol, toToken.symbol]}
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="market-section"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                className="space-y-2"
              >
                {/* Price Impact Warning */}
                {priceImpact > 0 && fromAmount && (
                  <PriceImpact priceImpact={priceImpact} />
                )}

                {/* Price Quote */}
                {fromToken && toToken && fromAmount && (
                  <PriceQuote
                    fromToken={fromToken}
                    toToken={toToken}
                    fromAmount={fromAmount}
                    onQuoteReceived={handleQuoteReceived}
                    onLoadingChange={setIsLoadingQuote}
                    chainId={chainId}
                  />
                )}

                {/* Swap Stats for Market Orders */}
                {fromToken && toToken && fromAmount && toAmount && currentMarketPrice && (
                  <SwapStats
                    fromToken={fromToken}
                    toToken={toToken}
                    rate={currentMarketPrice}
                    estimatedGas="2.45"
                    minimumReceived={minimumReceived}
                    liquiditySource="Vaulto Pool"
                    route={[fromToken.symbol, toToken.symbol]}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

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
            onSwapClick={() => setShowConfirmModal(true)}
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

      {/* Confirmation Modal */}
      {fromToken && toToken && (
        <SwapConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={async () => {
            if (!address || !chainId) return;
            
            try {
              const { executeSwap } = await import("@/lib/swap/swapExecutor");
              const toast = (await import("react-hot-toast")).default;
              
              if (orderType === "limit") {
                toast.success(
                  <div>
                    <div className="font-semibold">Limit Order Placed!</div>
                    <div className="text-xs mt-1">
                      Buy {toAmount} {toToken.symbol} at {limitPrice} {fromToken.symbol}
                    </div>
                  </div>,
                  { duration: 5000 }
                );
              } else {
                const result = await executeSwap({
                  fromToken,
                  toToken,
                  fromAmount,
                  toAmount,
                  address,
                  chainId,
                });

                if (result.success) {
                  toast.success(
                    <div>
                      <div className="font-semibold">Swap Successful!</div>
                      <div className="text-xs mt-1">
                        {fromAmount} {fromToken.symbol} → {toAmount} {toToken.symbol}
                      </div>
                    </div>
                  );
                } else {
                  toast.error(result.error || "Swap failed");
                }
              }
            } catch (error: any) {
              const toast = (await import("react-hot-toast")).default;
              toast.error(error.message || "Swap failed");
            }
          }}
          fromToken={fromToken}
          toToken={toToken}
          fromAmount={fromAmount}
          toAmount={toAmount}
          rate={currentMarketPrice}
          slippage={slippage}
          minimumReceived={minimumReceived}
          estimatedGas="2.45"
          priceImpact={priceImpact}
          orderType={orderType}
          limitPrice={limitPrice}
        />
      )}
    </div>
  );
}

