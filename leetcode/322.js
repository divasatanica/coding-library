/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    if (coins.length < 1) {
        return -1;
    }

    let memory = {
        0: 0
    };
    for (let i = 1; i <= amount; i ++) {
        let min = Number.MAX_VALUE;
        for (let j = 0; j < coins.length; j ++) {
            if (i - coins[j] >= 0 && memory[i - coins[j]] <  min) {
                min = memory[i - coins[j]] + 1;
            }
        }
        memory[i] = min;
    }

    return (memory[amount] === Number.MAX_VALUE) ? -1 : memory[amount];
};

console.log(coinChange([186,419,83,408], 6249));