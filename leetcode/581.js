/**
 * @param {number[]} nums
 * @return {number}
 */
var findUnsortedSubarray = function(nums) {
    let high = 0;// 第一个大值不正确的索引
    let low = 1; // 第一个小值不正确的索引
    let maxValue = nums[0];// 记录从左到右的当前最大值
    let minValue = nums[nums.length - 1];// 记录从右到左的当前最小值
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < maxValue) {
            high = i;
        }
        maxValue = Math.max(maxValue, nums[i]);
    }
    for (let i = nums.length - 1; i >= 0; i--) {
        if (nums[i] > minValue) {
            low = i;
        }
        minValue = Math.min(minValue, nums[i]);
    }
    console.log(high-low+1);
    return high - low + 1;
};

// findUnsortedSubarray([2, 6, 4, 8, 10, 9, 15]);
// findUnsortedSubarray([1,2,3,3,3]);
// findUnsortedSubarray([1,3,2,4,5]);
findUnsortedSubarray([4,4,4,3,5])