# Fees & Pricing

Understanding the fees and pricing mechanisms on Vaulto Swap is crucial for making informed trading decisions. This guide explains all costs associated with trading and how prices are determined.

## Overview of Fees

Vaulto Swap uses a transparent fee structure with multiple components:

### **Fee Types**
- **Network Gas Fees** - Cost to execute transactions on blockchain
- **CoW Protocol Fees** - Fees for MEV protection and optimal execution
- **Price Impact** - How your trade affects the market price
- **Slippage** - Price movement during transaction execution

### **No Hidden Fees**
- **No Trading Fees** - Vaulto Swap doesn't charge additional trading fees
- **Transparent Pricing** - All fees are clearly displayed before trading
- **Best Execution** - Always get the best available price through CoW Swap

## Network Gas Fees

### **What Are Gas Fees?**
Gas fees are the cost of executing transactions on blockchain networks. They compensate validators for processing and securing transactions.

### **Gas Fee Structure**
- **Gas Price**: Cost per unit of computation (measured in Gwei)
- **Gas Limit**: Maximum gas units allowed for the transaction
- **Total Cost**: Gas Price × Gas Limit = Total Gas Fee

### **Gas Fees by Network**

#### **Ethereum Mainnet**
- **Typical Range**: $5-50 per transaction
- **Peak Times**: Can exceed $100 during high congestion
- **Factors**: Network congestion, transaction complexity, gas price bidding

#### **Arbitrum One**
- **Typical Range**: $0.10-1.00 per transaction
- **Consistent**: Fixed gas prices, predictable costs
- **Advantages**: Low fees with Ethereum security

#### **Optimism**
- **Typical Range**: $0.05-0.50 per transaction
- **Very Low**: Often the cheapest option
- **Predictable**: Fixed gas pricing model

#### **Base**
- **Typical Range**: $0.01-0.10 per transaction
- **Extremely Low**: Often under $0.05
- **Coinbase Integration**: Optimized for Coinbase users

#### **Polygon**
- **Typical Range**: $0.001-0.01 per transaction
- **Micro-fees**: Often under $0.01
- **MATIC Currency**: Uses MATIC token for fees

### **Gas Fee Optimization**

#### **Timing Your Trades**
- **Off-Peak Hours**: Trade during low-usage periods
- **Weekend Trading**: Often lower gas prices
- **Avoid Rush Hours**: Peak usage times have higher fees

#### **Network Selection**
- **Use L2 Networks**: Arbitrum, Optimism, Base for lower fees
- **Consider Polygon**: For very cost-sensitive trading
- **Ethereum Only**: When maximum security or liquidity needed

#### **Transaction Optimization**
- **Batch Operations**: Combine multiple actions when possible
- **Approve Once**: Token approvals are reusable
- **Gas Limit**: Set appropriate limits to avoid failures

## CoW Protocol Fees

### **What Is CoW Swap?**
CoW Swap is the underlying protocol that powers Vaulto Swap's trading engine. It provides MEV protection and optimal price execution.

### **CoW Protocol Fee Structure**
- **Trading Fees**: Typically 0.1-0.5% of trade value
- **Gasless Orders**: Some trades execute without gas fees
- **Optimal Routing**: Always finds the best available price
- **MEV Protection**: No front-running or sandwich attacks

### **Fee Benefits**
- **MEV Protection**: Prevents malicious actors from exploiting your trades
- **Best Execution**: Always get the optimal price across all liquidity sources
- **Gas Optimization**: Often reduces total trading costs
- **Settlement Protection**: Trades complete atomically or fail entirely

### **Fee Calculation**
```
Total Trading Cost = Network Gas Fee + CoW Protocol Fee + Price Impact
```

## Price Impact

### **What Is Price Impact?**
Price impact measures how much your trade affects the market price of the tokens you're trading.

### **Price Impact Factors**
- **Trade Size**: Larger trades have higher price impact
- **Liquidity Depth**: More liquidity means lower price impact
- **Market Conditions**: Volatile markets have higher impact
- **Token Pair**: Some pairs have better liquidity than others

### **Price Impact Examples**

#### **Low Price Impact (< 0.1%)**
- Small trades on liquid pairs
- USDC ↔ USDT trades
- Major tokenized stocks with good liquidity

#### **Medium Price Impact (0.1% - 1%)**
- Medium-sized trades
- Less liquid token pairs
- Volatile market conditions

#### **High Price Impact (> 1%)**
- Large trades relative to liquidity
- New or illiquid tokens
- Extreme market volatility

### **Managing Price Impact**
- **Split Large Trades**: Break big trades into smaller ones
- **Choose Liquid Pairs**: Trade pairs with better liquidity
- **Monitor Market Conditions**: Avoid trading during extreme volatility
- **Use Limit Orders**: Set specific price targets when available

## Slippage

### **What Is Slippage?**
Slippage is the difference between the expected price and the actual execution price of your trade.

### **Slippage Types**
- **Positive Slippage**: You get a better price than expected
- **Negative Slippage**: You get a worse price than expected
- **No Slippage**: You get exactly the expected price

### **Slippage Tolerance**
Vaulto Swap allows you to set slippage tolerance:

#### **Low Slippage (0.1% - 0.5%)**
- **Best For**: Stable pairs, small trades
- **Risk**: Higher chance of transaction failure
- **Use Case**: Precise price requirements

#### **Medium Slippage (0.5% - 1%)**
- **Best For**: Most trading scenarios
- **Risk**: Balanced between success and price protection
- **Use Case**: Regular trading activities

#### **High Slippage (1% - 5%)**
- **Best For**: Volatile markets, large trades
- **Risk**: Higher price impact tolerance
- **Use Case**: When you must execute the trade

### **Slippage Protection**
- **Minimum Received**: Guaranteed minimum output amount
- **Price Limits**: Maximum acceptable price movement
- **Transaction Reversal**: Failed trades don't execute

## Price Discovery

### **How Prices Are Determined**
Prices on Vaulto Swap are determined by:

#### **Liquidity Sources**
- **CoW Protocol Pools**: Primary liquidity source
- **Uniswap V3**: Fallback liquidity source
- **Other DEXs**: Additional liquidity sources
- **Market Makers**: Professional liquidity providers

#### **Price Aggregation**
- **Best Price Discovery**: Always finds the optimal rate
- **Cross-DEX Routing**: Routes through multiple exchanges
- **Arbitrage Elimination**: Prices stay consistent across sources
- **Real-time Updates**: Prices update every 10 seconds

### **Price Accuracy**
- **Real-time Data**: Prices reflect current market conditions
- **Multiple Sources**: Aggregated from various liquidity pools
- **MEV Protection**: No manipulation from malicious actors
- **Transparent Pricing**: All price sources are visible

## Fee Comparison

### **Vaulto Swap vs Traditional Exchanges**

#### **Vaulto Swap Advantages**
- **No Trading Fees**: Only network and protocol fees
- **MEV Protection**: No front-running or sandwich attacks
- **Best Execution**: Always get optimal prices
- **Transparent**: All fees clearly displayed

#### **Traditional Exchange Fees**
- **Trading Fees**: 0.1% - 1% per trade
- **Withdrawal Fees**: $5-50 per withdrawal
- **Deposit Fees**: Often free but may have minimums
- **Hidden Costs**: Spreads, slippage, and other hidden fees

### **Total Cost Comparison Example**

#### **Trading $1,000 USDC → bAAPL**

**Vaulto Swap (Arbitrum):**
- Network Gas Fee: $0.50
- CoW Protocol Fee: $2.00 (0.2%)
- Price Impact: $1.00 (0.1%)
- **Total Cost: $3.50**

**Traditional Exchange:**
- Trading Fee: $5.00 (0.5%)
- Withdrawal Fee: $15.00
- Spread/Slippage: $3.00
- **Total Cost: $23.00**

**Savings with Vaulto Swap: $19.50 (85% savings)**

## Cost Optimization Strategies

### **For Regular Trading**
1. **Use L2 Networks**: Arbitrum or Optimism for lower fees
2. **Trade During Off-Peak Hours**: Lower gas prices
3. **Approve Tokens Once**: Reuse approvals for multiple trades
4. **Monitor Gas Prices**: Use gas tracking tools

### **For Large Trades**
1. **Split Into Smaller Trades**: Reduce price impact
2. **Use Ethereum**: Better liquidity for large amounts
3. **Consider Limit Orders**: Set specific price targets
4. **Monitor Market Conditions**: Avoid volatile periods

### **For Cost-Conscious Users**
1. **Use Base or Polygon**: Lowest fee networks
2. **Trade Stable Pairs**: Lower price impact
3. **Batch Operations**: Combine multiple actions
4. **Optimize Timing**: Trade during low-usage periods

## Fee Transparency

### **Pre-Trade Display**
Before executing any trade, Vaulto Swap shows:
- **Expected Output**: How much you'll receive
- **Price Impact**: How your trade affects the market
- **Network Fee**: Estimated gas cost
- **Total Cost**: Sum of all fees
- **Minimum Received**: Guaranteed minimum output

### **Post-Trade Confirmation**
After trade execution:
- **Actual Output**: What you actually received
- **Total Fees Paid**: Actual fees charged
- **Price Achieved**: Actual execution price
- **Transaction Hash**: Link to block explorer

### **Fee Breakdown**
Every trade shows detailed fee breakdown:
```
Trade Amount: $1,000 USDC
Network Fee: $0.50 ETH
Protocol Fee: $2.00 (0.2%)
Price Impact: $1.00 (0.1%)
Total Fees: $3.50
Net Received: $996.50 bAAPL
```

## Understanding Price Quotes

### **Quote Components**
- **Input Amount**: What you're trading
- **Output Amount**: What you'll receive
- **Exchange Rate**: Current price between tokens
- **Price Impact**: Effect on market price
- **Slippage Tolerance**: Maximum acceptable slippage

### **Quote Validity**
- **10-Second Updates**: Prices refresh automatically
- **Market Conditions**: Quotes reflect current market state
- **Liquidity Changes**: Updates when liquidity changes
- **Network Conditions**: Adjusts for network congestion

### **Quote Accuracy**
- **Real-time Data**: Quotes use current market data
- **Multiple Sources**: Aggregated from various liquidity pools
- **MEV Protection**: No manipulation from malicious actors
- **Transparent Sources**: All price sources are visible

## Troubleshooting Fee Issues

### **High Gas Fees**
- **Switch Networks**: Use L2 networks for lower fees
- **Wait for Better Conditions**: Monitor gas prices
- **Optimize Transaction**: Reduce gas limit if possible
- **Batch Operations**: Combine multiple actions

### **High Price Impact**
- **Reduce Trade Size**: Split into smaller trades
- **Choose Different Pair**: Trade more liquid pairs
- **Wait for Better Liquidity**: Monitor market conditions
- **Use Limit Orders**: Set specific price targets

### **Failed Transactions**
- **Increase Gas Limit**: Allow more gas for transaction
- **Increase Slippage**: Accept higher price movement
- **Check Network**: Ensure stable network connection
- **Retry Transaction**: Try again with adjusted parameters

## Next Steps

Now that you understand fees and pricing:

1. **[Making Your First Trade](making-first-trade.md)** - Execute your first trade with fee awareness
2. **[Security Best Practices](security-best-practices.md)** - Keep your trading secure
3. **[Supported Networks](supported-networks.md)** - Choose networks with optimal fees
4. **[Understanding Tokenized Stocks](understanding-tokenized-stocks.md)** - Learn about the assets you're trading

## Need Help?

If you have questions about fees or pricing:
- **[FAQ](getting-started/faq.md)** - Common questions about fees
- **[Troubleshooting Guide](troubleshooting/transaction-failures.md)** - Fix fee-related issues
- **[Support](resources/support.md)** - Get help from the community

---

**Ready to trade with full fee awareness?** Understanding fees helps you make better trading decisions and optimize your costs. Check out our guide on [Making Your First Trade](making-first-trade.md) to put this knowledge into practice!
