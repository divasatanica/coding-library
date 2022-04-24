/**
 * @param {number[]} nums
 * @return {number}
 */
 var findMaxLength = function(nums) {
  let sum = 0;
  let max = 0;
  let lastResetIndex = 0;
  let count = 0;
  const map = new Map();

  map.set(0, -1);
  for (let i = 0, len = nums.length; i < len; i ++) {
    const num = nums[i];

    count += nums[i] ? 1 : -1;

    // console.log('Count:', count, i);

    if (map.has(count)) {
      const prevIndex = map.get(count);
      max = Math.max(max, i - prevIndex);
    } else {
      map.set(count, i);
    }
  }

  console.log(max, sum);
  console.log('============ RESULT:', max);
  return max;
};

findMaxLength([1,1,0,0,1,0,1]);
findMaxLength([1,1,1]);
findMaxLength([0,1,1,0])
findMaxLength([0,1,1,0,1,1,1,0]);

findMaxLength([0,0,0,1,1,1,0]);
findMaxLength([0,0,1,0,0,0,1,1]);