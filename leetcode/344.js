/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let i = 0,
        j = s.length - 1;

    while (i < j) {
        s[i] ^= s[j];
        s[j] ^= s[i];
        s[i] ^= s[j];
        i ++;
        j --;
    }

    console.log(s);
};

function swap(arr, i, j) {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

reverseString(["h","e","l","l","o"]);
reverseString(["H","a","n","n","a","h"]);