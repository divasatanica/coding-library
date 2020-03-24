/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    if (!s) {
        return 0;
    }
    if (s.length === 1) {
        return 1;
    }
    const lastIndexMap = {};
    let lastRepeatIndex = 0;
    let bufLen = 0;
    let res = 0;

    for (let i = 0, len = s.length; i < len; i ++) {
        let letter = s[i];
        let code = letter.charCodeAt();

        if (!(code in lastIndexMap)) {
            lastIndexMap[code] = i;
            bufLen ++;
            continue;
        }

        const lastIndex = lastIndexMap[code];
        
        if (bufLen > res) {
            res = bufLen;
        };

        bufLen = i - Math.max(lastIndex, lastRepeatIndex);
        lastRepeatIndex = lastIndex;
        lastIndexMap[code] = i;
    }

    if (bufLen > res) {
        res = bufLen;
    }

    return res;
};

console.log(lengthOfLongestSubstring("wobgrovw"))