/**
 * @param {string} str
 * @return {number}
 */
var myAtoi = function(str) {
    if (!str) {
        return 0;
    }

    let p = 0;
    let getSign = false;
    let sign = '';
    let res = 0;
    while (p < str.length) {
        if (str[p] === ' ' && !getSign && res === 0) {
            p ++;
            continue;
        }

        if (str[p] === '+' || str[p] === '-') {
            if (!getSign) {
                getSign = true;
                sign = str[p];
                p ++;
                continue;
            }
            return getResult(res, sign);
        }

        if (!isNaN(parseInt(str[p], 10))) {
            getSign = true;
            res = 10 * res + parseInt(str[p], 10);
            p ++;
            continue;
        }

        return getResult(res, sign);
    }

    return getResult(res, sign);
};

function getResult(res, sign) {
    if (res > 2 ** 31 - 1 || (res > 2 ** 31 && sign === '-')) {
        return sign === '-' ? -(2 ** 31) : (2 ** 31) - 1;
    }
    return (sign === '-') ? -res : res;
}

console.log(myAtoi("      -11919730356x"));