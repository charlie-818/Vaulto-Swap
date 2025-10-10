import { Chain } from "wagmi/chains";
import { mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia } from "wagmi/chains";

export const supportedChains: Chain[] = [
  mainnet,
  arbitrum,
  optimism,
  base,
  polygon,
  sepolia,
  arbitrumSepolia,
];

export const defaultChain = mainnet;

export const chainConfig = {
  [mainnet.id]: {
    name: "Ethereum",
    shortName: "ETH",
    explorer: mainnet.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_MAINNET_RPC_URL,
  },
  [arbitrum.id]: {
    name: "Arbitrum",
    shortName: "ARB",
    explorer: arbitrum.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL,
  },
  [optimism.id]: {
    name: "Optimism",
    shortName: "OP",
    explorer: optimism.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
  },
  [base.id]: {
    name: "Base",
    shortName: "BASE",
    explorer: base.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL,
  },
  [polygon.id]: {
    name: "Polygon",
    shortName: "MATIC",
    explorer: polygon.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
  },
  [sepolia.id]: {
    name: "Sepolia Testnet",
    shortName: "SEP",
    explorer: sepolia.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL,
  },
  [arbitrumSepolia.id]: {
    name: "Arbitrum Sepolia",
    shortName: "ARB-SEP",
    explorer: arbitrumSepolia.blockExplorers.default.url,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL,
  },
} as const;

