const quickSort = require('./quicksort');
class ListNode {
  constructor(val) {
    this.next = null;
    this.val = val;
  }
}

function bucketSort(arr, k = Math.ceil(arr.length / 2), getter = a => a) {
  console.time('BucketSort');
  if (arr.length < 2) {
    return arr;
  }
  const len = arr.length;
  const res = [];
  let max = -Number.MAX_SAFE_INTEGER,
      min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < len; i ++) {
    
    const n = arr[i];
    if (getter(n) < min) {
      min = getter(n);
    }
    if (getter(n) > max) {
      max = getter(n);
    }
  }

  const bucketSize = Math.ceil((max - min) / k);
  for (let i = 0; i < k; i ++) {
    res.push(null);
  }
  for (let i = 0; i < len; i ++) {
    const n = arr[i];
    const bucketIndex = Math.floor(getter(n) / bucketSize);
    const bucket = res[bucketIndex];
    if (!bucket) {
      res[bucketIndex] = new ListNode(n);
    } else {
      let p = bucket
      let q
      while (p && getter(p.val) <= getter(n)) {
        q = p;
        p = p.next;
      }
      if (!p) {
        q.next = new ListNode(n);
      } else if (!q) {
        const node = new ListNode(n);
        node.next = bucket;
        res[bucketIndex] = node;
      } else {
        const node = new ListNode(n);
        q.next = node;
        node.next = p;
      }
    }
  }
  const result = [];
  for (let i = 0, len = res.length; i < len; i ++) {
    let p =  res[i];
    while (p) {
      result.push(p.val);
      p = p.next;
    }
  }
  console.timeEnd('BucketSort');
  return result;
}

function bucketSortWithQuickSort(arr, k = Math.ceil(arr.length / 2), getter = a => a) {
  console.time('BucketSortQuick');
  if (arr.length < 2) {
    return arr;
  }
  const len = arr.length;
  const res = [];
  let max = -Number.MAX_SAFE_INTEGER,
      min = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < len; i ++) {
    
    const n = arr[i];
    if (getter(n) < min) {
      min = getter(n);
    }
    if (getter(n) > max) {
      max = getter(n);
    }
  }

  const bucketSize = Math.ceil((max - min) / k);
  for (let i = 0; i < k; i ++) {
    res.push([]);
  }
  for (let i = 0; i < len; i ++) {
    const n = arr[i];
    const bucketIndex = Math.floor(getter(n) / bucketSize);
    const bucket = res[bucketIndex];
    bucket.push(n);
  }
  const result = [];
  for (let i = 0, len = res.length; i < len; i ++) {
    const bucket = res[i];
    quickSort(bucket);

    for (let j = 0, len = bucket.length; j < len; j ++) {
      result.push(bucket[j]);
    }
  }
  console.timeEnd('BucketSortQuick');
  return result;
}

const a = [1,2,4,6,2,9,22,110,100,15,68,100,115,200];
// const a = [1,2,4,6,2,9,22];
const b = a.map((n, i)=> ({ val: n, index: i }))
let res = [];

for (let i = 0; i < 4e3; i ++) {
  res.push.apply(res, a);
}

console.log(res.length);
let now = Date.now()
bucketSortWithQuickSort(res);
bucketSort(res);
// console.log('BucketSort Used:', Date.now() - now, 'ms');

// now = Date.now()
// quickSort(res);
// console.log('QuickSort Used:', Date.now() - now, 'ms');