/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) {
        return 1;
    }
    if (n === 1) {
        return x;
    }
    if (n === -1) {
        return 1/x;
    }
    const t = n;
    if (t < 0) {
        n = -n;
    }
    console.log(n & 1 === 0);
    while ((n & 1) === 0) {
        x *= x;
        n >>= 1;
        console.log("n1:", n);
    }
    let res = x;
    console.log(x, n);
    n >>= 1;

    while (n) {
        x *= x;
        if (n & 1) {
            res *= x;
        }
        n >>= 1;
        console.log("n2:", n, x);
    }

    return t > 0 ? res : 1/res;
};

console.log(myPow(2.0000, 10))
