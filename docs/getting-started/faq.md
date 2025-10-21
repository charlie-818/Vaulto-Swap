# Frequently Asked Questions

## General Questions

### What is Vaulto Swap?
Vaulto Swap is a decentralized exchange interface that allows you to trade tokenized stocks (like Apple, Tesla, Google) with stablecoins (USDC, USDT, DAI) across multiple blockchain networks. It's built with Next.js and powered by CoW Swap for MEV protection.

### Is Vaulto Swap safe to use?
Vaulto Swap uses industry-standard security practices including:
- MEV protection through CoW Swap
- WalletConnect v2 for secure wallet connections
- Smart contract integration with established protocols

**Important**: This is a demonstration project. Smart contracts are unaudited. Always do your own research and never invest more than you can afford to lose.

### What networks does Vaulto Swap support?
Vaulto Swap supports:
- **Ethereum** - Mainnet with highest liquidity
- **Arbitrum** - Fast L2 with low fees
- **Optimism** - Optimistic rollup
- **Base** - Coinbase's L2 solution
- **Polygon** - Ethereum scaling solution
- **Sepolia** - Ethereum testnet (for testing)
- **Arbitrum Sepolia** - Arbitrum testnet (for testing)

### Do I need to create an account?
No account creation required! Vaulto Swap is fully decentralized. You only need to connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.) to start trading.

## Trading Questions

### What tokens can I trade?
**Stablecoins:**
- USDC (USD Coin)
- USDT (Tether USD)
- DAI (Dai Stablecoin)

**Tokenized Stocks:**
- bAAPL (Apple Inc.)
- bTSLA (Tesla Inc.)
- bGOOGL (Alphabet Inc.)
- bAMZN (Amazon.com Inc.)
- bMSFT (Microsoft Corporation)

**Other Assets:**
- WBTC (Wrapped Bitcoin)
- WETH (Wrapped Ether)

### How do tokenized stocks work?
Tokenized stocks are blockchain representations of traditional securities. Each token is backed by real stock shares held by the issuer (like Backed Finance). They provide:
- 24/7 trading availability
- Fractional ownership
- Global accessibility
- Transparent ownership records

### What are the trading fees?
Vaulto Swap uses CoW Swap's fee structure:
- **No trading fees** from Vaulto Swap itself
- **Network gas fees** for blockchain transactions
- **CoW Protocol fees** (typically very low)
- **Price impact** depends on trade size and liquidity

### Can I trade on mobile?
Yes! Vaulto Swap is fully responsive and mobile-optimized. Use WalletConnect to connect your mobile wallet and trade directly from your phone.

## Wallet Questions

### Which wallets are supported?
Vaulto Swap supports 300+ wallets through WalletConnect v2, including:
- **MetaMask** (browser extension and mobile)
- **Coinbase Wallet** (mobile app and browser extension)
- **Trust Wallet** (mobile)
- **Rainbow** (mobile)
- **Any WalletConnect-compatible wallet**

### Why can't I connect my wallet?
Common issues and solutions:
- **Wrong network**: Make sure you're on a supported network
- **Wallet not unlocked**: Unlock your wallet first
- **Browser issues**: Try refreshing the page or using a different browser
- **WalletConnect issues**: Try disconnecting and reconnecting

### Can I use hardware wallets?
Yes! Hardware wallets like Ledger and Trezor work through MetaMask or other compatible wallet interfaces.

### Is my wallet safe?
Your private keys never leave your wallet. Vaulto Swap only requests permission to read your address and send transactions you approve. Always verify transactions before signing.

## Technical Questions

### Why does my transaction fail?
Common reasons for failed transactions:
- **Insufficient gas**: Increase gas limit in your wallet
- **Insufficient balance**: Make sure you have enough tokens
- **Slippage too high**: Increase slippage tolerance or use smaller trade
- **Network congestion**: Wait for better conditions or use L2 networks

### How long do transactions take?
Transaction times depend on the network:
- **Ethereum**: 30 seconds to 5 minutes (depending on gas price)
- **Arbitrum**: 1-2 minutes
- **Optimism**: 1-2 minutes
- **Base**: 1-2 minutes
- **Polygon**: 1-3 minutes

### What is MEV protection?
MEV (Maximal Extractable Value) protection prevents:
- **Front-running**: Others can't see and exploit your trades
- **Sandwich attacks**: Protection from bots manipulating prices
- **Optimal execution**: Always get the best available price

### Can I see my transaction history?
Yes! Your transaction history is available in:
- The CoW Swap widget's order history
- Your wallet's transaction history
- Block explorers (Etherscan, Arbiscan, etc.)

## Legal Questions

### Am I eligible to trade tokenized stocks?
Eligibility depends on your jurisdiction and local regulations. You should:
- Consult with a financial advisor
- Review local securities regulations
- Ensure you understand the risks
- Only trade if legally permitted in your location

### What are the risks?
Trading tokenized stocks involves several risks:
- **Market risk**: Stock prices can go down
- **Smart contract risk**: Unaudited contracts may have bugs
- **Regulatory risk**: Regulations may change
- **Technical risk**: Blockchain transactions can fail
- **Liquidity risk**: Large trades may have significant price impact

### Are tokenized stocks insured?
Tokenized stocks may have some insurance coverage through the issuer, but this varies by provider. Always check the specific terms and conditions of the tokenized stock you're trading.

## Troubleshooting

### The page won't load
Try these solutions:
- Clear your browser cache
- Disable browser extensions temporarily
- Try a different browser
- Check your internet connection

### Prices seem wrong
Price discrepancies can occur due to:
- Network delays in price updates
- Different liquidity sources
- Market volatility
- Always verify prices on multiple sources

### I can't see my tokens
If you don't see your tokens after a trade:
- Check the transaction on a block explorer
- Make sure you're on the correct network
- Refresh your wallet
- Check if the token needs to be manually added to your wallet

### The swap button is disabled
The swap button may be disabled if:
- You haven't connected your wallet
- You haven't selected tokens
- You haven't entered an amount
- You don't have sufficient balance
- The trade would exceed slippage tolerance

## Getting Help

### Where can I get support?
- **GitHub Issues**: Report bugs and technical issues
- **Documentation**: Check our comprehensive docs
- **FAQ**: Review this FAQ for common questions

### How do I report a bug?
When reporting bugs, please include:
- Your browser and version
- Your wallet type and version
- The network you were using
- Steps to reproduce the issue
- Screenshots or error messages

### Can I suggest new features?
Yes! We welcome feature suggestions. Please:
- Check existing issues first
- Provide clear descriptions
- Explain the use case
- Consider implementation complexity

---

**Still have questions?** Check out our documentation or open an issue on GitHub.
