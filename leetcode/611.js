/**
 * @param {number[]} nums
 * @return {number}
 */
var triangleNumber = function(nums) {
    let res = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0, len = nums.length; i < len - 2; i ++) {
        let k = i + 2;
        for (let j = i + 1; j < len - 1 && nums[i] !== 0; j ++) {
            while (k < len && nums[i] + nums[j] > nums[k]) {
                k ++;
            }
            res += k - j - 1;
        }
    }

    return res;
};