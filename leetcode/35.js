/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  let mid = 0;
  while (lo <= hi) {
    mid = Math.floor((hi - lo) / 2 + lo);
    const n = nums[mid];
    if (n === target) {
      return mid;
    } else if (n > target) {
      hi = mid - 1;
    } else {
      lo = mid + 1;
    }
  }
  console.log(lo, mid, hi)
  return lo;
};

console.log(searchInsert([1,3,5,6], 7))