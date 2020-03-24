/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var movingCount = function(m, n, k) {
    const queue = [[0, 0, 0, 0]];
    const map = {};
    let count = 0;

    while (queue.length) {
        const [i, j, si, sj] = queue.pop();
        if (i < 0 || i >= m || j < 0 || j >= n || k < si + sj || map[`${i}-${j}`] === true) {
            continue;
        }
        map[`${i}-${j}`] = true;
        count ++;
        queue.push([i + 1, j, (((i + 1) % 10) ? si + 1 : si - 8), sj]);
        queue.push([i, j + 1, si, (((j + 1) % 10) ? sj + 1 : sj - 8)]);
    }

    return count;
};