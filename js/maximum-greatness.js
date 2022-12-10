// Maximum greatness

// 1. Sort the arr and collect the numbers in arr and calculate appearance counts for every number into a map 
// 2. Collect the last index of every number in sorted arr.
// 3. Go through the original arr and rearrange by the following rule:
//  a. When it comes to arr[i], try to find the minimum number M in map which is greater than arr[i].
//  b. If M not found, use the minimum available number as the rearranged element.

/**
 * 
 * @param {Array<number>} arr 
 * @returns 
 */
 function solution(arr) {
  let result = 0;
  const indexMap = {};
  const countMap = {};
  const [..._arr] = arr;

  const sortedArr = _arr.sort((a, b) => a - b);

  for (let i = 0, len = sortedArr.length; i <= len; i ++) {

    const num = sortedArr[i];
    const lastNum = sortedArr[i - 1];

    if (num != null) {
      if (countMap[num] == null) {
        countMap[num] = 1;
      } else {
        countMap[num] = countMap[num] + 1;
      }
    }
    
    if (lastNum == null) {
      continue;
    }

    if (num === lastNum) {
      continue;
    }

    indexMap[lastNum] = i - 1;
  }

  console.log('Sorted', _arr);

  const rearrangedArr = [];
  for (let j = 0, len = arr.length; j < len; j ++) {
    console.log('---start loop---');
    const originalNum = arr[j];
    console.log('Original number is', originalNum);
    const originalNumLastSortedIndex = indexMap[originalNum];
    console.log('original num sorted last index', originalNumLastSortedIndex);
    let nearestGreaterNum;
    let q = originalNumLastSortedIndex;
    while (q < arr.length) {
      nearestGreaterNum = sortedArr[q + 1];
      console.log('minimum greater num might be', nearestGreaterNum);
      if (nearestGreaterNum && countMap[nearestGreaterNum] > 0) {
        console.log('minimum greater num found', nearestGreaterNum);
        break;
      }

      console.log('start to find next nearest greater num', nearestGreaterNum);
      const currentNearestGreaterNumIndex = indexMap[nearestGreaterNum];
      q = currentNearestGreaterNumIndex;
    }
    
    

    if (nearestGreaterNum && countMap[nearestGreaterNum] > 0) {
      console.log('has minimum greater num', nearestGreaterNum, 'for', originalNum);
      rearrangedArr[j] = nearestGreaterNum;
      result += 1;
      countMap[nearestGreaterNum] = countMap[nearestGreaterNum] - 1;
    } else {
      console.log('minimum greater num not exist for', originalNum);
      let k = 0;
      while (k < arr.length) {
        const minimumNum = sortedArr[0];
        if (countMap[minimumNum] > 0) {
          countMap[minimumNum] = countMap[minimumNum] - 1;
          rearrangedArr[j] = minimumNum;
          console.log('use minimum number', minimumNum, 'exist for', originalNum);
          break;
        } else {
          const currentMinimumNumLastIndex = indexMap[minimumNum];
          k = currentMinimumNumLastIndex + 1;
        }
      }
    }
    console.log('---end loop---');
  }



  return [
    result,
    rearrangedArr
  ]
}


console.log(solution([1,3,5,2,1,3,1]));