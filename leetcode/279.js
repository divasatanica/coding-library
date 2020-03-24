/**
 * 自底向上的动态规划
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    let memory = {
        0: 0
    };

    for (let i = 1; i <= n; i ++) {
        let min = Number.MAX_VALUE;
        for (j = 1; j * j <= i; j ++) {
            if (memory[i - j * j] < min) {
                min = memory[i - j * j];
            }
        }
        memory[i] = min + 1;
    }

    return memory[n];
};


/**
 * BFS 广度优先搜索
 */
var numSquares = function(n) {
    const queue = [
        [n, 0]
    ];
    const map = new Set();
    map.set(n, true);
    while (queue.length) {
        let [num, step] = queue.shift();
        for (let i = 1; ; i ++) {
            let rest = num - i * i;
            if (rest < 0) {
                break;
            }
            if (rest === 0) {
                return step + 1;
            }
            if (!map.has(rest)) {
                queue.push([rest, step + 1]);
                map.set(rest, true);
            }
        }
    }
}