function searchInsert(nums: number[], target: number): number {
  let l = 0;
  let r = nums.length - 1;
  let ans = -1;

  while (l <= r) {
    console.log("l", l, "r", r);
    const m = l + Math.floor((r - l) / 2);
    const mid = nums[m];

    if (target === mid) {
      return m;
    }

    if (target > mid) {
      ans = l + 1;
      l = m + 1;
    }

    if (target < mid) {
      console.log("target", target, m, l, r);
      ans = l;
      r = m - 1;
    }
  }

  return ans;
}

console.log(searchInsert([1, 3], 0));
