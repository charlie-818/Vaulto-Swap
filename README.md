# Vaulto Swap 🔄

A modern, minimal DeFi swap interface for trading stablecoins with tokenized stocks. Built with Next.js, TypeScript, and Solidity smart contracts.

## ✨ Features

- **Multi-Chain Support**: Ethereum, Arbitrum, Optimism, Base, and Polygon
- **WalletConnect v2**: Fast wallet connection with session persistence
- **Liquidity Aggregation**: Custom AMM pools with Uniswap V3 fallback
- **Real-time Quotes**: Instant price updates every 10 seconds
- **Compliance Toggle**: Filter regulated tokenized assets
- **Mobile-First**: Sleek, responsive UI with glassmorphism design
- **Smart Routing**: Automatic best price discovery across liquidity sources

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask or compatible Web3 wallet
- (Optional) Alchemy/Infura API keys for RPC endpoints

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/vaulto-swap.git
cd vaulto-swap
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` - Get from [WalletConnect Cloud](https://cloud.walletconnect.com)
- RPC URLs for supported chains (Alchemy, Infura, or public RPCs)

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🔧 Smart Contracts

### Setup

```bash
cd contracts
npm install
```

### Compile Contracts

```bash
npm run compile
```

### Deploy to Testnet

Add `DEPLOYER_PRIVATE_KEY` to your `.env.local` (never commit this!)

```bash
# Deploy to Sepolia
npm run deploy:sepolia

# Deploy to Arbitrum Sepolia
npm run deploy:arbitrum-sepolia
```

After deployment, add the contract addresses to your `.env.local`:
```
NEXT_PUBLIC_POOL_FACTORY_ADDRESS_SEPOLIA=0x...
NEXT_PUBLIC_POOL_FACTORY_ADDRESS_ARBITRUM_SEPOLIA=0x...
```

## 📦 Project Structure

```
vaulto-swap/
├── app/
│   ├── components/
│   │   └── swap/          # Swap interface components
│   ├── providers.tsx       # Web3 providers (WalletConnect, Wagmi)
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── config/
│   ├── chains.ts          # Supported blockchain networks
│   ├── tokens.ts          # Token lists per chain
│   └── env.ts             # Environment validation
├── lib/
│   ├── liquidity/         # Price quoting and aggregation
│   └── swap/              # Swap execution logic
├── contracts/
│   ├── contracts/
│   │   ├── SwapPool.sol   # AMM liquidity pool
│   │   ├── PoolFactory.sol # Pool deployment factory
│   │   └── interfaces/
│   ├── scripts/
│   │   └── deploy.ts      # Deployment script
│   └── hardhat.config.ts
└── package.json
```

## 🎨 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Wagmi & Viem** - Ethereum interactions
- **Web3Modal** - WalletConnect v2 integration
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hot Toast** - Toast notifications

### Smart Contracts
- **Solidity 0.8.20** - Smart contract language
- **Hardhat** - Development environment
- **OpenZeppelin** - Secure contract libraries

## 🔑 Key Components

### SwapInterface
Main swap UI with token selection, amount inputs, and swap execution.

### TokenSelector
Dropdown for selecting stablecoins and tokenized stocks with compliance filtering.

### PriceQuote
Real-time price display with auto-refresh and liquidity source indication.

### SwapButton
Smart button handling wallet connection, token approval, and swap execution.

## 🧪 Testing

Frontend tests (coming soon):
```bash
npm run test
```

Smart contract tests:
```bash
cd contracts
npm run test
```

## 🚢 Deployment

### Frontend (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Smart Contracts

See the [Smart Contracts](#-smart-contracts) section above.

## 🔐 Security Considerations

- This is a demo/prototype - **NOT PRODUCTION READY**
- Smart contracts have not been audited
- Test thoroughly on testnets before mainnet
- Always verify contract addresses
- Use hardware wallets for large amounts
- Understand slippage and price impact

## 📝 Token Configuration

To add new tokens, edit `config/tokens.ts`:

```typescript
{
  address: "0x...",
  symbol: "TOKEN",
  name: "Token Name",
  decimals: 18,
  isStablecoin: true,
  isTokenizedStock: false,
  requiresCompliance: false,
}
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- [Backed Finance](https://backed.fi) for tokenized stock inspiration
- [Uniswap](https://uniswap.org) for AMM design patterns
- [WalletConnect](https://walletconnect.com) for wallet connection infrastructure

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Join our Discord (coming soon)

---

**⚠️ Disclaimer**: This software is provided "as is" for educational purposes. Always do your own research and understand the risks before trading.

