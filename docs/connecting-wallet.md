# Connecting Your Wallet

Connecting your wallet is the first step to start trading Real World Assets (RWAs) on Vaulto. This guide covers wallet setup for both individual and institutional RWA trading.

## Supported Wallets

Vaulto supports 300+ wallets through WalletConnect v2 integration, optimized for RWA trading across EVM chains.

### MetaMask (Recommended)
- **Browser Extension**: Available for Chrome, Firefox, Edge, Brave
- **Mobile App**: iOS and Android
- **Hardware Support**: Ledger and Trezor integration for institutional security
- **Multi-Chain**: Native support for all EVM chains

### Coinbase Wallet
- **Mobile App**: iOS and Android
- **Browser Extension**: Chrome, Firefox, Edge
- **Coinbase Integration**: Easy transfers from Coinbase exchange for RWA purchases
- **Institutional Features**: Advanced security for large RWA positions

### Hardware Wallets (Institutional Recommended)
- **Ledger**: Hardware security for high-value RWA trading
- **Trezor**: Multi-signature support for institutional RWA management
- **Integration**: Works through MetaMask or other compatible interfaces

### Institutional Wallets
- **Gnosis Safe**: Multi-signature wallets for institutional RWA trading
- **Argent**: Social recovery with institutional features
- **Fireblocks**: Enterprise-grade wallet infrastructure

### Other Wallets
Any wallet that supports WalletConnect v2, including:
- **WalletConnect** (mobile app)
- **Trust Wallet** (mobile)
- **Rainbow** (mobile)
- **And 300+ more**

## Step-by-Step Connection Guide

### Method 1: MetaMask (Browser Extension)

1. **Install MetaMask**
   - Go to [metamask.io](https://metamask.io)
   - Click "Download" and install the extension
   - Create a new wallet or import existing one
   - **For RWA Trading**: Consider using a hardware wallet for enhanced security

2. **Connect to Vaulto**
   - Open [app.vaulto.ai](https://app.vaulto.ai)
   - Click "Connect Wallet" in the top right corner
   - Select "MetaMask" from the wallet options
   - MetaMask will open and ask for permission
   - Click "Connect" to approve the connection

3. **Verify Connection**
   - Your wallet address should appear in the top right
   - You should see your account balance
   - The interface should show connected state
   - Ensure you're on a supported EVM chain for RWA trading

### Method 2: WalletConnect (Mobile Wallets)

1. **Start Connection**
   - Click "Connect Wallet" on Vaulto
   - Select "WalletConnect" from the options
   - A QR code will appear

2. **Scan with Mobile Wallet**
   - Open your mobile wallet app (MetaMask, Trust Wallet, etc.)
   - Look for "Scan QR Code" or "WalletConnect" option
   - Scan the QR code from your computer screen

3. **Approve Connection**
   - Your mobile wallet will show a connection request
   - Review the connection details for RWA trading
   - Tap "Connect" or "Approve" to complete

4. **Start RWA Trading**
   - Your mobile wallet is now connected
   - You can trade RWAs directly from your phone
   - RWA transactions will prompt on your mobile device

### Method 3: Coinbase Wallet

1. **Install Coinbase Wallet**
   - Download from [coinbase.com/wallet](https://coinbase.com/wallet)
   - Set up your wallet or import existing

2. **Connect via Browser**
   - Click "Connect Wallet" on Vaulto Swap
   - Select "Coinbase Wallet"
   - Follow the prompts to connect

3. **Mobile Connection**
   - Use WalletConnect method (scan QR code)
   - Or use the Coinbase Wallet browser extension

## Network Configuration

After connecting your wallet, you need to ensure you're on a supported network:

### **Supported Networks**
- **Ethereum Mainnet** (Chain ID: 1)
- **Arbitrum One** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Base** (Chain ID: 8453)
- **Polygon** (Chain ID: 137)
- **Sepolia Testnet** (Chain ID: 11155111) - for testing
- **Arbitrum Sepolia** (Chain ID: 421614) - for testing

### **How to Switch Networks**

#### MetaMask:
1. Click the network dropdown at the top of MetaMask
2. Select your desired network
3. If the network isn't listed, click "Add Network" and enter details

#### Other Wallets:
Most wallets have similar network switching options. Look for:
- Network dropdown in wallet interface
- Settings > Networks
- Chain switcher in the wallet UI

### **Network Details for Manual Addition**

If you need to add a network manually:

**Arbitrum One:**
- Network Name: Arbitrum One
- RPC URL: `https://arb1.arbitrum.io/rpc`
- Chain ID: 42161
- Currency Symbol: ETH
- Block Explorer: `https://arbiscan.io`

**Optimism:**
- Network Name: Optimism
- RPC URL: `https://mainnet.optimism.io`
- Chain ID: 10
- Currency Symbol: ETH
- Block Explorer: `https://optimistic.etherscan.io`

**Base:**
- Network Name: Base
- RPC URL: `https://mainnet.base.org`
- Chain ID: 8453
- Currency Symbol: ETH
- Block Explorer: `https://basescan.org`

**Polygon:**
- Network Name: Polygon Mainnet
- RPC URL: `https://polygon-rpc.com`
- Chain ID: 137
- Currency Symbol: MATIC
- Block Explorer: `https://polygonscan.com`

## Troubleshooting Wallet Connection

### Common Issues and Solutions

#### "Connection Failed"
- Refresh the page and try again
- Clear browser cache and cookies
- Disable browser extensions temporarily
- Try a different browser

#### "Network Not Supported"
- Switch to a supported network in your wallet
- Add the network manually if it's not listed
- Check network details are correct

#### "Wallet Not Detected"
- Make sure wallet extension is installed and enabled
- Unlock your wallet before connecting
- Try refreshing the page after unlocking
- Check if wallet is set as default in browser

#### "Transaction Rejected"
- Check you have sufficient funds for the transaction
- Verify gas settings are appropriate
- Ensure you're on the correct network
- Try increasing gas limit if transactions fail

#### "Connection Lost"
- Reconnect your wallet by clicking "Connect Wallet" again
- Check wallet is still unlocked
- Refresh the page if connection seems stale
- Restart wallet extension if needed

### Mobile-Specific Issues

#### "QR Code Not Working"
- Ensure both devices are on the same network
- Try refreshing the QR code
- Check wallet app supports WalletConnect v2
- Try manual connection if available

#### "Connection Timeout"
- Check internet connection on both devices
- Try reconnecting after a few seconds
- Restart wallet app if connection fails repeatedly

#### "Wrong Network on Mobile"
- Switch network in mobile wallet app
- Disconnect and reconnect after switching
- Check network is supported on Vaulto Swap

## Security Best Practices for RWA Trading

### Wallet Security
- Never share your private keys or seed phrases
- Use hardware wallets for large RWA positions
- Enable biometric authentication on mobile wallets
- Keep wallet software updated for RWA compatibility
- Consider multi-signature wallets for institutional RWA trading

### RWA Trading Security
- Only connect to trusted sites like app.vaulto.ai
- Verify the URL before connecting for RWA trading
- Check connection permissions before approving
- Disconnect when done trading RWAs

### RWA Transaction Security
- Always verify RWA transaction details before signing
- Check RWA token addresses match expected tokens
- Review gas fees and approve only reasonable amounts for RWA trades
- Never sign RWA transactions you don't understand
- Verify RWA token symbols and amounts before execution

## Advanced Wallet Features

### Multiple Wallets
You can connect multiple wallets, but only one can be active at a time:
- Switch between wallets by disconnecting and reconnecting
- Each wallet maintains separate state
- Transaction history is wallet-specific

### Hardware Wallet Integration
Hardware wallets provide additional security:
- Connect through MetaMask or other compatible interfaces
- Transactions require physical confirmation
- Private keys never leave the hardware device

### Multisig Wallets
For institutional or high-value trading:
- Gnosis Safe support through WalletConnect
- Multiple signatures required for transactions
- Enhanced security for large amounts

## Next Steps

Now that your wallet is connected for RWA trading:

1. **[Supported Networks](supported-networks.md)** - Understand different blockchain networks for RWA trading
2. **[Quick Start Guide](quick-start-guide.md)** - Learn how to execute RWA swaps

## Need Help?

If you're still having trouble connecting your wallet for RWA trading:
- **[FAQ](faq.md)** - Common questions and answers about RWA trading

---

**Wallet connected successfully?** Great! Now let's learn about supported networks and start trading Real World Assets!
