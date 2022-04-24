/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permute = function(nums) {
  const map = new Map();
  const res = [];
  const MAX_NUM = nums.length;

  dfs([]);

  console.log(res);
  return res;

  function dfs(acc) {
    if (acc.length >= MAX_NUM) {
      if (map.has(acc)) {
        return;
      }
      res.push(acc);
      return;
    }

    for (let i = 0, len = nums.length; i < len; i ++) {
      if (acc.indexOf(nums[i]) > -1) {
        continue;
      }
      dfs([...acc, nums[i]], nums[i]);
    }
  }
};


permute([0, -1, 1]);