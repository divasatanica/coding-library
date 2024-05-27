/**
 * 5.21 Coding Interview
 * 
 * 给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。
    candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。 
    对于给定的输入，保证和为 target 的不同组合数少于 150 个。
    示例 1：
    输入：candidates = [2,3,6,7], target = 7
    输出：[[2,2,3],[7]]
    解释：
    2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
    7 也是一个候选， 7 = 7 。
    仅有这两种组合。

    示例 2：
    输入: candidates = [2,3,5], target = 8
    输出: [[2,2,2,2],[2,3,3],[3,5]]

    示例 3：
    输入: candidates = [2], target = 1
    输出: []
 */

// 1. Candidates 无序 / 全是正数
// 2. 排序后，若 target 或最接近且小于 target 的数索引为 index， 则可选取的数范围为 [0, index]
// 3. 无限制重复被选取，那么意味着一个数还可以再被拆分，可能需要递归去执行同样的操作
// 4. 抽象成一个将某个数拆分成n个数的和的过程，在拆分过程中，每个数还得继续拆，直到无法再拆

function solution(candidates, target) {
  if (candidates.length === 0 || target === 0) {
    return [];
  }

  // 先进行一个排序，为了不能影响原数组，copy一个数组出来
  const _candidates = [...candidates];
  // 升序排列
  _candidates.sort((a, b) => a - b);

  return JSON.stringify(_solution(candidates, target));

  function _solution(candidates, target, start = 0, end = candidates.length - 1) {
    if (candidates.length === 0 || target <= 0) {
      return [];
    }
  
    // 找到 target 的索引
    let targetIndex = -1;
  
    for (let i = 0; i <= end; i ++) {
      // 找到 target 或最接近且小于 target 的数的索引
      if (_candidates[i] <= target) {
        targetIndex = i;
      } else {
        break;
      }
    }

    // 递归收敛条件
    // 当剩下的数组无法再拆的时候
    // 递归便退出了
    if (targetIndex < 0) {
      return [];
    }
  
    const result = [];
  
    _candidates.forEach(value => {
      // 如果 value 就是 target
      // 单独推入一条记录
      if (target - value === 0) {
        result.push([value]);
        return;
      }

      // 对 target-value 进行拆分
      const subResult = _solution(_candidates, target - value, 0, targetIndex);

      if (subResult.length === 0) {
        return;
      }

      // 这里是对 target - value 的拆分结果
      // 需要一一推入 result
      subResult.forEach(item => {
        result.push([value, ...item]);
      });
    });


    // 这里是去重过程
    // 将重复的组合剔除后返回
    const newSet = new Set();

    result.forEach(item => {
      item.sort((a, b) => a - b);
      newSet.add(item.toString());
    });

    // console.log('Unique:', newSet);

    return [...newSet].map(i => i.split(',').map(Number));
  }
}

console.log('1', solution([2,3,6,7], 7));
console.log('2', solution([2,3,5], 8));
console.log('3', solution([2], 1));
console.log('4', solution([2,3,5], 11));
