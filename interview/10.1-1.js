var minSubarrayLen = function (nums, k) {
  let l = 0,
    r = 0;
  let min = Number.MAX_SAFE_INTEGER;

  let res = 0;
  while (r < nums.length) {
    console.log("res1", res, "k", k, "l", l, "r", r);

    if (res < k) {
      while (res < k) {
        res += nums[r];
        r += 1;

        console.log("res3", res, "k", k, "l", l, "r", r);
      }
    }

    while (res >= k && l < r) {
      console.log("res2", res, "k", k, "l", l, "r", r);
      const len = r - l;
      min = Math.min(min, len);
      res -= nums[l];
      l += 1;
    }
  }

  const result = min === Number.MAX_SAFE_INTEGER ? 0 : min;

  console.log("result", result);
  return result;
};

minSubarrayLen([2, 3, 1, 2, 4, 3], 7);
