var searchRange = function(nums, target) {
  let res = [-1, -1];
  let lo = 0,
      hi = nums.length - 1;
  if (nums.length < 1) {
      return res;
  }
  while (lo < hi) {
      const mid = Math.floor(lo + (hi - lo) / 2);
      if (nums[mid] < target) {
          lo = mid + 1;
      } else if (nums[mid] >= target) {
          hi = mid;
      }
  }
  if (nums[lo] !== target) {
    return res;
  }
  res[0] = lo;
  hi = nums.length;

  while (lo < hi) {
    const mid = Math.floor(lo + (hi - lo) / 2);
    if (nums[mid] <= target) {
        lo = mid + 1;
    } else if (nums[mid] > target) {
        hi = mid;
    }
  }

  res[1] = lo - 1;
  return res;
}

var searchRange = (nums, target) => {
  let res = [-1, -1];
  if (nums.length < 1) {
    return res;
  }

  const _searchLeft = (nums, target, lo = 0, hi = nums.length - 1) => {
    while (lo < hi) {
      const mid = Math.floor(lo + (hi - lo) / 2);
      if (nums[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }

    return lo;
  };
  const _searchRight = (nums, target, lo = 0, hi = nums.length - 1) => {
    while (lo < hi) {
      const mid = Math.floor(lo + (hi - lo) / 2);

      if (nums[mid] > target) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    return lo - 1;
  };

  const leftIndex = _searchLeft(nums, target);
  if (nums[leftIndex] !== target) {
    return res;
  }
  res[0] = leftIndex;
  const rightIndex = _searchRight(nums, target, 0, nums.length);
  res[1] = rightIndex;
  return res;
}
// [1,1,2,2,3], 5
console.log(searchRange([1], 1));