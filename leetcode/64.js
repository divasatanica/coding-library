/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    const m = grid.length;
    if (m === 0) {
        return 0;
    }
    const n = grid[0].length;
    let res = grid[0][0];

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            let min;
            if (i === 0 && j === 0) {
                min = grid[i][j];
            } else if (i === 0) {
                min = grid[i][j-1] + grid[i][j];
            } else if (j === 0) {
                min = grid[i-1][j] + grid[i][j];
            } else {
                min = Math.min(grid[i-1][j], grid[i][j-1]) + grid[i][j];
            }
            grid[i][j] = min;
            res += min;
        }
    }

    return grid[m-1][n-1];
};

console.log(minPathSum(
    [[1,3,5,2],[1,7,1,4],[4,2,8,3]]
));