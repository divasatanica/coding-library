/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
    let result = [];

    if (n < 2) {
        return n;
    }

    let a = 0, 
        b = 1,
        tmp;

    for (let i = 2n; i <= n; i ++) {
        result.push((a + b) % (1e9+7));
        tmp = b;
        b = a + b;
        a = tmp;
    }
    console.log(result);
    return result[result.length - 1];
};

var fib = function(n) {
    let map = {};

    const _fib = n => {
        if (n < 2) {
            return n;
        }
        if (map[n]) {
            return map[n];
        }
        let result = _fib(n - 1) + _fib(n - 2);
        map[n] = result;

        return result;
    }

    return _fib(n);
};

console.log(fib(80));