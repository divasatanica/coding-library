/**
 * 滑动窗口，和大于 target 时，移动窗口左端，和小于 target 移动窗口右端
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function(target) {
    let result = [];
    for (let l = 1, r = 1; r <= target; r ++) {
        let sum = ((l + r) * (r - l + 1)) / 2;

        if (sum === target && r - l > 0) {
            let tmp = [];
            for (let i = l; i <= r; i ++) {
                tmp.push(i);
            }
            result.push(tmp);
        }

        if (sum < target) {
            while (l < r && sum < target) {
                r ++;
                sum = ((l + r) * (r - l + 1)) / 2;

                if (sum === target && r - l > 0) {
                    let tmp = [];
                    for (let i = l; i <= r; i ++) {
                        tmp.push(i);
                    }
                    result.push(tmp);
                }
            }
        }
        
        if (sum > target) {
            while (l < r && sum > target) {
                l ++;
                sum = ((l + r) * (r - l + 1)) / 2;

                if (sum === target && r - l > 0) {
                    let tmp = [];
                    for (let i = l; i <= r; i ++) {
                        tmp.push(i);
                    }
                    result.push(tmp);
                }
            }
        }
    }

    return result;
};