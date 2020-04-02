/**
 * 利用队列进行 BFS，每次访问完之后将原数组的值改为 0，避免 result 重复计算
 * @param {Number[][]} grid 
 */
var numIslands = function(grid) {
    const m = grid.length;
    if (m < 1) {
        return 0;
    }
    const n = grid[0].length;
    const queue = [];
    let result = 0;

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            queue.push([i, j]);
            if (grid[i][j] == 1) {
                result ++;
            }
            while (queue.length) {
                const [i, j] = queue.shift();
        
                if (i < 0 || j < 0 || i === m || j === n || grid[i][j] != 1) {
                    continue;
                }
                grid[i][j] = 0;
                [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(item => {
                    const [di, dj] = item;
        
                    queue.push([i + di, j + dj]);
                });
            }
        }
    }

    return result;
    
};