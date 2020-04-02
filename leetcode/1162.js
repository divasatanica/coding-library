/**
 * 中心思想：如果船到达了某个未访问过的海洋，那他们是第一个到这片海洋的。很明显，这么多船最后访问到的海洋，肯定是离陆地最远的海洋。
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    const queue = [];
    let res = -1,
        hasOcean = false,
        point = null;

    for (let i = 0; i < rows; i ++) {
        for (let j = 0; j < cols; j ++) {
            if (grid[i][j] === 1) {
                queue.push([i, j]);
            }
        }
    }

    while (queue.length) {
        point = queue.shift();
        const [x, y] = point;

        for (let i = 0; i < 4; i ++) {
            let newX = x + dx[i];
            let newY = y + dy[i];

            if (newX >= cols || newY >= rows || newX < 0 || newY < 0 || grid[newX][newY] !== 0) {
                continue;
            }
            hasOcean = true;
            grid[newX][newY] = grid[x][y] + 1;
            queue.push([newX, newY]);
        }
    }

    if (point && hasOcean) {
        res = grid[point[0]][point[1]] - 1;
    }

    return res;
};

console.log(maxDistance([[1,0,1],[0,0,0],[1,0,1]]));