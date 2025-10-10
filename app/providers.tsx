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
        url: "https://vaulto-swap.vercel.app",
        icons: ["https://vaulto-swap.vercel.app/icon.png"],
      },
      showQrModal: false,
    }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: "Vaulto Swap",
      appLogoUrl: "https://vaulto-swap.vercel.app/icon.png",
    }),
  ],
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_MAINNET_RPC_URL),
    [arbitrum.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL),
    [optimism.id]: http(process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL),
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
    [polygon.id]: http(process.env.NEXT_PUBLIC_POLYGON_RPC_URL),
    [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL),
    [arbitrumSepolia.id]: http(process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL),
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
    "--w3m-accent": "#8b5cf6",
    "--w3m-border-radius-master": "8px",
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

