/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  if (nums.length <= 1) {
    return nums.length;
  }

  const consecutive = new Set();
  let max = 0;

  nums.forEach((n) => consecutive.add(n));

  for (const [_, value] of consecutive.entries()) {
    if (!consecutive.has(value - 1)) {
      let current = value;
      let count = 1;

      while (consecutive.has(current + 1)) {
        current += 1;
        count += 1;
      }

      if (count > max) {
        max = count;
      }
    }
  }

  return max;
};

console.log(longestConsecutive([100, 4, 200, 1, 3, 2])); // Output: 4
