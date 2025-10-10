// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./interfaces/ISwapPool.sol";

/**
 * @title SwapPool
 * @notice AMM-style liquidity pool for stablecoin <-> tokenized stock swaps
 * @dev Simple constant product AMM implementation with price oracle support
 */
contract SwapPool is ISwapPool, Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public immutable override token0;
    address public immutable override token1;
    
    uint256 public override reserve0;
    uint256 public override reserve1;
    
    uint256 public totalLiquidity;
    mapping(address => uint256) public liquidityBalance;
    
    uint256 public constant MINIMUM_LIQUIDITY = 1000;
    uint256 public constant FEE_DENOMINATOR = 10000;
    uint256 public swapFee = 30; // 0.3%
    
    constructor(
        address _token0,
        address _token1
    ) Ownable(msg.sender) {
        require(_token0 != address(0) && _token1 != address(0), "Invalid token address");
        require(_token0 != _token1, "Tokens must be different");
        
        token0 = _token0;
        token1 = _token1;
    }

    /**
     * @notice Swap tokens in the pool
     * @param tokenIn Address of input token
     * @param tokenOut Address of output token
     * @param amountIn Amount of input tokens
     * @param minAmountOut Minimum amount of output tokens (slippage protection)
     * @param recipient Address to receive output tokens
     * @return amountOut Actual amount of output tokens received
     */
    function swap(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 minAmountOut,
        address recipient
    ) external override nonReentrant returns (uint256 amountOut) {
        require(amountIn > 0, "Amount must be greater than 0");
        require(
            (tokenIn == token0 && tokenOut == token1) ||
            (tokenIn == token1 && tokenOut == token0),
            "Invalid token pair"
        );
        require(recipient != address(0), "Invalid recipient");

        // Calculate output amount
        amountOut = getQuote(tokenIn, tokenOut, amountIn);
        require(amountOut >= minAmountOut, "Slippage exceeded");

        // Update reserves
        if (tokenIn == token0) {
            reserve0 += amountIn;
            reserve1 -= amountOut;
        } else {
            reserve1 += amountIn;
            reserve0 -= amountOut;
        }

        // Transfer tokens
        IERC20(tokenIn).safeTransferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).safeTransfer(recipient, amountOut);

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }

    /**
     * @notice Get quote for swap
     * @param tokenIn Address of input token
     * @param tokenOut Address of output token
     * @param amountIn Amount of input tokens
     * @return amountOut Expected amount of output tokens
     */
    function getQuote(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) public view override returns (uint256 amountOut) {
        require(
            (tokenIn == token0 && tokenOut == token1) ||
            (tokenIn == token1 && tokenOut == token0),
            "Invalid token pair"
        );

        uint256 reserveIn = tokenIn == token0 ? reserve0 : reserve1;
        uint256 reserveOut = tokenIn == token0 ? reserve1 : reserve0;

        require(reserveIn > 0 && reserveOut > 0, "Insufficient liquidity");

        // Apply fee
        uint256 amountInWithFee = amountIn * (FEE_DENOMINATOR - swapFee);
        
        // Constant product formula: x * y = k
        uint256 numerator = amountInWithFee * reserveOut;
        uint256 denominator = (reserveIn * FEE_DENOMINATOR) + amountInWithFee;
        
        amountOut = numerator / denominator;
    }

    /**
     * @notice Add liquidity to the pool
     * @param amount0 Amount of token0 to add
     * @param amount1 Amount of token1 to add
     * @return liquidity Amount of liquidity tokens minted
     */
    function addLiquidity(
        uint256 amount0,
        uint256 amount1
    ) external override nonReentrant returns (uint256 liquidity) {
        require(amount0 > 0 && amount1 > 0, "Amounts must be greater than 0");

        // Transfer tokens to pool
        IERC20(token0).safeTransferFrom(msg.sender, address(this), amount0);
        IERC20(token1).safeTransferFrom(msg.sender, address(this), amount1);

        // Calculate liquidity
        if (totalLiquidity == 0) {
            liquidity = sqrt(amount0 * amount1);
            require(liquidity > MINIMUM_LIQUIDITY, "Insufficient initial liquidity");
            liquidity -= MINIMUM_LIQUIDITY; // Lock minimum liquidity
        } else {
            uint256 liquidity0 = (amount0 * totalLiquidity) / reserve0;
            uint256 liquidity1 = (amount1 * totalLiquidity) / reserve1;
            liquidity = liquidity0 < liquidity1 ? liquidity0 : liquidity1;
        }

        require(liquidity > 0, "Insufficient liquidity minted");

        // Update state
        liquidityBalance[msg.sender] += liquidity;
        totalLiquidity += liquidity;
        reserve0 += amount0;
        reserve1 += amount1;

        emit LiquidityAdded(msg.sender, amount0, amount1, liquidity);
    }

    /**
     * @notice Remove liquidity from the pool
     * @param liquidity Amount of liquidity tokens to burn
     * @return amount0 Amount of token0 returned
     * @return amount1 Amount of token1 returned
     */
    function removeLiquidity(
        uint256 liquidity
    ) external override nonReentrant returns (uint256 amount0, uint256 amount1) {
        require(liquidity > 0, "Liquidity must be greater than 0");
        require(liquidityBalance[msg.sender] >= liquidity, "Insufficient liquidity balance");

        // Calculate token amounts
        amount0 = (liquidity * reserve0) / totalLiquidity;
        amount1 = (liquidity * reserve1) / totalLiquidity;

        require(amount0 > 0 && amount1 > 0, "Insufficient liquidity burned");

        // Update state
        liquidityBalance[msg.sender] -= liquidity;
        totalLiquidity -= liquidity;
        reserve0 -= amount0;
        reserve1 -= amount1;

        // Transfer tokens
        IERC20(token0).safeTransfer(msg.sender, amount0);
        IERC20(token1).safeTransfer(msg.sender, amount1);

        emit LiquidityRemoved(msg.sender, amount0, amount1, liquidity);
    }

    /**
     * @notice Update swap fee (only owner)
     * @param newFee New fee in basis points (max 1000 = 10%)
     */
    function setSwapFee(uint256 newFee) external onlyOwner {
        require(newFee <= 1000, "Fee too high");
        swapFee = newFee;
    }

    /**
     * @notice Babylonian method for square root
     */
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
}

