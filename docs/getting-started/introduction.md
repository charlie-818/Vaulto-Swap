# Introduction to Vaulto Swap

Vaulto Swap is a DeFi swap interface for trading stablecoins with tokenized stocks. Built with Next.js and powered by CoW Swap, it provides MEV-protected trading across multiple blockchain networks.

## Key Features

### Tokenized Stock Trading
Trade major company stocks like Apple (AAPL), Tesla (TSLA), Google (GOOGL), Amazon (AMZN), and Microsoft (MSFT) directly on the blockchain. These tokenized stocks are backed by real securities.

### Multi-Chain Support
Access tokens across multiple blockchain networks:
- **Ethereum** - The original smart contract platform
- **Arbitrum** - Fast and cheap Ethereum L2
- **Optimism** - Optimistic rollup for Ethereum
- **Base** - Coinbase's L2 solution
- **Polygon** - Ethereum scaling solution

### MEV Protection
Powered by CoW Swap, Vaulto Swap protects users from:
- **Front-running** - Malicious actors can't see and exploit your trades
- **Sandwich attacks** - Protection from MEV bots
- **Optimal execution** - Always get the best available price

### Stablecoin Integration
Trade with major stablecoins:
- **USDC** - USD Coin by Circle
- **USDT** - Tether USD
- **DAI** - MakerDAO's decentralized stablecoin

## Supported Assets

### Tokenized Stocks
- **bAAPL** - Apple Inc. stock token
- **bTSLA** - Tesla Inc. stock token
- **bGOOGL** - Alphabet Inc. Class A stock token
- **bAMZN** - Amazon.com Inc. stock token
- **bMSFT** - Microsoft Corporation stock token

### Stablecoins
- **USDC** - USD Coin (6 decimals)
- **USDT** - Tether USD (6 decimals)
- **DAI** - Dai Stablecoin (18 decimals)

### Other Assets
- **WBTC** - Wrapped Bitcoin
- **WETH** - Wrapped Ether

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Wagmi & Viem** - Ethereum interactions
- **Web3Modal** - WalletConnect v2 integration
- **Tailwind CSS** - Utility-first styling

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries

### Infrastructure
- **CoW Swap** - MEV-protected trading
- **WalletConnect** - Wallet connectivity
- **Alchemy/Infura** - Blockchain RPC endpoints

## Getting Started

Ready to start trading? Follow our [Quick Start Guide](quick-start-guide.md) to:
1. Connect your wallet
2. Switch to a supported network
3. Make your first trade

## Important Disclaimers

**This is a demonstration project** - Always do your own research before trading with real funds.

**Smart contracts are unaudited** - Use at your own risk and test thoroughly on testnets.

**Regulatory compliance** - Ensure you comply with local regulations regarding tokenized securities.

## Next Steps

- **[Quick Start Guide](quick-start-guide.md)** - Get trading in 5 minutes
- **[User Guide](user-guide/connecting-wallet.md)** - Complete trading tutorial
- **[FAQ](faq.md)** - Common questions

---

**Ready to trade tokenized stocks?** [Start your first swap now!](quick-start-guide.md)