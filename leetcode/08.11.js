/**
 * @param {number} n
 * @return {number}
 */
var waysToChange = function(n) {
    const coins = [1, 5, 10, 25];
    const dp = Array.from({ length: n + 1 }).fill(1);
    for (let i = 1; i < 4; i ++) {
        for (let j = 1; j <= n; j ++) {
            if (j - coins[i] >= 0) {
                dp[j] = (dp[j] + dp[j - coins[i]]) % (1e9 + 7);
            }
        }
    }

    return dp[n];
};

console.log(waysToChange(5));