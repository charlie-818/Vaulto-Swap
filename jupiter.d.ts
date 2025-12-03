declare global {
  interface Window {
    Jupiter: {
      init: (config: JupiterPluginConfig) => void;
    };
  }
}

export interface JupiterPluginConfig {
  // Display Modes
  displayMode: "widget" | "integrated" | "modal";
  integratedTargetId?: string;
  
  // Container Styling
  containerStyles?: {
    width?: string;
    height?: string;
    borderRadius?: string;
    overflow?: string;
  };
  containerClassName?: string;
  
  // Theme
  theme?: "dark" | "light";
  
  // Widget Style (for widget mode)
  widgetStyle?: {
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    size?: "sm" | "default";
  };
  
  // Form Properties
  formProps?: {
    swapMode?: "ExactInOrOut" | "ExactIn" | "ExactOut";
    initialAmount?: string;
    initialInputMint?: string;
    initialOutputMint?: string;
    fixedAmount?: boolean;
    fixedMint?: string;
    referralAccount?: string;
    referralFee?: number;
  };
  
  // Wallet Integration
  enableWalletPassthrough?: boolean;
  passthroughWalletContextState?: any;
  onRequestConnectWallet?: () => void;
  
  // Event Handling
  onSuccess?: (txid: string) => void;
  onSwapError?: (error: any) => void;
  onFormUpdate?: (formData: any) => void;
  onScreenUpdate?: (screen: string) => void;
  
  // Branding
  logoUri?: string;
  name?: string;
  
  // Additional Options
  slippage?: number;
  defaultExplorer?: string;
  
  // Custom Token List (for Solana tokens)
  tokens?: Array<{
    address: string; // Solana mint address
    symbol: string;
    name: string;
    decimals: number;
    logoURI?: string;
    tags?: string[];
  }>;
}

export {};

