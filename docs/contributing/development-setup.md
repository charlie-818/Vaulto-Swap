# Development Setup

This guide helps you set up a local development environment for Vaulto Swap.

## Prerequisites

### **Required Software**
- **Node.js**: 18.18.0 or later
- **npm**: 9.0.0 or later
- **Git**: Latest version
- **Code Editor**: VS Code recommended

### **Optional Tools**
- **MetaMask**: Browser wallet for testing
- **Hardhat**: Smart contract development
- **Docker**: Containerized development

## Quick Start

### **1. Clone Repository**
```bash
git clone https://github.com/vaulto-ai/vaulto-swap.git
cd vaulto-swap
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### **4. Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Detailed Setup

### **Environment Configuration**

#### **Required Variables**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
```

#### **Optional Variables**
```env
NEXT_PUBLIC_MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_ARBITRUM_RPC_URL=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_BASE_RPC_URL=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_POLYGON_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
```

### **WalletConnect Setup**

1. **Create Project**
   - Go to [cloud.walletconnect.com](https://cloud.walletconnect.com)
   - Sign up or log in
   - Create a new project
   - Copy your Project ID

2. **Add to Environment**
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
   ```

### **RPC Endpoints**

#### **Free Options**
- These will work for basic testing
- May have rate limits
- Use for development only

#### **Paid Options**
- **Alchemy**: [alchemy.com](https://alchemy.com)
- **Infura**: [infura.io](https://infura.io)
- **QuickNode**: [quicknode.com](https://quicknode.com)

## Smart Contract Development

### **Contract Setup**

1. **Navigate to Contracts**
   ```bash
   cd contracts
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Compile Contracts**
   ```bash
   npm run compile
   ```

4. **Run Tests**
   ```bash
   npm run test
   ```

### **Deployment**

#### **Testnet Deployment**
```bash
# Deploy to Sepolia
npm run deploy:sepolia

# Deploy to Arbitrum Sepolia
npm run deploy:arbitrum-sepolia
```

#### **Environment Variables**
Add to `.env.local`:
```env
DEPLOYER_PRIVATE_KEY=your_private_key_without_0x
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL=https://arb-sepolia.g.alchemy.com/v2/YOUR_KEY
```

## Development Workflow

### **Daily Development**

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in `app/`, `config/`, or `lib/`
   - Changes auto-reload in browser

3. **Test Changes**
   - Use browser dev tools
   - Test wallet connections
   - Verify functionality

### **Code Quality**

#### **Linting**
```bash
npm run lint
```

#### **Type Checking**
```bash
npx tsc --noEmit
```

#### **Formatting**
```bash
npx prettier --write .
```

### **Testing**

#### **Frontend Testing**
```bash
npm run test
```

#### **Contract Testing**
```bash
cd contracts
npm run test
```

## Project Structure

### **Frontend Structure**
```
app/
├── components/          # Reusable components
│   └── swap/           # Swap-specific components
├── config/             # Configuration files
├── lib/                # Business logic
├── providers.tsx       # Web3 providers
├── layout.tsx          # Root layout
└── page.tsx            # Main page
```

### **Smart Contract Structure**
```
contracts/
├── contracts/          # Solidity contracts
├── scripts/            # Deployment scripts
├── test/               # Test files
└── hardhat.config.ts   # Hardhat configuration
```

## Common Tasks

### **Adding New Tokens**

1. **Edit Token Configuration**
   ```typescript
   // config/tokens.ts
   {
     address: "0x...",
     symbol: "TOKEN",
     name: "Token Name",
     decimals: 18,
     isStablecoin: true,
   }
   ```

2. **Add to Supported Chains**
   ```typescript
   // config/chains.ts
   export const supportedChains = [/* ... */]
   ```

### **Adding New Networks**

1. **Add Chain Configuration**
   ```typescript
   // config/chains.ts
   {
     id: 12345,
     name: "New Network",
     nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
     rpcUrls: { default: { http: ["https://rpc.example.com"] } },
     blockExplorers: { default: { name: "Explorer", url: "https://explorer.example.com" } }
   }
   ```

2. **Update Wagmi Configuration**
   ```typescript
   // app/providers.tsx
   import { newNetwork } from "wagmi/chains";
   ```

### **Styling Changes**

1. **Global Styles**
   ```css
   /* app/globals.css */
   .custom-class {
     /* styles */
   }
   ```

2. **Component Styles**
   ```tsx
   // Use Tailwind classes
   <div className="bg-blue-500 text-white p-4">
     Content
   </div>
   ```

## Debugging

### **Common Issues**

#### **Build Errors**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

#### **Wallet Connection Issues**
- Check WalletConnect Project ID
- Verify network configuration
- Check browser console for errors

#### **Contract Issues**
```bash
# Clean and recompile
cd contracts
rm -rf cache artifacts
npm run compile
```

### **Debug Tools**

#### **Browser Dev Tools**
- **Console**: Check for JavaScript errors
- **Network**: Monitor API calls
- **Application**: Check localStorage/sessionStorage

#### **VS Code Extensions**
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **ESLint**: Code quality
- **Solidity**: Smart contract development

## Deployment

### **Frontend Deployment**

#### **Vercel**
1. **Connect Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure environment variables

2. **Environment Variables**
   ```env
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
   NEXT_PUBLIC_POOL_FACTORY_ADDRESS_SEPOLIA=0x...
   ```

#### **Netlify**
1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Import GitHub repository
   - Configure build settings

### **Contract Deployment**

#### **Mainnet Deployment**
```bash
# Deploy to mainnet
npm run deploy:mainnet
```

#### **Verification**
```bash
# Verify contracts
npx hardhat verify --network mainnet CONTRACT_ADDRESS
```

## Contributing

### **Pull Request Process**

1. **Fork Repository**
   ```bash
   git fork https://github.com/vaulto-ai/vaulto-swap.git
   ```

2. **Create Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow code style guidelines
   - Add tests if applicable
   - Update documentation

4. **Commit Changes**
   ```bash
   git commit -m "feat: add your feature"
   ```

5. **Push Changes**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Go to GitHub repository
   - Click "New Pull Request"
   - Fill out PR template

### **Code Style**

#### **TypeScript**
- Use strict mode
- Define interfaces for props
- Use type annotations
- Follow naming conventions

#### **React**
- Use functional components
- Use hooks for state management
- Follow component patterns
- Use proper prop types

#### **Solidity**
- Follow OpenZeppelin patterns
- Use NatSpec documentation
- Follow naming conventions
- Include proper error messages

## Next Steps

Now that you have the development environment set up:

1. **[Code Style Guide](code-style-guide.md)** - Coding standards and conventions
2. **[Pull Request Process](pull-request-process.md)** - How to contribute
3. **[Testing](testing.md)** - Testing strategies and tools
4. **[Architecture Overview](developer/architecture-overview.md)** - Understanding the codebase

---

**Ready to contribute?** Check out our [Code Style Guide](code-style-guide.md) and start building!
