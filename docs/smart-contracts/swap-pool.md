# SwapPool.sol

The SwapPool contract is the core AMM (Automated Market Maker) implementation that enables trading between stablecoins and tokenized stocks. This guide covers the contract's functionality, security features, and usage.

## Contract Overview

### **Purpose**
The SwapPool contract implements a constant product AMM that allows users to:
- Swap tokens between stablecoins and tokenized stocks
- Add and remove liquidity
- Earn fees from trading activity

### **Key Features**
- **Constant Product Formula**: x * y = k pricing model
- **Liquidity Management**: Add/remove liquidity functionality
- **Fee System**: Configurable swap fees (default 0.3%)
- **Security**: Reentrancy protection and safe token transfers
- **Access Control**: Owner-only administrative functions

## Contract Structure

### **Inheritance**
```solidity
contract SwapPool is ISwapPool, Ownable, ReentrancyGuard
```

- **ISwapPool**: Interface defining required functions
- **Ownable**: Access control for owner functions
- **ReentrancyGuard**: Protection against reentrancy attacks

### **State Variables**
```solidity
address public immutable override token0;
address public immutable override token1;
uint256 public override reserve0;
uint256 public override reserve1;
uint256 public totalLiquidity;
mapping(address => uint256) public liquidityBalance;
uint256 public constant MINIMUM_LIQUIDITY = 1000;
uint256 public constant FEE_DENOMINATOR = 10000;
uint256 public swapFee = 30; // 0.3%
```

## Core Functions

### **Swap Function**

#### **Function Signature**
```solidity
function swap(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 minAmountOut,
    address recipient
) external override nonReentrant returns (uint256 amountOut)
```

#### **Parameters**
- **tokenIn**: Address of the input token
- **tokenOut**: Address of the output token
- **amountIn**: Amount of input tokens to swap
- **minAmountOut**: Minimum amount of output tokens (slippage protection)
- **recipient**: Address to receive output tokens

#### **Returns**
- **amountOut**: Actual amount of output tokens received

#### **Process**
1. Validate input parameters
2. Calculate output amount using constant product formula
3. Check slippage protection
4. Update reserves
5. Transfer tokens
6. Emit swap event

### **Get Quote Function**

#### **Function Signature**
```solidity
function getQuote(
    address tokenIn,
    address tokenOut,
    uint256 amountIn
) public view override returns (uint256 amountOut)
```

#### **Purpose**
Calculate the expected output amount for a given input without executing the swap.

#### **Formula**
```solidity
// Apply fee
uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - swapFee);

// Constant product formula: x * y = k
uint256 numerator = amountInWithFee * reserveOut;
uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;

amountOut = numerator / denominator;
```

### **Add Liquidity Function**

#### **Function Signature**
```solidity
function addLiquidity(
    uint256 amount0,
    uint256 amount1
) external override nonReentrant returns (uint256 liquidity)
```

#### **Purpose**
Add liquidity to the pool and receive liquidity tokens in return.

#### **Process**
1. Transfer tokens from user to pool
2. Calculate liquidity tokens to mint
3. Update pool state
4. Emit liquidity added event

#### **Liquidity Calculation**
```solidity
if (totalLiquidity == 0) {
    // First liquidity provision
    liquidity = sqrt(amount0 * amount1);
    require(liquidity > MINIMUM_LIQUIDITY, "Insufficient initial liquidity");
    liquidity -= MINIMUM_LIQUIDITY; // Lock minimum liquidity
} else {
    // Subsequent liquidity provision
    uint256 liquidity0 = (amount0 * totalLiquidity) / reserve0;
    uint256 liquidity1 = (amount1 * totalLiquidity) / reserve1;
    liquidity = liquidity0 < liquidity1 ? liquidity0 : liquidity1;
}
```

### **Remove Liquidity Function**

#### **Function Signature**
```solidity
function removeLiquidity(
    uint256 liquidity
) external override nonReentrant returns (uint256 amount0, uint256 amount1)
```

#### **Purpose**
Remove liquidity from the pool by burning liquidity tokens.

#### **Process**
1. Validate liquidity balance
2. Calculate token amounts to return
3. Update pool state
4. Transfer tokens to user
5. Emit liquidity removed event

## Security Features

### **Reentrancy Protection**
- **ReentrancyGuard**: Prevents reentrancy attacks
- **nonReentrant modifier**: Applied to all state-changing functions
- **SafeERC20**: Safe token transfer operations

### **Access Control**
- **Ownable**: Owner-only functions for administrative tasks
- **Public functions**: Available to all users for trading
- **View functions**: Read-only operations

### **Input Validation**
- **Address validation**: Ensures valid token addresses
- **Amount validation**: Prevents zero or invalid amounts
- **Token pair validation**: Ensures valid trading pairs

### **Slippage Protection**
- **minAmountOut parameter**: Guarantees minimum output
- **Revert on slippage**: Transaction fails if slippage exceeded
- **User control**: Users set their own slippage tolerance

## Fee System

### **Swap Fee**
- **Default fee**: 0.3% (30 basis points)
- **Configurable**: Owner can adjust fee (max 10%)
- **Fee collection**: Fees accumulate in the pool
- **Liquidity provider rewards**: Fees distributed to liquidity providers

### **Fee Calculation**
```solidity
uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - swapFee);
```

### **Fee Management**
```solidity
function setSwapFee(uint256 newFee) external onlyOwner {
    require(newFee <= 1000, "Fee too high"); // Max 10%
    swapFee = newFee;
}
```

## Events

### **Swap Event**
```solidity
event Swap(
    address indexed sender,
    address indexed tokenIn,
    address indexed tokenOut,
    uint256 amountIn,
    uint256 amountOut
);
```

### **Liquidity Events**
```solidity
event LiquidityAdded(
    address indexed provider,
    uint256 amount0,
    uint256 amount1,
    uint256 liquidity
);

event LiquidityRemoved(
    address indexed provider,
    uint256 amount0,
    uint256 amount1,
    uint256 liquidity
);
```

## Mathematical Functions

### **Square Root Function**
```solidity
function sqrt(uint256 y) internal pure returns (uint256 z) {
    if (y > 3) {
        z = y;
        uint256 x = y / 2 + 1;
        while (x < z) {
            z = x;
            x = (y / x + x) / 2;
        }
    } else if (y != 0) {
        z = 1;
    }
}
```

**Purpose**: Calculate square root for liquidity calculations using Babylonian method.

## Usage Examples

### **Swapping Tokens**

#### **JavaScript/TypeScript**
```typescript
import { useContractWrite } from 'wagmi';

const { write: swap } = useContractWrite({
  address: poolAddress,
  abi: SwapPoolABI,
  functionName: 'swap',
  args: [tokenIn, tokenOut, amountIn, minAmountOut, recipient]
});

// Execute swap
swap();
```

#### **Solidity**
```solidity
// Get quote first
uint256 amountOut = swapPool.getQuote(tokenIn, tokenOut, amountIn);

// Execute swap
uint256 actualAmountOut = swapPool.swap(
    tokenIn,
    tokenOut,
    amountIn,
    minAmountOut,
    recipient
);
```

### **Adding Liquidity**

#### **JavaScript/TypeScript**
```typescript
const { write: addLiquidity } = useContractWrite({
  address: poolAddress,
  abi: SwapPoolABI,
  functionName: 'addLiquidity',
  args: [amount0, amount1]
});

addLiquidity();
```

### **Removing Liquidity**

#### **JavaScript/TypeScript**
```typescript
const { write: removeLiquidity } = useContractWrite({
  address: poolAddress,
  abi: SwapPoolABI,
  functionName: 'removeLiquidity',
  args: [liquidityAmount]
});

removeLiquidity();
```

## Gas Optimization

### **Optimization Techniques**
- **Immutable variables**: token0 and token1 are immutable
- **Efficient calculations**: Optimized mathematical operations
- **Minimal storage**: Only essential state variables
- **Batch operations**: Combine multiple operations when possible

### **Gas Costs**
- **Swap**: ~100,000-150,000 gas
- **Add Liquidity**: ~150,000-200,000 gas
- **Remove Liquidity**: ~100,000-150,000 gas
- **Get Quote**: ~5,000-10,000 gas (view function)

## Testing

### **Test Coverage**
- **Unit tests**: Individual function testing
- **Integration tests**: Full swap flow testing
- **Edge cases**: Boundary condition testing
- **Security tests**: Reentrancy and access control testing

### **Test Scenarios**
- **Normal swaps**: Standard trading scenarios
- **Liquidity provision**: Adding and removing liquidity
- **Edge cases**: Zero amounts, maximum values
- **Security tests**: Unauthorized access attempts

## Deployment

### **Constructor Parameters**
```solidity
constructor(
    address _token0,
    address _token1
) Ownable(msg.sender)
```

### **Deployment Process**
1. Deploy through PoolFactory
2. Verify contract on block explorer
3. Initialize with initial liquidity
4. Set appropriate swap fees

### **Initialization**
- **Minimum liquidity**: 1000 tokens locked permanently
- **Initial reserves**: Set by first liquidity provider
- **Fee setting**: Configure appropriate swap fees

## Security Considerations

### **Audit Status**
⚠️ **Warning**: This contract has not been audited. Use at your own risk.

### **Known Risks**
- **Smart contract bugs**: Potential vulnerabilities in code
- **Economic attacks**: Flash loan attacks, price manipulation
- **Governance risks**: Owner key compromise
- **Upgrade risks**: No upgrade mechanism

### **Risk Mitigation**
- **Thorough testing**: Comprehensive test coverage
- **OpenZeppelin libraries**: Battle-tested security patterns
- **Access controls**: Limited administrative functions
- **Monitoring**: Transaction monitoring and alerting

## Next Steps

Now that you understand the SwapPool contract:

1. **[PoolFactory.sol](pool-factory.md)** - Factory contract for deploying pools
2. **[Deployment Guide](deployment-guide.md)** - How to deploy contracts
3. **[Contract Interaction](contract-interaction.md)** - Interacting with deployed contracts
4. **[API Reference](api-reference/components.md)** - Frontend integration

---

**The SwapPool contract** provides a secure and efficient AMM implementation for trading tokenized stocks with stablecoins. Understanding its functionality is essential for both users and developers working with the Vaulto Swap protocol.
