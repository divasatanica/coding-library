function knuthShuffle(arr) {
    const getRand = tail => Math.round(Math.random() * tail);
    let tail = arr.length - 1;

    while (tail >= 0) {
        let rand = getRand(tail);
        swap(arr, rand, tail);
        tail --;
    }

    return arr;
}

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function test(arr, count) {
    const map = {};
    for (let i = 0; i < count; i ++) {
        let testArr = arr.slice();
        let result = knuthShuffle(testArr);
        const key = result.toString();
        if (map[key]) {
            map[key] ++;
        } else {
            map[key] = 1;
        }
    }

    Object.keys(map).forEach(key => {
        map[key] = Math.floor((map[key] * 100 / count) * 100) / 100;
    });

    return map;
}

let arr = Array.from({length: 5}).map((_, index) => index + 1);
console.log(test(arr, 2000000));