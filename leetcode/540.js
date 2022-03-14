let debug = false;

var singleNonDuplicate = function(nums) {
  /**
   * 排好序的数组中,假设没有单独的数出现,设 x 为奇数,指向偶数位置
   * 那么满足:
   * 1. x 和 x - 1 相等
   * 2. x 和 x + 1 不相等
   * 若插入一个单独的数,因为插入位置被平移,以上规律会被破坏
   * 思路就是以 mid 为中轴线,判断是左侧还是右侧的规律被破坏
   */
   if (nums.length < 2) {
    return nums[0];
  }

  let lo = 0;
  let hi = nums.length - 1;
  let mid = Math.floor(lo + ((hi - lo) / 2));

  while (lo <= hi) {
    mid = Math.floor(lo + ((hi - lo) / 2));
    let _mid = mid;

    // 如果是 lo === hi - 1 的情况,即最终范围收缩到两个数的其中一个数时,记为 [a, b]
    if (lo === hi - 1) {
      // 如果搜索到答案在左侧,那么返回 a
      if (mid < Math.floor(nums.length / 2)) {
        return nums[lo];
      }
      // 如果搜索到答案在右侧,那么返回 b
      return nums[hi];
    }

    /**
     * 将 mid 指针指向数组的奇偶位置两种情况来区分讨论
     */
    if (mid % 2 === 0) {
      // mid 是偶数,指向奇数位置,那么比较 mid 和 mid - 1 
      if (nums[mid] === nums[mid - 1]) {
        // mid 和 mid - 1 不相等, 左侧的数字排列规律被破坏, 说明单独的数在左侧
        hi = mid;
      } else if (nums[mid + 1] && nums[mid] !== nums[mid + 1]) {
        // mid 和 mid + 1 不相等,说明 mid 就是那个单独的数
        return nums[mid];
      } else if (nums[mid + 1] && nums[mid] === nums[mid + 1]) {
        // mid 和 mid + 1 相等,说明 mid 左边的数字排列规律没有被破坏,单独的数在右边
        lo = mid;
      }
    } else {
      // mid 是奇数,指向偶数位置,同样先比较 mid 和 mid - 1 (就是和偶数情况反过来)
      if (nums[mid] !== nums[mid - 1]) {
        // mid 和 mid - 1 不相等, 左侧的数字排列规律被破坏, 说明单独的数在左侧
        hi = mid;
      } else if (nums[mid + 1] && nums[mid] === nums[mid + 1]) {
        // mid 和 mid + 1 相等,说明 mid 就是那个单独的数
        return nums[mid];
      } else if (nums[mid + 1] && nums[mid] !== nums[mid + 1]) {
        // mid 和 mid + 1 相等,说明 mid 左边的数字排列规律没有被破坏,单独的数在右边
        lo = mid;
      }
    }
  }

  return nums[mid];
};

console.log(singleNonDuplicate([1,1,2,3,3,4,4,8,8]));
console.log(singleNonDuplicate([3,3,6,6,7,7,8,8,10,10,11,12,12]));
console.log(singleNonDuplicate([1,2,2,3,3,4,4]));
console.log(singleNonDuplicate([3,3,6,6,7,7,10]));
console.log(singleNonDuplicate([3,3,4,4,5,6,6,7,7]));