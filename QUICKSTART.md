# Quick Start Guide

Get Vaulto Swap running in 5 minutes.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)

## Step 1: Get WalletConnect Project ID

1. Go to https://cloud.walletconnect.com
2. Sign up or log in
3. Create a new project
4. Copy your Project ID

## Step 2: Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your WalletConnect Project ID:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=paste_your_project_id_here
```

## Step 3: Install & Run

```bash
npm install
npm run dev
```

## Step 4: Test It Out

1. Open browser: http://localhost:3000
2. Connect wallet: Click "Connect Wallet" button
3. Switch network: Use Sepolia testnet for testing
4. Select tokens: Choose USDC and a tokenized stock
5. Enter amount: Type any amount
6. View quote: Price updates automatically

The interface is now running locally. 

## Troubleshooting

### Port 3000 already in use?
```bash
PORT=3001 npm run dev
```

### WalletConnect not working?
- Verify Project ID is correct in `.env.local`
- Ensure HTTPS is used in production
- Try different browser/wallet

### Cannot connect wallet?
- Install wallet extension
- Refresh the page
- Clear browser cache

### Build errors?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

## Support

- Review code comments
- Open an issue on GitHub
- Check documentation

---

*This is a demonstration project. Test thoroughly before production use.*

