# ⚡ Quick Start Guide

Get Vaulto Swap running in 5 minutes!

## Prerequisites

- Node.js 18 or later
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

## Step 1: Get WalletConnect Project ID (2 minutes)

1. Go to https://cloud.walletconnect.com
2. Sign up or log in
3. Create a new project
4. Copy your **Project ID**

## Step 2: Configure Environment (1 minute)

```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` and paste your WalletConnect Project ID:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=paste_your_project_id_here
```

That's it for basic setup! RPC URLs are optional (will use public RPCs).

## Step 3: Install & Run (2 minutes)

```bash
# Install dependencies (already done if you see this!)
npm install

# Start development server
npm run dev
```

## Step 4: Test It Out!

1. **Open browser**: http://localhost:3000
2. **Connect wallet**: Click "Connect Wallet" button
3. **Switch network**: Use Sepolia testnet for testing
4. **Enable regulated assets**: Toggle the compliance switch
5. **Select tokens**: Choose USDC and a tokenized stock (e.g., bAAPL)
6. **Enter amount**: Type any amount (actual swap requires testnet funds)
7. **View quote**: Price updates automatically

## 🎉 You're Done!

The interface is now running locally. 

## Next Steps

### Option A: Just Explore
- Play with the UI
- Connect different wallets
- Switch between networks
- See how price quotes work

### Option B: Test on Testnets
1. Get testnet ETH from faucets:
   - Sepolia: https://sepoliafaucet.com
   - Arbitrum Sepolia: https://bridge.arbitrum.io

2. Deploy contracts:
   ```bash
   cd contracts
   npm install
   npm run deploy:sepolia
   ```

3. Update `.env.local` with deployed contract addresses

### Option C: Deep Dive
Read the full documentation:
- **README.md** - Complete overview
- **DEPLOYMENT.md** - Deployment guide
- **PROJECT_STRUCTURE.md** - Architecture details
- **SETUP_COMPLETE.md** - Feature list

## Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
PORT=3001 npm run dev
```

### WalletConnect not working?
- Make sure Project ID is correct in `.env.local`
- Check you're using HTTPS in production
- Try a different browser/wallet

### Cannot connect wallet?
- Make sure your wallet extension is installed
- Refresh the page
- Clear browser cache

### Build errors?
```bash
# Clean install
rm -rf node_modules .next
npm install
npm run dev
```

## Development Tips

- **Hot reload**: Edit any file and see changes instantly
- **Network switching**: Use your wallet to switch chains
- **Console**: Open browser DevTools to see logs
- **Mobile**: Test on mobile by accessing your local IP (e.g., http://192.168.1.100:3000)

## Common Tasks

### Add a new token
Edit `config/tokens.ts` and add to the appropriate chain array.

### Change theme colors
Edit `app/globals.css` and `tailwind.config.ts`.

### Modify swap fee
Edit `contracts/contracts/SwapPool.sol` line with `swapFee = 30`.

### Add a new chain
1. Add chain to `config/chains.ts`
2. Add tokens for that chain in `config/tokens.ts`
3. Add RPC URL to `.env.local`
4. Add chain to `app/providers.tsx`

## Support

- Check the docs in this repo
- Review code comments
- Open an issue on GitHub

## What's Next?

Once comfortable with the interface:
1. Deploy contracts to testnet
2. Add real liquidity
3. Test actual swaps
4. Consider security audit for production
5. Deploy to mainnet (with caution!)

---

**Happy building! 🚀**

*Remember: This is a demo. Always test thoroughly and get audits before production use.*

