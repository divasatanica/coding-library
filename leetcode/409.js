/**
 * @param {string} s
 * @return {number}
 */
var longestPalindrome = function(s) {
    const map = {};
    let result = 0;
    let maxOdd = 0;
    let addMaxOdd = false;
    for (let i = 0, len = s.length; i < len; i ++) {
        let letter = s[i];

        map[letter] = (letter in map) ? map[letter] + 1 : 1;
    }

    const keys = Object.keys(map);
    keys.forEach(key => {
        const count = map[key];

        if (count % 2) {
            maxOdd = Math.max(maxOdd, count);
        }
    });
    keys.forEach(key => {
        const count = map[key];

        if (count % 2) {
            if (count === maxOdd) {
                maxOdd = 0;
                result += count;
            } else {
                result += count - 1;
            }
        } else {
            result += count;
        }
    });
    return result;
};

console.log(longestPalindrome('abccccdd'))
// console.log(longestPalindrome('abccccddeeeeeeeeefffggggassd'))