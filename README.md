# Vaulto Swap

A modern DeFi swap interface for trading stablecoins with tokenized stocks. Built with Next.js and powered by CoW Swap for MEV-protected trading.

## Features

- **Multi-Chain Support**: Ethereum, Arbitrum, Optimism, Base, and Polygon
- **MEV Protection**: CoW Swap integration prevents front-running and sandwich attacks
- **Tokenized Stocks**: Trade major stocks (AAPLx, TSLAx, GOOGLx, AMZNx, MSFTx) with stablecoins
- **WalletConnect v2**: Fast wallet connection with 300+ supported wallets
- **Mobile-First**: Responsive interface optimized for all devices

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- MetaMask or compatible Web3 wallet

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/charlie-818/Vaulto-Swap.git
cd Vaulto-Swap
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

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Live Application

Try Vaulto Swap at [app.vaulto.ai](https://app.vaulto.ai)

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CoW Swap Widget** - MEV-protected trading interface
- **Wagmi & Viem** - Ethereum interactions
- **WalletConnect v2** - Wallet connection protocol
- **Tailwind CSS** - Utility-first styling

## Project Structure

```
Vaulto-Swap/
├── app/
│   ├── components/
│   │   └── swap/          # CoW Swap widget integration
│   ├── providers.tsx       # Web3 providers setup
│   └── page.tsx           # Main application
├── config/
│   ├── chains.ts          # Supported networks
│   └── tokens.ts          # Token configurations
└── contracts/             # Optional smart contracts
```

## Deployment

### Frontend (Vercel/Netlify)

1. Push to GitHub
2. Import project in deployment platform
3. Add `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable
4. Deploy

## Security Notice

This is a demonstration project. Smart contracts have not been audited. Use at your own risk and test thoroughly on testnets before mainnet use.

## License

MIT License - see LICENSE file for details

