/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function(s) {
    let count = 0;
    let buf = '';

    for (let i = 0, len = s.length; i < len; i ++) {
        if (/\S/.test(s[i])) {
            buf += s[i];
        } else {
            if (buf.length > 0) {
                count ++;
            }
            buf = '';
        }
    }

    if (buf.length > 0) {
        count ++;
    }

    return count;
};

console.log(countSegments("love live! mu'sic forever"));