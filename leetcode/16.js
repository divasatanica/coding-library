/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    let res = Number.MAX_VALUE;
    if (nums.length < 3) {
        return result;
    }
    let i = 0,
        j = nums.length - 1,
        k = 1;

    nums.sort((a, b) => a - b);

    while (i < nums.length) {
        const twoSum = target - nums[i];

        if (i > 0 && nums[i] === nums[i - 1]) {
            i ++;
            continue;
        }

        k = i + 1;
        j = nums.length - 1;
        while (k < j) {
            const sum = nums[k] + nums[j];
            if (Math.abs(nums[i] + sum - target) < Math.abs(res - target)) {
                res = Math.abs(nums[i] + sum - target);
            }

            if (sum > twoSum) {
                j --;
            } else if (sum < twoSum) {
                k ++;
            } else {
                return target;
            }
        }

        i ++;
    }

    return res;
};

console.log(threeSumClosest([0, 0,0], 1))