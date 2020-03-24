const {
    getAMaxHeap
} = require('./make');

let arr = [1, 3, 5, 2, 4, 7];

let heap1 = getAMaxHeap(arr);

console.log(heap1.heap);