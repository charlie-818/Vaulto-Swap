"use client";

import { CowSwapWidget } from '@cowprotocol/widget-react';
import type { CowSwapWidgetParams } from '@cowprotocol/widget-lib';
import { TradeType } from '@cowprotocol/widget-lib';
import { useChainId } from 'wagmi';
import { useEffect, useState } from 'react';

export default function CowSwapWidgetWrapper() {
  const chainId = useChainId();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Map wagmi chain IDs to CoW Swap supported chains
  const getCowChainId = (wagmiChainId: number): number => {
    switch (wagmiChainId) {
      case 1: // Ethereum Mainnet
        return 1;
      case 100: // Gnosis Chain
        return 100;
      case 11155111: // Sepolia
        return 11155111;
      default:
        return 1; // Default to Ethereum Mainnet
    }
  };

  const params: CowSwapWidgetParams = {
    "appCode": "Vaulto Swap", // Name of your app (max 50 characters)
    "width": "100%", // Responsive width
    "height": "600px", // Reduced height for mobile compatibility
    "chainId": getCowChainId(chainId), // Dynamic chain based on user's connected chain
    "tokenLists": [ // All default enabled token lists
      "https://raw.githubusercontent.com/cowprotocol/token-lists/main/src/public/CoinGecko.1.json",
      "https://files.cow.fi/tokens/CowSwap.json"
    ],
    "tradeType": TradeType.SWAP, // Default to SWAP
    "sell": { // Default sell token
      "asset": "USDC",
      "amount": "100"
    },
    "buy": { // Default buy token
      "asset": "NVDAX",
      "amount": "1"
    },
    "enabledTradeTypes": [ // Enable all trade types
      TradeType.SWAP,
      TradeType.LIMIT,
      TradeType.YIELD
    ],
    "standaloneMode": true,
    "disableToastMessages": true,
    "disableProgressBar": false,
    "hideBridgeInfo": false,
    "hideOrdersTable": false,
    "images": {},
    "sounds": {},
    "customTokens": [],
    // Custom theme colors to match Vaulto's gold/amber palette
    "theme": {
      "baseTheme": "dark",
      "primary": "#f59e0b", // amber-500
      "background": "#000000", // black
      "paper": "#1f2937", // gray-800
      "text": "#ffffff", // white
      "danger": "#ef4444", // red-500
      "warning": "#f59e0b", // amber-500
      "alert": "#f59e0b", // amber-500
      "info": "#3b82f6", // blue-500
      "success": "#10b981", // emerald-500
    }
  };

  // Get the Ethereum provider from window.ethereum
  const provider = isMounted && typeof window !== 'undefined' ? window.ethereum : null;

  if (!isMounted) {
    return (
      <div className="w-full flex items-center justify-center h-[600px]">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Loading swap interface...</p>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="w-full flex items-center justify-center h-[600px]">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Please install a Web3 wallet to use the swap interface</p>
          <p className="text-sm text-gray-500">MetaMask, WalletConnect, or other compatible wallets are supported</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="w-full flex items-center justify-center min-h-[600px]">
        <CowSwapWidget params={params} provider={provider} />
      </div>
    </div>
  );
}
