function quickSort (arr, begin = 0, end = arr.length - 1) {
    if (begin >= end) {
        return;
    }
    let left = begin,
        right = end,
        pivot = Math.floor(begin + Math.random() * (end - begin));
    swap(arr, begin, pivot);
    pivot = begin;
    while (left < right) {
        while (left < right && arr[right] >= arr[pivot]) {
            right --;
        }
        while (left < right && arr[left] <= arr[pivot]) {
            left ++;
        }
        swap(arr, left, right);
    }
    swap(arr, pivot, left);
    quickSort(arr, begin, left - 1);
    quickSort(arr, left + 1, end);
}

function swap (arr, a, b) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

function cmp (a, b) {
    return a < b ? -1 : (a === b ? 0 : 1);
}

let date = new Date();
let arr = Array.from({length: 3}).fill([4, 2, 1, 3, 6, 9, 10]).reduce((acc, curr) => acc.concat(curr), []);
console.log(arr.length);
quickSort(arr);
console.log(arr);

// console.log(arr);
console.log("Time used:", new Date - date);