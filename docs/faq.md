# Frequently Asked Questions

## General Questions

### What is Vaulto?
Vaulto is a permissionless DeFi protocol that enables seamless swapping of Real World Assets (RWAs) across EVM chains. Built on CoW Swap's MEV-protected batch auction engine, Vaulto provides access to tokenized securities, commodities, treasury instruments, and ETFs with optimal execution and settlement.

### What are RWAs and why trade them on-chain?
Real World Assets (RWAs) are tokenized representations of traditional financial instruments including:
- **Tokenized US Treasuries** (OUSG, USDY, OMMF) for yield optimization
- **Tokenized Securities** (stocks, ETFs) for 24/7 equity exposure
- **Tokenized Commodities** (gold, silver, oil) for portfolio diversification
- **Tokenized Real Estate** and other alternative assets

On-chain RWA trading offers:
- 24/7 trading without market hours restrictions
- Fractional ownership of high-value assets
- DeFi composability and yield optimization
- Global accessibility and transparency

### Is Vaulto safe to use?
Vaulto uses industry-standard security practices including:
- MEV protection through CoW Protocol's batch auctions
- WalletConnect v2 for secure wallet connections
- Fully on-chain settlement with no intermediaries
- Integration with established RWA protocols

### What networks does Vaulto support?
Vaulto operates exclusively on EVM-compatible chains:
- **Ethereum** - Highest RWA liquidity and institutional adoption
- **Arbitrum** - Optimal balance of low fees and RWA availability
- **Optimism** - Growing RWA ecosystem with competitive fees
- **Base** - Coinbase's L2 with expanding RWA support
- **Polygon** - Established DeFi ecosystem with RWA integration

### Do I need to create an account?
No account creation required! Vaulto is fully permissionless and decentralized. You only need to connect your Web3 wallet to start trading RWAs.

## RWA Trading Questions

### What RWA tokens can I trade?
**Tokenized US Treasuries:**
- OUSG (Ondo Short-Term US Government Bond Fund)
- USDY (Ondo USD Yield Token)
- OMMF (Ondo Money Market Fund)
- Other treasury tokens from various providers

**Tokenized Securities & Equities:**
- Major stocks (Apple, Tesla, Google, Amazon, Microsoft, and 60+ others)
- Sector ETFs (Technology, healthcare, energy, etc.)
- Index funds (S&P 500, NASDAQ, etc.)
- International equities

**Tokenized Commodities:**
- Precious metals (gold, silver, platinum tokens)
- Energy commodities (oil, natural gas tokens)
- Agricultural products (wheat, corn, soybean tokens)
- Industrial metals (copper, aluminum, steel tokens)

**Stablecoins & Crypto Assets:**
- USDC, USDT, DAI
- WBTC (Wrapped Bitcoin)
- WETH (Wrapped Ether)

### How do tokenized RWAs work?
Tokenized RWAs are blockchain representations of traditional financial instruments. Each token provides:
- 24/7 trading availability without market hours restrictions
- Fractional ownership of high-value assets
- Global accessibility and transparency
- DeFi composability for yield optimization
- On-chain settlement and custody

### What are the trading fees?
Vaulto uses CoW Protocol's fee structure:
- **No trading fees** from Vaulto itself
- **Network gas fees** for blockchain transactions
- **CoW Protocol fees** (typically very low, often subsidized)
- **Price impact** depends on trade size and RWA liquidity
- **Batch auction benefits** often result in better prices than traditional DEXs

### Can I trade RWAs on mobile?
Yes! Vaulto is fully responsive and mobile-optimized for RWA trading. Use WalletConnect to connect your mobile wallet and trade RWAs directly from your phone.

### How does CoW Swap integration work?
CoW Swap's batch auction mechanism works as follows:
1. **Intent Submission**: Users submit trading intents for RWA swaps
2. **Batch Aggregation**: CoW Protocol aggregates intents and finds optimal execution paths
3. **MEV Protection**: Batch auctions prevent front-running and sandwich attacks
4. **Optimal Execution**: Trades execute at the best available prices across multiple DEXs
5. **On-Chain Settlement**: All RWA trades settle directly on-chain

### What RWA providers are supported?
Vaulto supports RWAs from various providers including:
- **Ondo Finance** (OUSG, USDY, OMMF)
- **Backed Finance** (tokenized stocks and ETFs)
- **Other RWA providers** listed on rwa.xyz
- **Custom RWA tokens** that meet ERC-20 standards

## Wallet Questions

### Which wallets are supported for RWA trading?
Vaulto supports 300+ wallets through WalletConnect v2, including:
- **MetaMask** (browser extension and mobile)
- **Coinbase Wallet** (mobile app and browser extension)
- **Hardware Wallets** (Ledger, Trezor for institutional security)
- **Institutional Wallets** (Gnosis Safe, Argent, Fireblocks)
- **Any WalletConnect-compatible wallet**

### Why can't I connect my wallet for RWA trading?
Common issues and solutions:
- **Wrong network**: Make sure you're on a supported EVM chain
- **Wallet not unlocked**: Unlock your wallet first
- **Browser issues**: Try refreshing the page or using a different browser
- **WalletConnect issues**: Try disconnecting and reconnecting

### Can I use hardware wallets for RWA trading?
Yes! Hardware wallets like Ledger and Trezor are recommended for large RWA positions. They work through MetaMask or other compatible wallet interfaces and provide enhanced security for institutional RWA trading.

### Is my wallet safe for RWA trading?
Your private keys never leave your wallet. Vaulto only requests permission to read your address and send RWA transactions you approve. Always verify RWA transaction details before signing.

## Technical Questions

### Why does my RWA transaction fail?
Common reasons for failed RWA transactions:
- **Insufficient gas**: Increase gas limit in your wallet for RWA trades
- **Insufficient balance**: Make sure you have enough RWA tokens
- **Slippage too high**: Increase slippage tolerance or use smaller RWA trade
- **Network congestion**: Wait for better conditions or use L2 networks
- **RWA token not found**: Verify the RWA token is available on your current network

### How long do RWA transactions take?
RWA transaction times depend on the network and CoW Protocol batch timing:
- **Ethereum**: 30 seconds to 5 minutes (depending on gas price and batch timing)
- **Arbitrum**: 1-2 minutes (faster batch execution)
- **Optimism**: 1-2 minutes (optimized for batch auctions)
- **Base**: 1-2 minutes (growing RWA ecosystem)
- **Polygon**: 1-3 minutes (established RWA support)

### What is MEV protection for RWAs?
MEV (Maximal Extractable Value) protection prevents:
- **Front-running**: Others can't see and exploit your RWA trades
- **Sandwich attacks**: Protection from bots manipulating RWA prices
- **Optimal execution**: Always get the best available price for RWAs
- **Batch auction benefits**: RWA trades benefit from aggregated liquidity

### How is this different from centralized RWA platforms?
Vaulto offers several advantages over centralized RWA platforms:
- **Non-custodial**: You maintain full control of your RWAs
- **Permissionless**: No KYC or account requirements
- **24/7 Trading**: Trade RWAs around the clock
- **DeFi Composability**: Use RWAs in other DeFi protocols
- **Transparent**: All trades are on-chain and verifiable
- **MEV Protection**: Better execution through batch auctions

### Can I see my RWA transaction history?
Yes! Your RWA transaction history is available in:
- The CoW Swap widget's order history
- Your wallet's transaction history
- Block explorers (Etherscan, Arbiscan, etc.)
- RWA-specific tracking tools

## Legal Questions

### Am I eligible to trade RWAs?
RWA trading eligibility depends on your jurisdiction and local regulations. You should:
- Consult with a financial advisor familiar with tokenized assets
- Review local securities and financial regulations
- Ensure you understand the risks of RWA trading
- Only trade if legally permitted in your location
- Verify compliance with any applicable restrictions

### What are the risks of RWA trading?
RWA trading involves several risks:
- **Market risk**: RWA prices can fluctuate based on underlying asset performance
- **Smart contract risk**: RWA protocols may have technical vulnerabilities
- **Regulatory risk**: Regulations governing RWAs may change
- **Technical risk**: Blockchain transactions can fail or be delayed
- **Liquidity risk**: Large RWA trades may have significant price impact
- **Custody risk**: Understanding the custody structure of underlying assets

### Are RWAs insured?
RWA insurance coverage varies by provider and asset type. Some RWAs may have insurance coverage through the issuer or custodian, but this is not universal. Always check the specific terms and conditions of the RWA you're trading and understand the custody and insurance arrangements.

## Troubleshooting

### The page won't load
Try these solutions:
- Clear your browser cache
- Disable browser extensions temporarily
- Try a different browser
- Check your internet connection

### RWA prices seem wrong
RWA price discrepancies can occur due to:
- Network delays in RWA price updates
- Different RWA liquidity sources
- RWA market volatility
- Always verify RWA prices on multiple sources

### I can't see my RWA tokens
If you don't see your RWA tokens after a trade:
- Check the transaction on a block explorer
- Make sure you're on the correct network
- Refresh your wallet
- Check if the RWA token needs to be manually added to your wallet
- Verify the RWA token is supported on your current network

### The RWA swap button is disabled
The RWA swap button may be disabled if:
- You haven't connected your wallet
- You haven't selected RWA tokens
- You haven't entered an amount
- You don't have sufficient RWA token balance
- The RWA trade would exceed slippage tolerance
- The RWA token is not available on your current network

## Getting Help

### Where can I get support for RWA trading?
- **GitHub Issues**: Report bugs and technical issues with RWA trading
- **Documentation**: Check our comprehensive RWA trading docs
- **FAQ**: Review this FAQ for common RWA trading questions

### How do I report a bug with RWA trading?
When reporting RWA trading bugs, please include:
- Your browser and version
- Your wallet type and version
- The network you were using for RWA trading
- The specific RWA tokens involved
- Steps to reproduce the RWA trading issue
- Screenshots or error messages

### Can I suggest new RWA features?
Yes! We welcome RWA feature suggestions. Please:
- Check existing issues first
- Provide clear descriptions of RWA trading needs
- Explain the RWA use case
- Consider implementation complexity for RWA integration

---

**Still have questions about RWA trading?** Check out our documentation or open an issue on GitHub.