const { MaxHeap } = require('./ctor');

function getAMaxHeap (arr) {
    let maxHeap = new MaxHeap();

    arr.forEach(item => maxHeap.add(item));

    return maxHeap;
}

module.exports = {
    getAMaxHeap
};