/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
    const m = board.length;
    if (m === 0) {
        return board;
    }
    const n = board[0].length;
    if (n === 0) {
        return board;
    }
    let dxy = [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1]
    ];
    const queue = [];
    
    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            let val = board[i][j];
            let roundVal = 0;
            dxy.forEach(item => {
                const [dx, dy] = item;
                queue.push([i + dx, j + dy]);
            });
            while (queue.length) {
                const [x, y] = queue.shift();
                if (x < 0 || y < 0 || x >= m || y >= n) {
                    continue;
                }
                roundVal += (board[x][y] & 1);
            }
            if (val === 1) {
                if (roundVal < 2) {
                    board[i][j] = 1; // 01
                } else if (roundVal === 2 || roundVal === 3) {
                    board[i][j] = 3; // 11
                } else {
                    board[i][j] = 1; // 01
                }
            } else if (val === 0) {
                if (roundVal === 3) {
                    board[i][j] = 2; // 10
                } else {
                    board[i][j] = 0; // 00
                }
            }
        }
    }

    for (let i = 0; i < m; i ++) {
        for (let j = 0; j < n; j ++) {
            board[i][j] = board[i][j] >> 1;
        }
    }

    return board;
};

console.log(gameOfLife([[0,1,0],[0,0,1],[1,1,1],[0,0,0]]))