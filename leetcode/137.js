/**
 * @param {number[]} nums
 * @return {number}
 */
 var singleNumber = function(nums) {
  return split(nums)
};

function swap (arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function split (arr, start = 0, end = arr.length - 1) {
  if (start === end) {
    return arr[start];
  }
  let pivot = Math.floor(start + Math.random() * (end - start));
  swap(arr, start, pivot);
  pivot = start;
  let p = start;
  let q = end;

  while (p < q) {
    while (p < q && arr[q] > arr[pivot]) {
      q --;
    }
    while (p < q && arr[p] <= arr[pivot]) {
      p ++;
    }
    swap(arr, p, q);
  }

  swap(arr, p, pivot);

  const leftLength = Math.abs(p - pivot) + 1;

  if (leftLength % 3) {
    return split(arr, start, p);
  } else {
    return split(arr, p + 1, end);
  }
}

// const a = [100, 100, 0, 100, 0, 0, 1];
const a = [30000,500,100,30000,100,30000,100];
console.log(singleNumber(a));