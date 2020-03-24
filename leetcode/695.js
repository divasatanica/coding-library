/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
    const m = grid.length;
    if (m < 1) {
        return 0;
    }
    const n = grid[0].length;
    const queue = [];
    let result = 0;

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            let count = 0;
            queue.push([i, j]);
            while (queue.length) {
                const [i, j] = queue.shift();
        
                if (i < 0 || j < 0 || i === m || j === n || grid[i][j] !== 1) {
                    continue;
                }
                count ++;
                grid[i][j] = 0;
                [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(item => {
                    const [di, dj] = item;
        
                    queue.push([i + di, j + dj]);
                });
            }
            result = Math.max(count, result);
        }
    }

    return result;
    
};

console.log(maxAreaOfIsland(
    [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]));