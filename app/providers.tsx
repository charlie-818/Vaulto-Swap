"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnect, injected, coinbaseWallet } from "wagmi/connectors";
import { Toaster } from "react-hot-toast";

// Initialize QueryClient
const queryClient = new QueryClient();

// WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn("⚠️ WalletConnect Project ID not set. Please add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to your .env.local file.");
}

// Configure wagmi
const config = createConfig({
  chains: [mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia],
  connectors: [
    walletConnect({ 
      projectId,
      metadata: {
        name: "Vaulto Swap",
        description: "Trade tokenized stocks with stablecoins",
        url: typeof window !== 'undefined' ? window.location.origin : "https://swap.vaulto.ai",
        icons: [typeof window !== 'undefined' ? `${window.location.origin}/favicon.png` : "https://swap.vaulto.ai/favicon.png"],
      },
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: "Vaulto Swap",
      appLogoUrl: typeof window !== 'undefined' ? `${window.location.origin}/favicon.png` : "https://swap.vaulto.ai/favicon.png",
    }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL || "https://eth.llamarpc.com"),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL || "https://arb1.arbitrum.io/rpc"),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL || "https://mainnet.optimism.io"),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL || "https://mainnet.base.org"),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL || "https://polygon-rpc.com"),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org"),
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL || "https://sepolia-rollup.arbitrum.io/rpc"),
  },
  ssr: true,
});

// Create Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "#f59e0b", // amber-500 (gold)
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "rgba(15, 23, 42, 0.95)",
              color: "#fff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
            },
            success: {
              iconTheme: {
                primary: "#10b981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

