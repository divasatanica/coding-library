/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var updateMatrix = function(matrix) {
    const rows = matrix.length;
    if (rows === 0) {
        return [];
    }
    const cols = matrix[0].length;
    const dx = [0, -1, 0, 1];
    const dy = [1, 0, -1, 0];
    const queue = [];

    for (let i = 0; i < rows; i ++) {
        for (let j = 0; j < cols; j ++) {
            if (matrix[i][j] === 0) {
                queue.push([i, j, 0]);
            }
        }
    }

    while (queue.length) {
        const [x, y, dis] = queue.shift();

        if (x < 0 || x >= rows || y < 0 || y >= cols || matrix[x][y] >= 2) {
            continue;
        }

        if (matrix[x][y] === 1) {
            matrix[x][y] = dis;
        }

        matrix[x][y] = 2 + matrix[x][y];
        

        for (let i = 0; i < 4; i ++) {
            const newX = x + dx[i];
            const newY = y + dy[i];
            if (newX < 0 || newX >= rows || newY < 0 || newY >= cols || matrix[newX][newY] === 0) {
                continue;
            }
            queue.push([newX, newY, dis + 1]);
        }
    }

    for (let i = 0; i < rows; i ++) {
        for (let j = 0; j < cols; j ++) {
            if (matrix[i][j] >= 2) {
                matrix[i][j] -= 2;
            }
        }
    }

    return matrix;
};

var updateMatrix = function(matrix) {
    const rows = matrix.length;
    if (rows === 0) {
        return [];
    }
    const cols = matrix[0].length;
    const result = Array.from({ length: rows }).map(() => Array.from({ length: cols }).map(() => Number.MAX_VALUE));

    for (let i = 0; i < rows; i ++) {
        for (let j = 0; j < cols; j ++) {
            if (matrix[i][j] === 0) {
                result[i][j] = 0;
            }
        }
    }

    for (let i = 0; i < rows; i ++) {
        for (let j = 0; j < cols; j ++) {
            if (i - 1 >= 0) {
                result[i][j] = Math.min(result[i][j], result[i-1][j] + 1);
            }
            if (j - 1 >= 0) {
                result[i][j] = Math.min(result[i][j], result[i][j-1] + 1);
            }
        }
    }

    for (let i = rows - 1; i >= 0; i --) {
        for (let j = cols - 1; j >= 0; j --) {
            if (i + 1 < rows) {
                result[i][j] = Math.min(result[i][j], result[i+1][j] + 1);
            }
            if (j + 1 < cols) {
                result[i][j] = Math.min(result[i][j], result[i][j+1] + 1);
            }
        }
    }

    return result;
}

console.log(updateMatrix([[0,0,0],[0,1,0],[1,1,1]]))