# Vaulto

A permissionless DeFi protocol for swapping Real World Assets (RWAs) across EVM chains. Built with Next.js and powered by CoW Swap's MEV-protected batch auction engine for optimal RWA execution and settlement.

## Features

- **RWA Trading**: Swap tokenized US Treasuries, equities, commodities, and ETFs
- **MEV Protection**: CoW Protocol integration prevents front-running and sandwich attacks
- **Multi-Chain Support**: Trade RWAs on Ethereum, Arbitrum, Optimism, Base, and Polygon
- **Intent-Based Trading**: Submit trading intents for optimal batch execution
- **Non-Custodial**: Fully decentralized with no KYC requirements
- **Professional Interface**: Mobile-optimized with institutional-grade UX

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

Try Vaulto at [app.vaulto.ai](https://app.vaulto.ai)

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **CoW Swap Widget** - MEV-protected RWA trading interface
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

## Important Notice

Users are responsible for ensuring their RWA trading activities comply with applicable laws and regulations in their jurisdiction. Always conduct your own research and understand the risks before trading RWAs.

## License

MIT License - see LICENSE file for details

