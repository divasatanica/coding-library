function maxSumArray (arr) {
  let l = 0;
  let r = 0;
  let maxSumMap = {};
  let res = 0;
  let max = arr[0];
  let minKey = -Number.MAX_VALUE;

  while (r < arr.length) {
    const num = arr[r];

    if (res + num >= num) {
      res = res + num;
      
      max = Math.max(max, res);
      if (res > minKey) {
        delete maxSumMap[minKey]
        maxSumMap[res] = `${l},${r}`
        minKey = max
      }
      r ++;
    } else {
      res = 0;
      l = r;
    }
  }  

  console.log(maxSumMap)

  const [start, end] = maxSumMap[max].split(',').map(Number);
  const result = arr.slice(start, end + 1);
  console.log(result, max)
  return result;
}

var a = [-2,1,-3,4,-1,2,1,-5,4]
var b = [5,4,-1,7,8]
var c = [-2,3,4,-1,5,-3,5,6,7]
maxSumArray(a);