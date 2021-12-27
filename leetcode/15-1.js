/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  let res = [];
  if (nums.length < 3) {
    return res;
  }

  for (let i = 0, len = nums.length; i < len; i ++) {
    const n = nums[i];
    const target = 0 - n;

    let result = twoSum(nums, target);
    // console.log(n, result.map(([a, b]) => ({nums: [nums[a], nums[b]], dup: a == i || b == i})));
    if (result.length === 0) {
      continue;
    }

    result = result.filter(([a, b]) => a !== i && b !== i);
    let groups = result.map(item => {
      let items = [n, ...item.map(index => nums[index])];
      items.sort((a, b) => a - b); 
      return items;
    }).map(i => i.toString());

    let _groups = [];

    groups.map((item, index) => {
      if (_groups.indexOf(item) > -1 || res.indexOf(item) > -1) {
        return;
      }

      _groups.push(item);
    })

    res.push(..._groups);
  }

  return res.map(i => i.split(',').map(Number));
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = {};
  let res = [];
  nums.forEach((n, index) => {
    if (map[n]) {
      map[n].push(index);
    } else {
      map[n] = [index];
    }
  });

  for (let i = 0, len = nums.length; i < len; i ++) {
    const n = nums[i];
    const _t = target - n;
    const indexes = map[_t] && map[_t].filter(j => j != i);
    if (!map[_t] || indexes.length < 1) {
      continue;
    }
    
    res.push([i, indexes[0]]);
  }

  return res;
};


console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]))