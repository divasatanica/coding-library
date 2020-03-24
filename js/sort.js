function sort(arr) {
    for (let i = 0, len = arr.length; i < len; i ++) {
        for (let j = i; j < len; j ++) {
            if (arr[i] > arr[j]) {
                let tmp = arr[i];
                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
    }

    return arr;
}

console.log(sort([5,4,10,9,6,3,2,1]));