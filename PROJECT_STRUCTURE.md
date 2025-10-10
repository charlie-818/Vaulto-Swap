# 📁 Vaulto Swap - Project Structure

## Overview

```
vaulto-swap/
├── 📱 Frontend (Next.js App)
│   ├── app/                      # Next.js 14 App Router
│   │   ├── components/swap/      # Swap interface components
│   │   ├── layout.tsx            # Root layout with providers
│   │   ├── page.tsx              # Main page
│   │   ├── providers.tsx         # Web3 providers setup
│   │   └── globals.css           # Global styles
│   │
│   ├── config/                   # Configuration files
│   │   ├── chains.ts             # Supported blockchain networks
│   │   ├── tokens.ts             # Token lists per chain
│   │   └── env.ts                # Environment validation
│   │
│   ├── lib/                      # Business logic
│   │   ├── liquidity/            # Price quoting & aggregation
│   │   ├── swap/                 # Swap execution logic
│   │   ├── types/                # TypeScript type definitions
│   │   └── utils/                # Utility functions
│   │
│   └── public/                   # Static assets
│
├── 🔐 Smart Contracts
│   └── contracts/
│       ├── contracts/            # Solidity source files
│       │   ├── SwapPool.sol      # AMM liquidity pool
│       │   ├── PoolFactory.sol   # Pool factory
│       │   └── interfaces/       # Contract interfaces
│       │
│       ├── scripts/              # Deployment scripts
│       │   └── deploy.ts         # Main deployment script
│       │
│       ├── hardhat.config.ts     # Hardhat configuration
│       └── typechain-types/      # Generated TypeScript types
│
└── 📚 Documentation
    ├── README.md                 # Main documentation
    ├── DEPLOYMENT.md             # Deployment guide
    ├── SETUP_COMPLETE.md         # Setup completion guide
    ├── PROJECT_STRUCTURE.md      # This file
    └── LICENSE                   # MIT License
```

## 🎯 Key Components Explained

### Frontend Components (`app/components/swap/`)

#### SwapInterface.tsx
Main swap container that orchestrates all swap functionality:
- Manages swap state (from/to tokens, amounts)
- Handles token swapping direction
- Integrates all child components
- Displays compliance warnings

#### TokenSelector.tsx
Dropdown for token selection:
- Filters stablecoins vs tokenized stocks
- Shows compliance badges for regulated assets
- Prevents selecting same token twice
- Chain-aware token lists

#### AmountInput.tsx
Input field for token amounts:
- Real-time balance display
- MAX button for quick entry
- Validation for numeric input
- Read-only mode for output amount

#### PriceQuote.tsx
Real-time price display:
- Fetches quotes from custom pools
- Falls back to Uniswap if needed
- Auto-refreshes every 10 seconds
- Shows liquidity source

#### SwapButton.tsx
Smart swap execution button:
- Handles wallet connection
- Manages token approval flow
- Executes swap transaction
- Provides user feedback

#### ComplianceToggle.tsx
Toggle for showing regulated assets:
- Filters tokenized stocks
- Shows/hides compliance warnings
- Smooth animation

### Configuration Files (`config/`)

#### chains.ts
Defines supported blockchain networks:
- Ethereum Mainnet
- Arbitrum
- Optimism
- Base
- Polygon
- Sepolia (testnet)
- Arbitrum Sepolia (testnet)

#### tokens.ts
Token lists for each chain:
- Stablecoins (USDC, USDT, DAI)
- Tokenized stocks (bAAPL, bTSLA, bGOOGL, etc.)
- Token metadata (addresses, decimals, symbols)
- Compliance flags

#### env.ts
Environment variable validation:
- Type-safe with Zod schema
- Validates required config
- Provides helpful error messages

### Business Logic (`lib/`)

#### liquidity/priceQuoter.ts
Price aggregation logic:
- Queries custom pools first
- Falls back to Uniswap V3
- Returns best available rate
- Mock prices for demo

#### liquidity/uniswapFallback.ts
Uniswap V3 integration:
- Fetches quotes from Uniswap
- Pool address lookup
- Multi-hop route support (planned)

#### swap/swapExecutor.ts
Swap execution flow:
- Token approval checks
- Swap transaction execution
- Status tracking
- Transaction history

#### types/swap.ts
TypeScript type definitions:
- SwapQuote
- SwapTransaction
- LiquidityPool
- TokenApproval

#### utils/formatters.ts
Formatting utilities:
- Number formatting
- Address truncation
- Timestamp formatting
- Compact number notation

#### utils/validation.ts
Validation utilities:
- Address validation
- Amount validation
- Balance checks
- Price impact calculation

### Smart Contracts (`contracts/contracts/`)

#### SwapPool.sol
AMM-style liquidity pool:
- Constant product formula (x * y = k)
- Swap functionality with slippage protection
- Liquidity provision (add/remove)
- 0.3% swap fee (configurable)
- ReentrancyGuard protection

#### PoolFactory.sol
Factory for deploying pools:
- CREATE2 deterministic deployment
- Pool registry
- Prevents duplicate pools

#### interfaces/ISwapPool.sol
Pool interface definition:
- Standard swap interface
- Liquidity management functions
- Event definitions

## 🔄 Data Flow

```
User Input
    ↓
SwapInterface (manages state)
    ↓
TokenSelector + AmountInput (user input)
    ↓
PriceQuote (fetch best price)
    ↓
    ├─→ Custom Pool (primary)
    └─→ Uniswap V3 (fallback)
    ↓
SwapButton (execute)
    ↓
    ├─→ Check approval
    ├─→ Approve if needed
    ├─→ Execute swap
    └─→ Show feedback
```

## 🎨 Styling Architecture

- **Tailwind CSS**: Utility-first styling
- **Glassmorphism**: Modern blur effects
- **Dark Mode**: Purple/blue gradient theme
- **Framer Motion**: Smooth animations
- **Responsive**: Mobile-first design

## 🔧 Configuration Files

### package.json
Frontend dependencies:
- React 18 + Next.js 14
- Wagmi + Viem (Web3)
- Web3Modal (WalletConnect)
- TanStack Query
- Framer Motion
- React Hot Toast

### contracts/package.json
Smart contract dependencies:
- Hardhat
- OpenZeppelin Contracts
- TypeChain
- Hardhat Verify

### tsconfig.json
TypeScript configuration:
- Strict mode enabled
- Path aliases (@/*)
- Next.js integration

### tailwind.config.ts
Tailwind configuration:
- Custom colors
- Gradient utilities
- Extended theme

## 📦 Build Outputs

### Frontend
- `.next/` - Next.js build output
- `node_modules/` - Dependencies

### Contracts
- `artifacts/` - Compiled contracts
- `cache/` - Hardhat cache
- `typechain-types/` - Generated TypeScript types

## 🚀 Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Contracts
```bash
npm run compile              # Compile contracts
npm run test                 # Run tests
npm run deploy:sepolia       # Deploy to Sepolia
npm run deploy:arbitrum-sepolia  # Deploy to Arbitrum Sepolia
```

## 🌐 Environment Variables

Required:
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`

Optional:
- `NEXT_PUBLIC_*_RPC_URL` (for each chain)
- `NEXT_PUBLIC_POOL_FACTORY_ADDRESS_*` (after deployment)
- `DEPLOYER_PRIVATE_KEY` (for deployment only)

## 📝 Notes

- All TypeScript for type safety
- Mobile-first responsive design
- Production-ready file structure
- Modular and maintainable
- Well-documented code
- Security best practices

---

This structure follows Next.js 14 App Router conventions and modern DeFi development patterns.

