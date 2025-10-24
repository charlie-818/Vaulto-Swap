# Supported Networks

Vaulto operates exclusively on EVM-compatible chains, providing access to Real World Assets (RWAs) across multiple networks. Each network offers different RWA liquidity, fees, and trading characteristics.

## EVM-Only Architecture

Vaulto's EVM-only approach ensures:
- **Consistent User Experience**: Same interface across all supported chains
- **CoW Protocol Integration**: Full compatibility with CoW Swap's batch auction mechanism
- **Cross-Chain Liquidity**: Access to RWA liquidity aggregated across EVM chains
- **Unified Token Standards**: ERC-20 compatibility for all RWAs

## Supported Networks

### Mainnet Networks
- **Ethereum** - Highest RWA liquidity and institutional adoption
- **Arbitrum** - Optimal balance of low fees and RWA availability
- **Optimism** - Growing RWA ecosystem with competitive fees
- **Base** - Coinbase's L2 with expanding RWA support
- **Polygon** - Established DeFi ecosystem with RWA integration

## Network Comparison

| Network | Type | Speed | Fees | RWA Liquidity | Best For |
|---------|------|-------|------|---------------|----------|
| **Ethereum** | L1 | Moderate | High | Highest | Large RWA trades, institutional use |
| **Arbitrum** | L2 | Fast | Low | High | Optimal RWA trading experience |
| **Optimism** | L2 | Fast | Low | Medium | Cost-effective RWA access |
| **Base** | L2 | Fast | Very Low | Growing | New RWA protocols, low fees |
| **Polygon** | L1 | Fast | Very Low | Medium | DeFi integration, micro-trades |

## Detailed Network Information

### Ethereum Mainnet

**Characteristics**
- Chain ID: 1
- Currency: ETH
- Block Time: ~12 seconds
- Finality: ~13 minutes

**RWA Advantages**
- **Highest RWA Liquidity**: All major RWA providers deploy on Ethereum first
- **Institutional Adoption**: Preferred by large RWA issuers and institutional traders
- **Maximum Security**: Most decentralized and secure network for high-value RWAs
- **Full Protocol Support**: Complete CoW Protocol integration with all features

**RWA Disadvantages**
- **High Fees**: Gas costs can be $10-100+ per transaction
- **Slower Execution**: Transactions can take several minutes during congestion
- **Cost Sensitivity**: May not be economical for smaller RWA trades

**Best For RWA Trading**
- Large RWA trades where fees are less important
- Institutional RWA trading and treasury management
- Access to newest RWA protocols and tokens
- Maximum security for high-value RWA positions

### Arbitrum One

**Characteristics**
- Chain ID: 42161
- Currency: ETH
- Block Time: ~0.25 seconds
- Finality: ~1 second

**RWA Advantages**
- **Low Fees**: Typically $0.10-1.00 per transaction
- **Fast Execution**: Near-instant RWA trade confirmation
- **High RWA Liquidity**: Good liquidity for major RWA tokens
- **Ethereum Compatibility**: Full EVM compatibility with RWA standards
- **CoW Protocol Support**: Complete batch auction functionality

**RWA Disadvantages**
- **Centralized Sequencer**: Single sequencer (being decentralized)
- **Limited RWA Protocols**: Fewer RWA providers than Ethereum
- **Withdrawal Delays**: 7-day withdrawal period to Ethereum

**Best For RWA Trading**
- Regular RWA trading with optimal fee structure
- Best overall balance of features for RWA access
- DeFi activities with RWA protocol support
- Most users (recommended for RWA trading)

### Optimism

**Characteristics**
- Chain ID: 10
- Currency: ETH
- Block Time: ~2 seconds
- Finality: ~2 seconds

**RWA Advantages**
- **Very Low Fees**: Typically $0.05-0.50 per transaction
- **Fast Execution**: Quick RWA trade confirmation
- **Ethereum Security**: Inherits Ethereum's security for RWAs
- **Growing RWA Support**: Expanding RWA ecosystem

**RWA Disadvantages**
- **Limited RWA Liquidity**: Lower liquidity than Ethereum/Arbitrum
- **Centralized Sequencer**: Single sequencer (being decentralized)
- **Withdrawal Delays**: 7-day withdrawal period

**Best For RWA Trading**
- Cost-conscious RWA trading
- Users prioritizing low fees for RWAs
- DeFi activities with supported RWA protocols
- Regular RWA trading activities

### Base

**Characteristics**
- Chain ID: 8453
- Currency: ETH
- Block Time: ~2 seconds
- Finality: ~2 seconds

**RWA Advantages**
- **Very Low Fees**: Typically $0.01-0.10 per transaction
- **Coinbase Integration**: Easy access through Coinbase for RWA trading
- **Growing RWA Ecosystem**: Rapidly expanding RWA support
- **Simple Onboarding**: Easy fiat on-ramp for RWA purchases

**RWA Disadvantages**
- **New Network**: Less established RWA ecosystem
- **Limited RWA Liquidity**: Lower liquidity for some RWA tokens
- **Centralized**: More centralized than other networks

**Best For RWA Trading**
- New users getting started with RWAs
- Users with Coinbase accounts
- Cost-sensitive RWA trading
- Experimenting with new RWA protocols

### Polygon

**Characteristics**
- Chain ID: 137
- Currency: MATIC
- Block Time: ~2 seconds
- Finality: ~2 seconds

**RWA Advantages**
- **Very Low Fees**: Typically $0.001-0.01 per transaction
- **Fast Execution**: Quick RWA trade confirmation
- **Mature DeFi Ecosystem**: Well-established DeFi protocols with RWA integration
- **Good RWA Liquidity**: Decent liquidity for major RWA tokens

**RWA Disadvantages**
- **Separate Network**: Not Ethereum L2, requires bridging for RWAs
- **Different Token**: Uses MATIC instead of ETH for gas
- **Centralization Concerns**: More centralized than Ethereum

**Best For RWA Trading**
- Very cost-sensitive RWA trading
- Users already active on Polygon
- Micro RWA transactions
- DeFi activities with RWA integration on Polygon

## Choosing the Right Network for RWA Trading

### For RWA Beginners
**Recommended: Arbitrum**
- Low fees for learning RWA trading
- Good RWA liquidity and availability
- Fast RWA trade execution
- Easy to use with comprehensive RWA support

### For Large RWA Trades
**Recommended: Ethereum**
- Maximum RWA liquidity across all providers
- Best price execution for large RWA positions
- Highest security for high-value RWAs
- Most RWA protocol support and features

### For Cost-Conscious RWA Trading
**Recommended: Base or Optimism**
- Very low fees for frequent RWA trading
- Good RWA performance and execution
- Growing RWA ecosystem
- Easy onboarding for RWA access

### For RWA DeFi Integration
**Recommended: Ethereum or Arbitrum**
- Most RWA DeFi protocols and integrations
- Best RWA liquidity for complex strategies
- Established RWA ecosystem
- Maximum RWA composability

### For RWA Portfolio Management
**Recommended: Arbitrum**
- Optimal balance of fees and RWA liquidity
- Fast execution for portfolio rebalancing
- Good RWA protocol support
- Cost-effective for regular RWA trading

## Network Switching

### How to Switch Networks

#### MetaMask
1. Click network dropdown in MetaMask
2. Select desired network
3. Add network if not listed
4. Confirm network switch

#### WalletConnect Wallets
1. Switch network in your mobile wallet
2. Refresh Vaulto Swap page
3. Confirm network change
4. Verify connection

#### Other Wallets
Most wallets have similar network switching:
- Look for network selector
- Add custom networks if needed
- Verify RPC endpoints

## RWA Availability by Network

### Ethereum
- All RWA tokens available
- Highest RWA liquidity
- Most RWA trading pairs
- Full institutional RWA support

### Arbitrum
- Major RWA tokens available
- Good RWA liquidity
- Growing RWA token support
- Optimal RWA trading experience

### Optimism
- Core RWA tokens available
- Moderate RWA liquidity
- Expanding RWA support
- Cost-effective RWA access

### Base
- Limited RWA tokens
- Growing RWA support
- Coinbase RWA integration
- Emerging RWA ecosystem

### Polygon
- Many RWA tokens available
- Good RWA DeFi support
- Established RWA ecosystem
- Alternative RWA trading venue

## RWA Trading Fee Optimization

### Understanding Gas Fees for RWAs
- **Gas Price**: Cost per unit of computation for RWA trades
- **Gas Limit**: Maximum gas units for RWA transaction
- **Total Cost**: Gas Price × Gas Limit for RWA execution

### RWA Trading Optimization Strategies
- **Use L2 networks** for lower RWA trading fees
- **Trade during off-peak hours** for lower gas prices on RWA trades
- **Batch RWA transactions** when possible through CoW Protocol
- **Monitor gas prices** before executing large RWA trades
- **Consider RWA trade size** relative to gas costs

## Troubleshooting Network Issues

### Common Issues

#### "Network Not Supported"
- Verify network is supported by Vaulto Swap
- Check chain ID is correct
- Add network manually if needed

#### "Transaction Failed"
- Check network congestion
- Increase gas limit
- Verify sufficient balance for fees

#### "Wrong Network"
- Switch to correct network in wallet
- Refresh Vaulto Swap page
- Reconnect wallet if needed

#### "Slow Transactions"
- Check network congestion
- Consider switching to L2 network
- Wait for better network conditions

## Next Steps

Now that you understand the supported networks for RWA trading:

1. **[Connecting Your Wallet](connecting-wallet.md)** - Connect your wallet for RWA trading
2. **[Quick Start Guide](quick-start-guide.md)** - Execute your first RWA trade

## Need Help?

If you're having network issues with RWA trading:
- **[FAQ](faq.md)** - Common questions and answers about RWA trading

---

**Ready to choose your network for RWA trading?** For most users, we recommend starting with **Arbitrum** for the best balance of low fees, fast transactions, and good RWA liquidity. Check out our guide on [Connecting Your Wallet](connecting-wallet.md) to get started with RWA trading!