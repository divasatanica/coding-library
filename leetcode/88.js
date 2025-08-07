/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let k = m + n - 1;

  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }

  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }

  return nums1;
}

function swap(nums, i, j) {
  const tmp = nums[i];
  nums[i] = nums[j];
  nums[j] = tmp;
}

function swapAcross(nums1, i, nums2, j) {
  const tmp = nums1[i];
  nums1[i] = nums2[j];
  nums2[j] = tmp;
}

console.log(1);
// console.log(merge([1, 2, 3, 0, 0, 0], 3, [4, 5, 6], 3));
console.log(merge([1, 2, 3, 4, 0, 0, 0], 4, [2, 4, 6], 3));
