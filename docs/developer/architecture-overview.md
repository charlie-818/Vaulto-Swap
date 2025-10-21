# Architecture Overview

Vaulto Swap is built with a modern, scalable architecture that combines the best of Web3 and traditional web development. This guide provides a comprehensive overview of the system architecture, design patterns, and technical decisions.

## System Architecture

### **High-Level Architecture**

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Smart         │    │   External      │
│   (Next.js)     │◄──►│   Contracts     │◄──►│   Services      │
│                 │    │   (Solidity)    │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web3          │    │   CoW Swap      │    │   WalletConnect │
│   Integration   │    │   Protocol      │    │   Service       │
│   (Wagmi/Viem)  │    │   (MEV Protection)│    │   (Wallet API) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **Component Layers**

#### **Presentation Layer**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations

#### **Business Logic Layer**
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript interface for Ethereum
- **TanStack Query**: Data fetching and caching
- **Custom Hooks**: Business logic abstraction

#### **Blockchain Layer**
- **CoW Swap Widget**: MEV-protected trading interface
- **Smart Contracts**: Custom AMM pools and factory
- **WalletConnect v2**: Wallet connection protocol
- **Multi-chain Support**: Ethereum, L2s, and alternative L1s

#### **Infrastructure Layer**
- **Vercel/Netlify**: Frontend hosting
- **Alchemy/Infura**: Blockchain RPC endpoints
- **GitHub**: Source code management
- **Hardhat**: Smart contract development

## Frontend Architecture

### **Next.js 14 App Router Structure**

```
app/
├── components/           # Reusable UI components
│   └── swap/            # Swap-specific components
├── config/              # Configuration files
├── lib/                 # Business logic and utilities
├── providers.tsx        # Web3 providers setup
├── layout.tsx           # Root layout
├── page.tsx             # Main application page
└── globals.css          # Global styles
```

### **Component Architecture**

#### **Component Hierarchy**
```
App
├── Providers (Web3, Query)
├── Layout
│   ├── Header
│   ├── RestrictionBanner (conditional)
│   └── Main Content
│       └── CowSwapWidgetWrapper
│           └── CowSwapWidget
└── Toaster (notifications)
```

#### **Key Components**

**CowSwapWidgetWrapper**
- **Purpose**: Wrapper for CoW Swap widget integration
- **Responsibilities**: Provider setup, chain mapping, theme configuration
- **Props**: None (uses hooks internally)
- **State**: Wallet connection, chain ID, provider

**Providers**
- **Purpose**: Web3 and data fetching provider setup
- **Responsibilities**: Wagmi config, WalletConnect setup, Query client
- **Configuration**: Multi-chain support, wallet connectors, RPC endpoints

### **State Management**

#### **State Architecture**
- **Wallet State**: Managed by Wagmi hooks (useAccount, useChainId)
- **UI State**: Local component state with React hooks
- **Server State**: TanStack Query for data fetching
- **Configuration**: Static configuration files

#### **Data Flow**
```
User Action → Component → Wagmi Hook → Blockchain → Response → UI Update
```

### **Styling Architecture**

#### **Design System**
- **Tailwind CSS**: Utility-first CSS framework
- **Custom Theme**: Extended with Vaulto brand colors
- **Glassmorphism**: Modern blur effects and transparency
- **Responsive Design**: Mobile-first approach

#### **Theme Configuration**
```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#f59e0b', // amber-500
      secondary: '#1f2937', // gray-800
    },
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    }
  }
}
```

## Web3 Integration Architecture

### **Wagmi Configuration**

#### **Chain Configuration**
```typescript
const config = createConfig({
  chains: [mainnet, arbitrum, optimism, base, polygon, sepolia, arbitrumSepolia],
  connectors: [
    walletConnect({ projectId }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({ appName: "Vaulto Swap" })
  ],
  transports: {
    [mainnet.id]: http(rpcUrl),
    [arbitrum.id]: http(rpcUrl),
    // ... other chains
  }
});
```

#### **Wallet Integration**
- **WalletConnect v2**: Primary wallet connection protocol
- **Injected Wallets**: MetaMask and other browser wallets
- **Coinbase Wallet**: Native Coinbase wallet integration
- **Mobile Support**: QR code scanning for mobile wallets

### **Provider Architecture**

#### **Provider Stack**
```
WagmiProvider
├── QueryClientProvider
│   ├── App Components
│   └── TanStack Query Hooks
└── Web3Modal
    └── Wallet Connection UI
```

#### **Provider Configuration**
- **Multi-chain Support**: All major Ethereum-compatible chains
- **Session Persistence**: WalletConnect session management
- **Error Handling**: Comprehensive error boundaries
- **Analytics**: Optional usage analytics

## Smart Contract Architecture

### **Contract Structure**

#### **Core Contracts**
```
contracts/
├── SwapPool.sol          # AMM liquidity pool
├── PoolFactory.sol       # Pool deployment factory
└── interfaces/
    └── ISwapPool.sol     # Pool interface definition
```

#### **Contract Relationships**
```
PoolFactory
├── Creates → SwapPool instances
├── Manages → Pool registry
└── Deploys → Deterministic addresses (CREATE2)

SwapPool
├── Implements → ISwapPool interface
├── Uses → OpenZeppelin libraries
└── Manages → Liquidity and swaps
```

### **AMM Implementation**

#### **Constant Product Formula**
```solidity
// x * y = k (constant product)
amountOut = (amountIn * reserveOut) / (reserveIn + amountIn)
```

#### **Key Features**
- **Liquidity Provision**: Add/remove liquidity
- **Swap Functionality**: Token swaps with slippage protection
- **Fee Management**: Configurable swap fees (default 0.3%)
- **Reentrancy Protection**: OpenZeppelin ReentrancyGuard

### **Security Architecture**

#### **Security Measures**
- **OpenZeppelin Libraries**: Battle-tested security patterns
- **ReentrancyGuard**: Protection against reentrancy attacks
- **Ownable**: Access control for administrative functions
- **SafeERC20**: Safe token transfer operations

#### **Access Control**
- **Owner Functions**: Limited to contract owner
- **Public Functions**: Available to all users
- **Internal Functions**: Only callable by contract
- **View Functions**: Read-only operations

## Data Flow Architecture

### **Trading Flow**

#### **User Journey**
```
1. User connects wallet
2. User selects tokens and amount
3. CoW Swap widget fetches quote
4. User approves transaction
5. CoW Swap executes trade
6. Transaction confirmed on blockchain
7. UI updates with results
```

#### **Data Flow**
```
User Input → CoW Widget → CoW Protocol → Blockchain → Confirmation → UI Update
```

### **State Synchronization**

#### **Real-time Updates**
- **Wallet State**: Automatically synced via Wagmi
- **Chain State**: Updates on network changes
- **Transaction State**: Real-time transaction monitoring
- **Price Updates**: Automatic quote refreshing

#### **Caching Strategy**
- **TanStack Query**: Automatic caching and background updates
- **Wallet State**: Cached in Wagmi store
- **Configuration**: Static configuration caching
- **Token Data**: Cached token metadata

## Performance Architecture

### **Optimization Strategies**

#### **Frontend Optimization**
- **Next.js 14**: Latest performance optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Optimization**: Webpack optimizations

#### **Web3 Optimization**
- **Connection Pooling**: Efficient RPC connection management
- **Request Batching**: Batch multiple RPC calls
- **Caching**: Cache blockchain data appropriately
- **Error Handling**: Graceful degradation

### **Loading Strategy**

#### **Progressive Loading**
- **Critical Path**: Load essential components first
- **Lazy Loading**: Load non-critical components on demand
- **Skeleton Screens**: Show loading states
- **Error Boundaries**: Handle loading errors gracefully

## Scalability Architecture

### **Horizontal Scaling**

#### **Frontend Scaling**
- **CDN Distribution**: Global content delivery
- **Static Generation**: Pre-rendered pages
- **Edge Functions**: Serverless functions at edge
- **Caching**: Multi-level caching strategy

#### **Blockchain Scaling**
- **Multi-chain Support**: Distribute load across chains
- **L2 Integration**: Use Layer 2 solutions
- **Batch Operations**: Group multiple operations
- **Gas Optimization**: Minimize transaction costs

### **Vertical Scaling**

#### **Performance Monitoring**
- **Core Web Vitals**: Monitor user experience metrics
- **Transaction Metrics**: Track blockchain performance
- **Error Tracking**: Monitor and alert on errors
- **Usage Analytics**: Understand user behavior

## Security Architecture

### **Security Layers**

#### **Frontend Security**
- **HTTPS Only**: Secure communication
- **Content Security Policy**: Prevent XSS attacks
- **Input Validation**: Validate all user inputs
- **Error Handling**: Don't expose sensitive information

#### **Web3 Security**
- **MEV Protection**: CoW Swap integration
- **Wallet Security**: Never store private keys
- **Transaction Verification**: Always verify transactions
- **Network Validation**: Validate network connections

### **Compliance Architecture**

#### **Geographic Restrictions**
- **IP-based Detection**: Detect user location
- **Compliance Toggle**: User-controlled compliance mode
- **Restriction Banner**: Clear compliance messaging
- **Legal Compliance**: Follow regulatory requirements

## Deployment Architecture

### **Frontend Deployment**

#### **Vercel Deployment**
- **Automatic Deployments**: Git-based deployments
- **Environment Variables**: Secure configuration management
- **Edge Functions**: Serverless functions
- **Analytics**: Built-in performance monitoring

#### **Alternative Deployment**
- **Netlify**: Alternative hosting platform
- **Docker**: Containerized deployment
- **Self-hosted**: On-premise deployment options

### **Smart Contract Deployment**

#### **Multi-chain Deployment**
- **Hardhat**: Development and deployment framework
- **TypeChain**: TypeScript bindings generation
- **Verification**: Contract verification on block explorers
- **Testing**: Comprehensive test coverage

## Monitoring and Analytics

### **Performance Monitoring**

#### **Frontend Metrics**
- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: Monitor JavaScript bundle sizes
- **Load Times**: Track page load performance
- **Error Rates**: Monitor JavaScript errors

#### **Blockchain Metrics**
- **Transaction Success Rate**: Monitor transaction success
- **Gas Usage**: Track gas consumption
- **Network Performance**: Monitor network latency
- **Wallet Connection**: Track wallet connection success

### **User Analytics**

#### **Usage Tracking**
- **Feature Usage**: Track feature adoption
- **User Journeys**: Understand user behavior
- **Conversion Funnel**: Track user conversion
- **Performance Impact**: Measure performance impact

## Development Workflow

### **Development Environment**

#### **Local Development**
- **Next.js Dev Server**: Hot reloading development
- **Hardhat Network**: Local blockchain simulation
- **Environment Variables**: Local configuration
- **TypeScript**: Type checking and IntelliSense

#### **Testing Strategy**
- **Unit Tests**: Component and utility testing
- **Integration Tests**: Web3 integration testing
- **E2E Tests**: End-to-end user journey testing
- **Smart Contract Tests**: Comprehensive contract testing

### **CI/CD Pipeline**

#### **Automated Testing**
- **GitHub Actions**: Automated testing on PR
- **Type Checking**: TypeScript validation
- **Linting**: Code quality checks
- **Security Scanning**: Dependency vulnerability scanning

#### **Deployment Pipeline**
- **Automatic Deployment**: Deploy on main branch
- **Environment Promotion**: Promote between environments
- **Rollback Capability**: Quick rollback on issues
- **Monitoring**: Post-deployment monitoring

## Next Steps

Now that you understand the architecture:

1. **[Technology Stack](technology-stack.md)** - Detailed technology breakdown
2. **[Project Structure](project-structure.md)** - File organization and structure
3. **[Web3 Integration](web3-integration.md)** - Web3 integration details
4. **[CoW Swap Widget Integration](cow-swap-widget-integration.md)** - Widget integration guide

## Need Help?

If you have questions about the architecture:
- **[Contributing Guide](contributing/development-setup.md)** - Development setup
- **[API Reference](api-reference/components.md)** - Component documentation
- **[Support](resources/support.md)** - Get help from the community

---

**Understanding the architecture** helps you contribute effectively and make informed decisions about the codebase. The modular design allows for easy extension and maintenance while maintaining security and performance.
