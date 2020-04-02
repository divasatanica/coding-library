/**
 * 用一个固定指针 i 遍历数组，此时问题变为两数之和的问题
 * 用另外两个指针 j、k 去搜索剩下的数组中符合结果的值，移动 i 时注意
 * 若当前值和前一个值相等，则直接跳过避免出现重复结果
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let result = [];
    if (nums.length < 3) {
        return result;
    }
    let i = 0,
        j = nums.length - 1,
        k = 1;

    nums.sort((a, b) => a - b);

    while (i < nums.length) {
        const twoSum = -nums[i];

        if (twoSum < 0) {
            return result;
        }
        if (i > 0 && nums[i] === nums[i - 1]) {
            i ++;
            continue;
        }

        k = i + 1;
        j = nums.length - 1;
        while (k < j) {
            const sum = nums[k] + nums[j];

            if (sum > twoSum) {
                j --;
            } else if (sum < twoSum) {
                k ++;
            } else {
                const subResult = [nums[i], nums[k], nums[j]];
                result.push(subResult);
                let tmpK = nums[k],
                    tmpJ = nums[j];
                while (nums[k] === tmpK) {
                    k ++;
                }
                while (nums[j] === tmpJ) {
                    j --;
                }
            }
        }

        i ++;
    }

    return result;
}

console.log(threeSum([3,0,-2,-1,1,2, 4,4,-8,16,8,8,-1,-1,0]));