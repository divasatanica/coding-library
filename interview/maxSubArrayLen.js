var maxSubarrayLen = function (nums, k) {
  let l = 0;
  let r = 0;
  let max = 0;
  let res = 0;

  while (r < nums.length) {
    while (res <= k) {
      const len = r - l;
      max = Math.max(max, len);
      res += nums[r];
      r += 1;
    }

    while (res > k && l < r) {
      res -= nums[l];
      l += 1;
    }
  }

  return max;
};

console.log(maxSubarrayLen([1, 2, 3, 4, 5], 10));
