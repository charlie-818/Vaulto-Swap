"use client";

import { useEffect, useState } from "react";
import { Token } from "@/config/tokens";
import { useBalance } from "wagmi";
import { formatUnits } from "viem";

interface AmountInputProps {
  token: Token | null;
  amount: string;
  onAmountChange: (amount: string) => void;
  isConnected: boolean;
  address?: `0x${string}`;
  chainId?: number;
  readOnly?: boolean;
}

export default function AmountInput({
  token,
  amount,
  onAmountChange,
  isConnected,
  address,
  chainId,
  readOnly = false,
}: AmountInputProps) {
  const [inputValue, setInputValue] = useState(amount);

  const { data: balance } = useBalance({
    address: address,
    token: token?.address as `0x${string}`,
    chainId: chainId,
  });

  useEffect(() => {
    setInputValue(amount);
  }, [amount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      // Limit to 2 decimals for stablecoins
      if (token?.isStablecoin) {
        const parts = value.split('.');
        if (parts[1] && parts[1].length > 2) {
          return; // Don't allow more than 2 decimal places
        }
      }
      setInputValue(value);
      onAmountChange(value);
    }
  };

  const handleMaxClick = () => {
    if (balance) {
      const maxAmount = formatUnits(balance.value, balance.decimals);
      // Format to 2 decimals for stablecoins
      const formattedAmount = token?.isStablecoin 
        ? parseFloat(maxAmount).toFixed(2)
        : maxAmount;
      setInputValue(formattedAmount);
      onAmountChange(formattedAmount);
    }
  };

  const formattedBalance = balance
    ? parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(
        token?.isStablecoin ? 2 : 6
      )
    : "0.00";

  return (
    <div className="w-full glass rounded-xl p-3">
      <div className="flex items-center justify-between mb-1.5">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="0.0"
          readOnly={readOnly}
          disabled={!token}
          className="text-xl font-semibold bg-transparent border-none outline-none text-white placeholder-gray-600 w-full"
        />
        {!readOnly && isConnected && token && balance && (
          <button
            onClick={handleMaxClick}
            className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-500 text-xs font-semibold hover:bg-amber-500/30 transition-all"
          >
            MAX
          </button>
        )}
      </div>
      {isConnected && token && (
        <div className="text-[10px] text-gray-400">
          Balance: {formattedBalance} {token.symbol}
        </div>
      )}
    </div>
  );
}

