/**
 * Validate if a string is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validate if a string is a valid amount
 */
export function isValidAmount(amount: string): boolean {
  if (!amount || amount === "") return false;
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && isFinite(num);
}

/**
 * Validate if amount doesn't exceed balance
 */
export function hasMinimumBalance(amount: string, balance: string): boolean {
  const amountNum = parseFloat(amount);
  const balanceNum = parseFloat(balance);
  return !isNaN(amountNum) && !isNaN(balanceNum) && amountNum <= balanceNum;
}

/**
 * Calculate price impact percentage
 */
export function calculatePriceImpact(
  inputAmount: string,
  outputAmount: string,
  marketRate: string
): string {
  const actualRate = parseFloat(outputAmount) / parseFloat(inputAmount);
  const expectedRate = parseFloat(marketRate);
  const impact = ((expectedRate - actualRate) / expectedRate) * 100;
  return Math.abs(impact).toFixed(2);
}

/**
 * Check if price impact is acceptable
 */
export function isAcceptablePriceImpact(impact: string, maxImpact: number = 5): boolean {
  return parseFloat(impact) <= maxImpact;
}

