# Making Your First Trade

This comprehensive guide will walk you through executing your first trade on Vaulto Swap, from selecting tokens to confirming the transaction.

## Prerequisites

Before making your first trade, ensure you have:
- ✅ **Wallet connected** to Vaulto Swap
- ✅ **Network selected** (Ethereum, Arbitrum, Optimism, Base, or Polygon)
- ✅ **Sufficient balance** of the token you want to sell
- ✅ **ETH for gas fees** (on the network you're using)
- ✅ **Regulated assets enabled** (if trading tokenized stocks)

## Terminology

Understanding these terms will help you make informed trades:

- **Swap**: Trading one token for another
- **Slippage**: Price movement during transaction execution
- **Price Impact**: How your trade affects the market price
- **Gas Fee**: Cost to execute the transaction on blockchain
- **MEV Protection**: Protection from front-running and sandwich attacks

## Step-by-Step Trading Guide

### Step 1: Access the Trading Interface

1. **Navigate to Vaulto Swap**: Go to [swap.vaulto.ai](https://swap.vaulto.ai)
2. **Verify Connection**: Ensure your wallet is connected (address shown in top right)
3. **Check Network**: Confirm you're on a supported network
4. **Enable Regulated Assets**: Toggle this on if trading tokenized stocks

### Step 2: Select Your Tokens

#### Choose "From" Token (What You're Selling)
1. **Click the dropdown** in the "From" section
2. **Select your token** from the list:
   - **Stablecoins**: USDC, USDT, DAI
   - **Tokenized Stocks**: bAAPL, bTSLA, bGOOGL, bAMZN, bMSFT
   - **Other**: WBTC, WETH
3. **Verify the token** is correct before proceeding

#### Choose "To" Token (What You're Buying)
1. **Click the dropdown** in the "To" section
2. **Select your desired token** from the list
3. **Ensure different token** from your "From" selection

#### Token Selection Tips
- **Start with stablecoins** if you're new to trading
- **Check token availability** on your current network
- **Verify token symbols** match your expectations
- **Use search** to quickly find specific tokens

### Step 3: Enter Trade Amount

#### Input Amount
1. **Click the amount field** in the "From" section
2. **Type your desired amount** (e.g., "100" for $100)
3. **Use "MAX" button** to trade your entire balance
4. **Check balance display** to ensure you have sufficient funds

#### Amount Considerations
- **Start small** for your first trade to learn the process
- **Consider gas fees** - you need ETH to pay for transactions
- **Check price impact** - larger trades may have higher impact
- **Verify decimals** - some tokens use different decimal places

### Step 4: Review the Quote

After entering your amount, review the trade details:

#### Price Information
- **Exchange Rate**: Current price between the two tokens
- **Price Impact**: How your trade affects the market (lower is better)
- **Minimum Received**: Guaranteed minimum output (after slippage)
- **Route**: Which liquidity sources will be used

#### Fee Breakdown
- **Network Fee**: Gas cost for the transaction
- **Protocol Fee**: CoW Swap fee (typically very low)
- **Total Cost**: Sum of all fees

#### Slippage Settings
- **Default Slippage**: Usually 0.5-1% (good for most trades)
- **High Slippage**: 3-5% (for volatile markets or large trades)
- **Custom Slippage**: Set your own tolerance

### Step 5: Execute the Trade

#### Initial Approval (First Time Only)
If this is your first time trading a token:
1. **Click "Approve [Token]"** button
2. **Review approval transaction** in your wallet
3. **Confirm transaction** (this allows Vaulto Swap to spend your tokens)
4. **Wait for confirmation** (usually 30 seconds to 2 minutes)

#### Execute the Swap
1. **Click "Swap"** button
2. **Review transaction details** in the popup
3. **Check all amounts** are correct
4. **Confirm transaction** in your wallet
5. **Wait for confirmation** (transaction appears in blockchain)

### Step 6: Verify Your Trade

#### Check Transaction Status
- **Pending**: Transaction submitted to blockchain
- **Confirmed**: Transaction included in a block
- **Failed**: Transaction failed (check gas or slippage)

#### Verify Results
1. **Check your wallet** for new token balance
2. **View transaction** on block explorer (Etherscan, Arbiscan, etc.)
3. **Review trade history** in the CoW Swap widget
4. **Calculate actual exchange rate** received

## Understanding Trade Execution

### **CoW Swap Integration**
Vaulto Swap uses CoW Swap for trade execution, which provides:
- **MEV Protection**: No front-running or sandwich attacks
- **Optimal Routing**: Best price discovery across liquidity sources
- **Gasless Orders**: Some trades execute without gas fees
- **Settlement Protection**: Trades settle atomically

### **Price Discovery**
Prices are determined by:
- **Liquidity pools** with the best available rates
- **Market conditions** at time of execution
- **Trade size** and price impact
- **Network congestion** and gas prices

### **Execution Time**
Typical execution times:
- **Ethereum**: 30 seconds to 5 minutes
- **L2 Networks** (Arbitrum, Optimism, Base): 1-2 minutes
- **Polygon**: 1-3 minutes
- **Gasless orders**: May take longer but no gas fees

## Common Trade Scenarios

### **Scenario 1: USDC to bAAPL**
1. **Select USDC** as "From" token
2. **Select bAAPL** as "To" token
3. **Enter amount** (e.g., 100 USDC)
4. **Review quote** and price impact
5. **Approve USDC** (first time only)
6. **Execute swap** and wait for confirmation

### **Scenario 2: bTSLA to DAI**
1. **Select bTSLA** as "From" token
2. **Select DAI** as "To" token
3. **Enter amount** of Tesla tokens to sell
4. **Check minimum received** DAI amount
5. **Approve bTSLA** if needed
6. **Execute swap** and verify results

### **Scenario 3: Large Trade (High Price Impact)**
1. **Enter large amount** and notice high price impact
2. **Consider splitting** into smaller trades
3. **Increase slippage tolerance** if necessary
4. **Review minimum received** carefully
5. **Execute with caution** and monitor results

## Advanced Trading Features

### **Limit Orders**
Set orders to execute at specific prices:
1. **Select "Limit Order"** instead of immediate swap
2. **Set target price** for your trade
3. **Specify expiration** time
4. **Submit order** and wait for execution

### **Multi-hop Routing**
For tokens without direct pairs:
- **Automatic routing** through intermediate tokens
- **Better prices** through complex routes
- **Higher gas costs** for multiple transactions

### **Gas Optimization**
Optimize gas usage:
- **Use L2 networks** (Arbitrum, Optimism, Base) for lower fees
- **Trade during off-peak** hours for lower gas prices
- **Consider gasless orders** when available

## Troubleshooting Common Issues

### **"Insufficient Balance"**
- **Check token balance** in your wallet
- **Verify network** is correct
- **Account for gas fees** in ETH
- **Refresh wallet** if balance seems wrong

### **"Slippage Too High"**
- **Increase slippage tolerance** (but be careful!)
- **Try smaller trade size**
- **Wait for better market conditions**
- **Check for low liquidity**

### **"Transaction Failed"**
- **Increase gas limit** in wallet settings
- **Check network congestion**
- **Verify sufficient ETH** for gas
- **Try again** after a few minutes

### **"Price Impact Too High"**
- **Reduce trade size**
- **Split into multiple smaller trades**
- **Wait for better liquidity**
- **Consider different trading pairs**

## Safety Tips

### **Before Trading**
- **Verify token addresses** match expected tokens
- **Check token symbols** and names
- **Review price impact** and slippage
- **Ensure sufficient balance** for gas fees

### **During Trading**
- **Never rush** the transaction process
- **Read all prompts** carefully
- **Verify amounts** before confirming
- **Keep transaction hash** for records

### **After Trading**
- **Verify receipt** of expected tokens
- **Check transaction** on block explorer
- **Record trade details** for taxes
- **Review performance** and learn

## Next Steps

After your first successful trade:

1. **[Understanding Tokenized Stocks](understanding-tokenized-stocks.md)** - Learn about the assets you're trading
2. **[Fees & Pricing](fees-pricing.md)** - Understand costs and pricing mechanisms
3. **[Security Best Practices](security-best-practices.md)** - Keep your trading secure
4. **[Supported Networks](supported-networks.md)** - Explore different blockchain options

## Need Help?

If you encounter issues with trading:
- **[Troubleshooting Guide](troubleshooting/transaction-failures.md)** - Fix common trading problems
- **[FAQ](getting-started/faq.md)** - Common questions and answers
- **[Support](resources/support.md)** - Get help from the community

---

**Congratulations!** 🎉 You've successfully made your first trade on Vaulto Swap. Ready to learn more about the assets you're trading? Check out our guide on [Understanding Tokenized Stocks](understanding-tokenized-stocks.md)!
