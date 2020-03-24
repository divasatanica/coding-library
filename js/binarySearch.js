var merge = function(nums1, m, nums2, n) {
    const _r = _merge(nums1.slice(0, m), m, nums2.slice(0, n), n);

    for (let i = 0, len = _r.length; i < len; i ++) {
        nums1[i] = _r[i];
    }

};

const _merge = (nums1, m, nums2, n) => {
    let cursor = n - 1;
    let result = [];
    let j;

    console.log(nums1, nums2);

    for (let i = m - 1; i > -1; i --) {
        const gte = [];
        for (j = cursor; j > -1; j --) {
            if (nums2[j] >= nums1[i]) {
                gte.unshift(nums2[j]);
            } else {
                break;
            }
        }
        cursor = j;
        console.log(nums1[i], gte, cursor);
        result.unshift(...[nums1[i], ...gte]);
    }

    if (cursor > -1) {
        result.unshift(...nums2.slice(0, cursor + 1))
    }

    return result;
}

function binarySearch(arr, num) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return -1;
    }

    let min = 0,
        max = arr.length - 1;
        
    while(min <= max) {
        let mid = Math.floor((min + max) / 2);
        if (num > arr[mid]) {
            min = mid + 1;
        } else if (num < arr[mid]) {
            max = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}
let a = [2, 0];
let b = [1];
merge(a, 1, b, 1);
console.log(a);