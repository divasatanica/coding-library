/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function(matrix, target) {
    const n = matrix.length;
    const m = matrix[0].length;

    if (target < matrix[0][0]) {
        return -1;
    }

    let low = 0,
        high = m - 1;
    let col = [];

    while (low <= high) {
        let mid = high + Math.floor((low - high) / 2);

        let midFirst = matrix[0][mid];

        if (target < midFirst) {
            high = mid - 1;
        } else if (target > midFirst) {
            if (mid === low) {
                for (let i = low; i <= high; i ++) {
                    col.push(i);
                }
                break;
            }
            low = mid;
        } else {
            console.log(`Found at (0, ${mid})`);
            return true;
        }
    }

    if (col.length < 1) {
        col = [low];
    }

    for (let i = 0, len = col.length; i < len; i ++) {
        low = 0;
        high = n - 1;
        while (low <= high) {
            let mid = high + Math.floor((low - high) / 2);
    
            let midFirst = matrix[mid][col[i]];
    
            if (target < midFirst) {
                high = mid - 1;
            } else if (target > midFirst) {
                low = mid + 1;
            } else {
                console.log(`Found at (${mid}, ${col[i]})`);
                return true;
            }
        }
    }

    return false;
};


/**
 * 从右上角开始查找，若当前数字比 target 小，则往下一行，若当前数字比 target 大，则往左一列
 * @returns { Boolean }
 */
var findNumberIn2DArray = function(matrix, target) {
    if (matrix.length < 1) {
        return false;
    }
    const n = matrix.length;
    const m = matrix[0].length;

    if (m === 0) {
        return false;
    }

    if (target < matrix[0][0]) {
        return false;
    }

    let row = 0,
        col = m - 1;

    while (row <= n - 1 && col >= 0) {
        if (matrix[row][col] === target) {
            return true;
        }
        if (matrix[row][col] > target) {
            col -= 1;
        } else {
            row += 1;
        }
    }

    return false;
};

console.log(findNumberIn2DArray([[-5]], -10));