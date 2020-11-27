/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];

    let r = 0;

    while (r < intervals.length) {
        const mergeResult = mergeTwo(intervals[r], merged[merged.length - 1]);

        if (mergeResult.length === 1) {
            merged.pop();
            merged.push(...mergeResult);
            r ++;
            continue;
        }
        merged.push(mergeResult[1]);
        r ++;
    }

    return merged;
};

function mergeTwo(a, b = a) {
    if (a[0] > b[0]) {
        let tmp = a;
        a = b;
        b = tmp;
    }
    const [aStart, aEnd] = a;
    const [bStart, bEnd] = b || a;

    if (aEnd >= bStart) {
        if (aEnd >= bEnd) {
            return [[Math.min(aStart, bStart), aEnd]];
        }
        return [[aStart, bEnd]];
    }

    return [a, b];
}

console.log(merge([[1,3],[2,6],[8,10],[15,18]]));