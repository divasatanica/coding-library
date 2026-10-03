function coinChange(coins: number[], amount: number): number {
  if (amount === 0) {
    return [-1, []];
  }

  const dp = Array.from({ length: amount + 1 }).fill(amount + 1);
  dp[0] = 0;
  const usedCoinInBestSolution = Array.from({ length: amount + 1 }).fill(0);

  for (let i = 1; i <= amount; i++) {
    const currAmount = i;
    for (let j = 0; j < coins.length; j++) {
      const currCoin = coins[j];
      if (currAmount - currCoin < 0) {
        continue;
      }
      if (dp[currAmount - currCoin] + 1 < dp[currAmount]) {
        dp[currAmount] = dp[currAmount - currCoin] + 1;
        usedCoinInBestSolution[currAmount] = currCoin;
      }
      // dp[currAmount] = Math.min(dp[currAmount], dp[currAmount - currCoin] + 1);
    }
  }

  if (dp[amount] === amount + 1) {
    return [-1, []];
  }

  const usedCoins = [];
  let count = dp[amount];
  let currAmount = amount;

  while (count > 0) {
    const usedCoin = usedCoinInBestSolution[currAmount];
    if (usedCoin !== 0) {
      usedCoins.push(usedCoin);
    }
    currAmount -= usedCoin;
    count -= 1;
  }

  console.log("dp", dp, usedCoins);
  return [dp[amount], usedCoins];
}

console.log(coinChange([1, 2, 5], 11));
console.log(coinChange([1, 3, 4], 6));
console.log(coinChange([2], 9));
