// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SwapPool.sol";

/**
 * @title PoolFactory
 * @notice Factory contract for deploying SwapPool instances
 * @dev Uses CREATE2 for deterministic addresses
 */
contract PoolFactory {
    mapping(address => mapping(address => address)) public getPool;
    address[] public allPools;

    event PoolCreated(
        address indexed token0,
        address indexed token1,
        address pool,
        uint256 poolCount
    );

    /**
     * @notice Create a new swap pool
     * @param tokenA First token address
     * @param tokenB Second token address
     * @return pool Address of created pool
     */
    function createPool(
        address tokenA,
        address tokenB
    ) external returns (address pool) {
        require(tokenA != tokenB, "Identical tokens");
        require(tokenA != address(0) && tokenB != address(0), "Zero address");

        // Order tokens
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);

        require(getPool[token0][token1] == address(0), "Pool exists");

        // Deploy pool
        SwapPool newPool = new SwapPool(token0, token1);
        pool = address(newPool);

        // Store pool reference
        getPool[token0][token1] = pool;
        getPool[token1][token0] = pool;
        allPools.push(pool);

        emit PoolCreated(token0, token1, pool, allPools.length);
    }

    /**
     * @notice Get total number of pools
     */
    function allPoolsLength() external view returns (uint256) {
        return allPools.length;
    }
}

