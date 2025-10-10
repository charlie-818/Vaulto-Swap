# Deployment Guide 🚀

This guide walks you through deploying the Vaulto Swap smart contracts and frontend.

## Prerequisites

- Testnet ETH on Sepolia and/or Arbitrum Sepolia
- [Alchemy](https://alchemy.com) or [Infura](https://infura.io) account for RPC endpoints
- [WalletConnect](https://cloud.walletconnect.com) Project ID
- [Etherscan](https://etherscan.io/apis) API key (for contract verification)

## Step 1: Get Testnet Funds

### Sepolia ETH
Get free testnet ETH from faucets:
- https://sepoliafaucet.com/
- https://www.alchemy.com/faucets/ethereum-sepolia
- https://faucet.quicknode.com/ethereum/sepolia

### Arbitrum Sepolia ETH
Bridge from Sepolia or use faucets:
- https://bridge.arbitrum.io/ (bridge from Sepolia)
- https://faucet.quicknode.com/arbitrum/sepolia

## Step 2: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in the required values:

```env
# WalletConnect Project ID (required)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=93f5a1b0a919af4b4e02dbcbe56479fd

# RPC URLs (get from Alchemy/Infura)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_ARBITRUM_SEPOLIA_RPC_URL=https://arb-sepolia.g.alchemy.com/v2/YOUR_KEY

# For deployment only (NEVER commit this!)
DEPLOYER_PRIVATE_KEY=your_private_key_without_0x

# For contract verification (optional)
ETHERSCAN_API_KEY=your_etherscan_api_key
ARBISCAN_API_KEY=your_arbiscan_api_key
```

⚠️ **Security Warning**: Never commit your `.env.local` file or share your private key!

## Step 3: Deploy Smart Contracts

### Deploy to Sepolia

```bash
cd contracts
npm run deploy:sepolia
```

You should see output like:
```
🚀 Deploying Vaulto Swap contracts...

Deploying with account: 0x1234...
Account balance: 0.5 ETH

📦 Deploying PoolFactory...
✅ PoolFactory deployed to: 0xAbC123...

📋 Deployment Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Network: sepolia
Chain ID: 11155111
PoolFactory: 0xAbC123...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Deploy to Arbitrum Sepolia

```bash
npm run deploy:arbitrum-sepolia
```

### Update Frontend Configuration

Add the deployed contract addresses to your `.env.local`:

```env
NEXT_PUBLIC_POOL_FACTORY_ADDRESS_SEPOLIA=0xAbC123...
NEXT_PUBLIC_POOL_FACTORY_ADDRESS_ARBITRUM_SEPOLIA=0xDeF456...
```

## Step 4: Verify Contracts (Optional)

Verify your contracts on block explorers for transparency:

```bash
npx hardhat verify --network sepolia POOL_FACTORY_ADDRESS
```

## Step 5: Create Test Liquidity Pools

After deployment, you can create liquidity pools for testing:

1. Get test stablecoin addresses from the testnet (or deploy mock ERC20s)
2. Use the PoolFactory contract to create pools
3. Add initial liquidity to enable swaps

Example using Hardhat console:

```bash
npx hardhat console --network sepolia
```

```javascript
const factory = await ethers.getContractAt("PoolFactory", "YOUR_FACTORY_ADDRESS");
const tx = await factory.createPool(USDC_ADDRESS, TOKENIZED_STOCK_ADDRESS);
await tx.wait();
const poolAddress = await factory.getPool(USDC_ADDRESS, TOKENIZED_STOCK_ADDRESS);
console.log("Pool created at:", poolAddress);
```

## Step 6: Deploy Frontend

### Option A: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_POOL_FACTORY_ADDRESS_SEPOLIA`
   - `NEXT_PUBLIC_POOL_FACTORY_ADDRESS_ARBITRUM_SEPOLIA`
   - Optional: RPC URLs
4. Deploy!

### Option B: Self-Host

Build the production bundle:

```bash
npm run build
npm run start
```

Or use Docker:

```bash
docker build -t vaulto-swap .
docker run -p 3000:3000 vaulto-swap
```

## Step 7: Testing

1. Open your deployed frontend
2. Connect your wallet (switch to Sepolia testnet)
3. Select tokens and try a swap
4. Monitor transactions on [Sepolia Etherscan](https://sepolia.etherscan.io)

## Mainnet Deployment (Production)

⚠️ **Before deploying to mainnet:**

1. **Security Audit**: Get contracts professionally audited
2. **Testing**: Thoroughly test on testnets for weeks
3. **Insurance**: Consider DeFi insurance protocols
4. **Legal**: Consult with legal team regarding regulations
5. **Liquidity**: Plan for initial liquidity provision
6. **Monitoring**: Set up alerts for unusual activity

### Mainnet Steps (only after above checks)

1. Get mainnet RPC URLs
2. Fund deployer address with real ETH
3. Update `.env.local` with mainnet RPC URLs
4. Deploy contracts to mainnet
5. Verify contracts on Etherscan
6. Update frontend configuration
7. Deploy frontend with mainnet addresses

## Troubleshooting

### "Insufficient funds for gas"
- Ensure your deployer account has enough testnet ETH
- Check gas prices aren't too high

### "Network not found"
- Verify RPC URLs are correct in `.env.local`
- Check RPC provider (Alchemy/Infura) has correct API key

### "Nonce too high"
- Reset your wallet's transaction history in MetaMask
- Or wait for pending transactions to confirm

### Contracts won't compile
```bash
cd contracts
rm -rf cache artifacts
npm run compile
```

### Frontend build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [WalletConnect Documentation](https://docs.walletconnect.com)
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts)

## Support

If you encounter issues:
1. Check this guide thoroughly
2. Review error messages carefully
3. Search existing GitHub issues
4. Open a new issue with detailed information

---

**Happy deploying! 🎉**

