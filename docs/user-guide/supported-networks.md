# Supported Networks

Vaulto Swap supports multiple blockchain networks, each with different characteristics, fees, and features. This guide helps you choose the best network for your trading needs.

## Overview of Supported Networks

### **Mainnet Networks**
- **Ethereum** - The original smart contract platform
- **Arbitrum** - Fast and cheap Ethereum L2
- **Optimism** - Optimistic rollup for Ethereum
- **Base** - Coinbase's L2 solution
- **Polygon** - Ethereum scaling solution

### **Testnet Networks**
- **Sepolia** - Ethereum testnet for testing
- **Arbitrum Sepolia** - Arbitrum testnet for testing

## Network Comparison

| Network | Type | Speed | Fees | Liquidity | Use Case |
|---------|------|-------|------|-----------|----------|
| **Ethereum** | L1 | Slow | High | Highest | Large trades, maximum security |
| **Arbitrum** | L2 | Fast | Low | High | Best balance of features |
| **Optimism** | L2 | Fast | Low | High | Low fees, good liquidity |
| **Base** | L2 | Fast | Very Low | Medium | Coinbase integration |
| **Polygon** | L1 | Fast | Very Low | Medium | Alternative L1 |
| **Sepolia** | Testnet | Fast | Free | Test | Testing only |
| **Arbitrum Sepolia** | Testnet | Fast | Free | Test | Testing only |

## Detailed Network Information

### **Ethereum Mainnet**

#### **Characteristics**
- **Chain ID**: 1
- **Currency**: ETH
- **Block Time**: ~12 seconds
- **Finality**: ~13 minutes
- **Gas Model**: Gas price bidding

#### **Advantages**
- **Highest Security**: Most decentralized and secure network
- **Maximum Liquidity**: Best liquidity for all tokens
- **Native Support**: All tokens and protocols available
- **Ethereum Ecosystem**: Access to entire DeFi ecosystem

#### **Disadvantages**
- **High Fees**: Gas costs can be $10-100+ per transaction
- **Slow Speed**: Transactions can take several minutes
- **Congestion**: High usage can cause delays and higher fees

#### **Best For**
- Large trades where fees are less important
- Maximum security requirements
- Access to newest DeFi protocols
- Institutional trading

#### **RPC Endpoints**
- **Alchemy**: `https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Infura**: `https://mainnet.infura.io/v3/YOUR_KEY`
- **Public**: `https://eth.llamarpc.com`

### **Arbitrum One**

#### **Characteristics**
- **Chain ID**: 42161
- **Currency**: ETH
- **Block Time**: ~0.25 seconds
- **Finality**: ~1 second
- **Gas Model**: Fixed gas price

#### **Advantages**
- **Low Fees**: Typically $0.10-1.00 per transaction
- **Fast Transactions**: Near-instant confirmation
- **High Liquidity**: Good liquidity for major tokens
- **Ethereum Compatibility**: Full EVM compatibility

#### **Disadvantages**
- **Centralized Sequencer**: Single sequencer (being decentralized)
- **Limited DeFi**: Fewer protocols than Ethereum
- **Withdrawal Delays**: 7-day withdrawal period to Ethereum

#### **Best For**
- Regular trading with low fees
- Best overall balance of features
- DeFi activities with good protocol support
- Most users (recommended)

#### **RPC Endpoints**
- **Alchemy**: `https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Infura**: `https://arbitrum-mainnet.infura.io/v3/YOUR_KEY`
- **Public**: `https://arb1.arbitrum.io/rpc`

### **Optimism**

#### **Characteristics**
- **Chain ID**: 10
- **Currency**: ETH
- **Block Time**: ~2 seconds
- **Finality**: ~2 seconds
- **Gas Model**: Fixed gas price

#### **Advantages**
- **Very Low Fees**: Typically $0.05-0.50 per transaction
- **Fast Transactions**: Quick confirmation times
- **Ethereum Security**: Inherits Ethereum's security
- **Good DeFi Support**: Growing DeFi ecosystem

#### **Disadvantages**
- **Limited Liquidity**: Lower liquidity than Ethereum/Arbitrum
- **Centralized Sequencer**: Single sequencer (being decentralized)
- **Withdrawal Delays**: 7-day withdrawal period

#### **Best For**
- Cost-conscious trading
- Users prioritizing low fees
- DeFi activities with supported protocols
- Regular trading activities

#### **RPC Endpoints**
- **Alchemy**: `https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Infura**: `https://optimism-mainnet.infura.io/v3/YOUR_KEY`
- **Public**: `https://mainnet.optimism.io`

### **Base**

#### **Characteristics**
- **Chain ID**: 8453
- **Currency**: ETH
- **Block Time**: ~2 seconds
- **Finality**: ~2 seconds
- **Gas Model**: Fixed gas price

#### **Advantages**
- **Very Low Fees**: Typically $0.01-0.10 per transaction
- **Coinbase Integration**: Easy access through Coinbase
- **Growing Ecosystem**: Rapidly expanding DeFi support
- **Simple Onboarding**: Easy fiat on-ramp

#### **Disadvantages**
- **New Network**: Less established than others
- **Limited Liquidity**: Lower liquidity for some tokens
- **Centralized**: More centralized than other networks

#### **Best For**
- New users getting started
- Users with Coinbase accounts
- Cost-sensitive trading
- Experimenting with new protocols

#### **RPC Endpoints**
- **Alchemy**: `https://base-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Infura**: `https://base-mainnet.infura.io/v3/YOUR_KEY`
- **Public**: `https://mainnet.base.org`

### **Polygon**

#### **Characteristics**
- **Chain ID**: 137
- **Currency**: MATIC
- **Block Time**: ~2 seconds
- **Finality**: ~2 seconds
- **Gas Model**: Fixed gas price

#### **Advantages**
- **Very Low Fees**: Typically $0.001-0.01 per transaction
- **Fast Transactions**: Quick confirmation times
- **Mature Ecosystem**: Well-established DeFi protocols
- **Good Liquidity**: Decent liquidity for major tokens

#### **Disadvantages**
- **Separate Network**: Not Ethereum L2, requires bridging
- **Different Token**: Uses MATIC instead of ETH
- **Centralization Concerns**: More centralized than Ethereum

#### **Best For**
- Very cost-sensitive trading
- Users already active on Polygon
- Micro-transactions
- DeFi activities on Polygon

#### **RPC Endpoints**
- **Alchemy**: `https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY`
- **Infura**: `https://polygon-mainnet.infura.io/v3/YOUR_KEY`
- **Public**: `https://polygon-rpc.com`

## Testnet Networks

### **Sepolia (Ethereum Testnet)**

#### **Purpose**
- Testing smart contracts and dApps
- Learning how to use Vaulto Swap
- Experimenting without real funds

#### **Characteristics**
- **Chain ID**: 11155111
- **Currency**: SepoliaETH (free from faucets)
- **Fees**: Free (testnet)
- **Tokens**: Test versions of real tokens

#### **Getting Testnet ETH**
- **Sepolia Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com)
- **Alchemy Faucet**: [sepoliafaucet.com](https://sepoliafaucet.com)
- **QuickNode Faucet**: [faucet.quicknode.com](https://faucet.quicknode.com)

### **Arbitrum Sepolia**

#### **Purpose**
- Testing Arbitrum-specific features
- Learning L2 interactions
- Low-cost testing environment

#### **Characteristics**
- **Chain ID**: 421614
- **Currency**: SepoliaETH (bridged from Sepolia)
- **Fees**: Free (testnet)
- **Features**: Full Arbitrum functionality

#### **Getting Testnet ETH**
- **Bridge from Sepolia**: Use [bridge.arbitrum.io](https://bridge.arbitrum.io)
- **Direct Faucet**: [faucet.quicknode.com/arbitrum/sepolia](https://faucet.quicknode.com/arbitrum/sepolia)

## Choosing the Right Network

### **For Beginners**
**Recommended: Arbitrum**
- Low fees for learning
- Good liquidity
- Fast transactions
- Easy to use

### **For Large Trades**
**Recommended: Ethereum**
- Maximum liquidity
- Best price execution
- Highest security
- Most protocol support

### **For Cost-Conscious Users**
**Recommended: Base or Optimism**
- Very low fees
- Good performance
- Growing ecosystem
- Easy onboarding

### **For DeFi Integration**
**Recommended: Ethereum or Arbitrum**
- Most DeFi protocols
- Best liquidity
- Established ecosystem
- Maximum composability

### **For Testing**
**Recommended: Sepolia or Arbitrum Sepolia**
- Free transactions
- Safe environment
- Learn without risk
- Test all features

## Network Switching

### **How to Switch Networks**

#### **MetaMask**
1. Click network dropdown in MetaMask
2. Select desired network
3. Add network if not listed
4. Confirm network switch

#### **WalletConnect Wallets**
1. Switch network in your mobile wallet
2. Refresh Vaulto Swap page
3. Confirm network change
4. Verify connection

#### **Other Wallets**
Most wallets have similar network switching:
- Look for network selector
- Add custom networks if needed
- Verify RPC endpoints

### **Network Addition**
If a network isn't available in your wallet:

#### **Arbitrum One**
```
Network Name: Arbitrum One
RPC URL: https://arb1.arbitrum.io/rpc
Chain ID: 42161
Currency Symbol: ETH
Block Explorer: https://arbiscan.io
```

#### **Optimism**
```
Network Name: Optimism
RPC URL: https://mainnet.optimism.io
Chain ID: 10
Currency Symbol: ETH
Block Explorer: https://optimistic.etherscan.io
```

#### **Base**
```
Network Name: Base
RPC URL: https://mainnet.base.org
Chain ID: 8453
Currency Symbol: ETH
Block Explorer: https://basescan.org
```

#### **Polygon**
```
Network Name: Polygon Mainnet
RPC URL: https://polygon-rpc.com
Chain ID: 137
Currency Symbol: MATIC
Block Explorer: https://polygonscan.com
```

## Token Availability by Network

### **Ethereum**
- All tokens available
- Highest liquidity
- Most trading pairs

### **Arbitrum**
- Major tokens available
- Good liquidity
- Growing token support

### **Optimism**
- Core tokens available
- Moderate liquidity
- Expanding support

### **Base**
- Limited tokens
- Growing support
- Coinbase integration

### **Polygon**
- Many tokens available
- Good DeFi support
- Established ecosystem

## Gas Fee Optimization

### **Understanding Gas Fees**
- **Gas Price**: Cost per unit of computation
- **Gas Limit**: Maximum gas units for transaction
- **Total Cost**: Gas Price × Gas Limit

### **Optimization Strategies**
- **Use L2 networks** for lower fees
- **Trade during off-peak hours** for lower gas prices
- **Batch transactions** when possible
- **Monitor gas prices** before trading

### **Gas Price Tracking**
- **Etherscan Gas Tracker**: Monitor current gas prices
- **GasNow**: Real-time gas price estimates
- **Wallet Integration**: Many wallets show gas estimates

## Troubleshooting Network Issues

### **Common Issues**

#### **"Network Not Supported"**
- Verify network is supported by Vaulto Swap
- Check chain ID is correct
- Add network manually if needed

#### **"Transaction Failed"**
- Check network congestion
- Increase gas limit
- Verify sufficient balance for fees

#### **"Wrong Network"**
- Switch to correct network in wallet
- Refresh Vaulto Swap page
- Reconnect wallet if needed

#### **"Slow Transactions"**
- Check network congestion
- Consider switching to L2 network
- Wait for better network conditions

## Next Steps

Now that you understand the supported networks:

1. **[Making Your First Trade](making-first-trade.md)** - Execute your first trade
2. **[Fees & Pricing](fees-pricing.md)** - Understand network fees and costs
3. **[Security Best Practices](security-best-practices.md)** - Keep your trading secure
4. **[Understanding Tokenized Stocks](understanding-tokenized-stocks.md)** - Learn about the assets you can trade

## Need Help?

If you're having network issues:
- **[Troubleshooting Guide](troubleshooting/network-issues.md)** - Fix network problems
- **[FAQ](getting-started/faq.md)** - Common questions and answers
- **[Support](resources/support.md)** - Get help from the community

---

**Ready to choose your network?** For most users, we recommend starting with **Arbitrum** for the best balance of low fees, fast transactions, and good liquidity. Check out our guide on [Making Your First Trade](making-first-trade.md) to get started!
