/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var permuteUnique = function(nums) {
  const map = new Map();
  const res = [];
  const MAX_NUM = nums.length;
  const vis = [];
  
  nums.sort((a, b) => a - b);

  dfs(0, []);

  console.log(res);
  return res;

  function dfs(index, acc) {
    if (index >= MAX_NUM) {
      res.push([...acc]);

      return;
    }

    for (let i = 0; i < MAX_NUM; i ++) {
      if (vis[i] || i > 0 && nums[i] == nums[i - 1] && !vis[i - 1]) {
        continue;
      }

      acc.push(nums[i]);
      vis[i] = true;
      dfs(index + 1, acc);
      vis[i] = false;
      acc.pop();
    }
  }
};

permuteUnique([1,1,2])