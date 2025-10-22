"use client";

import { CowSwapWidget } from '@cowprotocol/widget-react';
import type { CowSwapWidgetParams } from '@cowprotocol/widget-lib';
import { TradeType } from '@cowprotocol/widget-lib';
import { useChainId, useAccount } from 'wagmi';
import { useEffect, useState, useCallback } from 'react';

export default function CowSwapWidgetWrapper() {
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  // Map wagmi chain IDs to CoW Swap supported chains
  const getCowChainId = useCallback((wagmiChainId: number): number => {
    switch (wagmiChainId) {
      case 1: // Ethereum Mainnet
        return 1;
      case 100: // Gnosis Chain
        return 100;
      case 11155111: // Sepolia
        return 11155111;
      case 42161: // Arbitrum One
        return 42161;
      case 10: // Optimism
        return 10;
      case 8453: // Base
        return 8453;
      case 137: // Polygon
        return 137;
      case 421614: // Arbitrum Sepolia
        return 421614;
      default:
        return 1; // Default to Ethereum Mainnet
    }
  }, []);

  // Get the provider - CowSwap widget needs EIP-1193 provider (window.ethereum)
  const provider = isMounted && isConnected && typeof window !== 'undefined' ? window.ethereum : null;

  // All hooks must be called before any conditional returns
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Debug logging
  useEffect(() => {
    if (isConnected && address) {
      console.log('CowSwap Widget - Wallet Connected:', {
        address,
        chainId,
        cowChainId: getCowChainId(chainId),
        provider: !!provider,
        providerType: provider?.constructor?.name,
        isMounted
      });
    }
  }, [isConnected, address, chainId, provider, isMounted, getCowChainId]);

  // Debug token list configuration
  useEffect(() => {
    const tokenListUrl = "https://app.vaulto.ai/vaulto-token-list.json";
    console.log('CowSwap Widget - Token List Configuration:', {
      tokenListUrl,
      chainId: isConnected ? getCowChainId(chainId) : 1,
      isConnected
    });
    
    // Test if token list is accessible
    if (typeof window !== 'undefined') {
      fetch(tokenListUrl)
        .then(response => response.json())
        .then(data => {
          console.log('CowSwap Widget - Token List Loaded:', data);
        })
        .catch(error => {
          console.error('CowSwap Widget - Token List Error:', error);
        });
    }
  }, [chainId, isConnected, getCowChainId]);

  const params: CowSwapWidgetParams = {
    "appCode": "Vaulto Swap", // Name of your app (max 50 characters)
    "width": "100%", // Responsive width
    "height": "500px", // Optimized height for better mobile compatibility
    "chainId": isConnected ? getCowChainId(chainId) : 1, // Dynamic chain based on user's connected chain
    "tokenLists": [ // Custom Vaulto token list
      "https://app.vaulto.ai/vaulto-token-list.json"
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
    "standaloneMode": false,
    "disableToastMessages": true,
    "disableProgressBar": false,
    "hideBridgeInfo": false,
    "hideOrdersTable": false,
    "images": {},
    "sounds": {},
    "partnerFee": { // 0.5% partner fee for all transactions
      "bps": 50, // 0.5%
      "recipient": "0x88902e56e83331379506A4313595f5B9075Ad3e0", // Fee destination address
    },
    "customTokens": [
      // Add some major tokens as custom tokens to ensure they're available
      {
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "symbol": "USDC",
        "name": "USD Coin",
        "decimals": 6,
        "chainId": 1
      },
      {
        "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        "symbol": "USDT", 
        "name": "Tether USD",
        "decimals": 6,
        "chainId": 1
      },
      {
        "address": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "symbol": "DAI",
        "name": "Dai Stablecoin", 
        "decimals": 18,
        "chainId": 1
      }
    ],
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

  if (!isMounted) {
    return (
      <div className="w-full flex items-center justify-center h-[500px]">
        <div className="text-center">
        </div>
      </div>
    );
  }

  // Show swap interface even when wallet is not connected
  // The CoW widget will handle wallet connection internally

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="w-full flex items-center justify-center min-h-[500px]">
        <CowSwapWidget params={params} provider={provider} />
      </div>
    </div>
  );
}
