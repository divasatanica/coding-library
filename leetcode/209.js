/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let right = 0;
  let min = Number.MAX_SAFE_INTEGER;
  let sum = 0;

  while (right <= nums.length) {
    if (sum < target) {
      sum += nums[right];
      right += 1;
    } else {
      while (sum >= target) {
        const length = right - left;
        if (length < min) {
          min = length;
        }
        sum = sum - nums[left];
        left += 1;
      }
      sum = sum + nums[right];
      right += 1;
    }
  }

  if (min === Number.MAX_SAFE_INTEGER) {
    return 0;
  }

  return min;
};

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen1 = function (target, nums) {
  let left = 0;
  let right = 0;
  let min = Number.MAX_SAFE_INTEGER;

  while (right <= nums.length) {
    let sum = getSum(nums, left, right);

    if (sum < target) {
      right += 1;
    } else {
      while (sum >= target) {
        const length = right - left;
        if (length < min) {
          min = length;
        }
        left += 1;
        sum = getSum(nums, left, right);
      }
      right += 1;
    }
  }

  if (min === Number.MAX_SAFE_INTEGER) {
    return 0;
  }

  return min;
};

function getSum(nums, left, right) {
  let sum = 0;
  for (let i = left; i < right; i++) {
    sum += nums[i];
  }

  return sum;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));
console.log(minSubArrayLen(4, [1, 4, 4]));

const nums = JSON.parse(require("fs").readFileSync("./209.json", "utf-8"));
const target = 396893380;

console.log("nums", nums.length);

console.time("minSubArrayLen1");
console.log(minSubArrayLen1(target, nums));
console.timeEnd("minSubArrayLen1");

console.time("minSubArrayLen");
console.log(minSubArrayLen(target, nums));
console.timeEnd("minSubArrayLen");
