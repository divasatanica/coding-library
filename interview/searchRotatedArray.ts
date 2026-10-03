function search(
  nums: number[],
  target: number,
  l = 0,
  r = nums.length - 1,
): number {
  if (l > r) {
    return -1;
  }
  const mid = Math.floor((l + r) / 2);
  const midNum = nums[mid];
  const left = nums[l];
  const right = nums[r];

  if (midNum === target) {
    return mid;
  }

  if (left <= midNum) {
    if (left <= target && target <= midNum) {
      return binarySearch(nums, target, l, mid - 1);
    }
    return search(nums, target, mid + 1, r);
  } else {
    if (midNum <= target && target <= right) {
      return binarySearch(nums, target, mid + 1, r);
    }
    return search(nums, target, l, mid - 1);
  }

  return -1;
}

function binarySearch(
  nums: number[],
  target: number,
  l = 0,
  r = nums.length - 1,
): number {
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    const num = nums[mid];
    if (num < target) {
      l = mid + 1;
    } else if (num === target) {
      return mid;
    } else {
      r = mid - 1;
    }
  }

  return -1;
}

const test1 = [4, 5, 6, 7, 8, 9, 0, 1, 2, 3];
console.log(search(test1, 10));
console.log(search(test1, 4));

console.log(search([1, 3], 3));
console.log(search([1], 1));
