"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { RainbowKitProvider, darkTheme, connectorsForWallets } from "@rainbow-me/rainbowkit";
import { 
  metaMaskWallet,
  coinbaseWallet as coinbaseWalletRainbowKit, 
  trustWallet 
} from "@rainbow-me/rainbowkit/wallets";
import "@rainbow-me/rainbowkit/styles.css";

// Initialize QueryClient
const queryClient = new QueryClient();

// WalletConnect Project ID
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

if (!projectId) {
  console.warn("⚠️ WalletConnect Project ID not set. Please add NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID to your .env.local file.");
}

// Supported chains
const chains = [mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia] as const;

// Configure RainbowKit wallets - only MetaMask, Coinbase Wallet, and Trust Wallet
// RainbowKit will automatically detect these wallets from the connectors in wagmi config

// Configure wagmi connectors - only include connectors for MetaMask, Coinbase Wallet, and Trust Wallet
const rainbowKitConnectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWalletRainbowKit,
        trustWallet,
      ],
    },
  ],
  { appName: 'Vaulto Swap', projectId }
);

// Configure wagmi
const config = createConfig({
  chains,
  connectors: [
    ...rainbowKitConnectors,
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

// RainbowKit theme configuration to match existing design
const rainbowKitTheme = darkTheme({
  accentColor: "#facc15", // yellow-400 (Vaulto gold)
  accentColorForeground: "#000000",
  borderRadius: "medium",
  fontStack: "system",
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider 
          theme={rainbowKitTheme}
          initialChain={mainnet}
          modalSize="compact"
          appInfo={{
            appName: 'Vaulto Swap',
          }}
        >
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
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

