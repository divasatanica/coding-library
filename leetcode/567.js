/**
 * 滑动窗口方法，先统计 s1 中各字母出现的次数，然后遍历 s2
 * 每碰到一个字母就将 map 中的次数减 1，然后判断减完后的结果是否小于 0
 * 小于 0 说明该字母不在 s1 中，则目前窗口中的子串不是 s1 的排列
 * 因此将窗口左端一直左移到当前字母的次数不小于 0 为止，基本等同于把窗口左端挪到
 * 当前位置的下一个位置
 * 最后，判断窗口长度是否为 s1 的长度，是则返回 true
 * 因为只要窗口内的字符出现频率符合 s1 的频率，窗口就能一直增长，增长到和 s1 长度相等
 * 表示窗口内的字符频率完全符合 s1，即窗口内的子串是 s1 的排列
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
    const map = Array.from({ length: 26 }).fill(0);
    let count = 0;
    for (let i = 0, len = s1.length; i < len; i ++) {
        const letter = s1[i].charCodeAt() - 97;

        if (map[letter]) {
            map[letter] ++;
        } else {
            map[letter] = 1;
        }
    }

    for (let l = 0, r = 0; r < s2.length; r ++) {
        const letter = s2[r].charCodeAt() - 97;

        map[letter] --;
        while (l <= r && map[letter] < 0) {
            map[s2[l ++].charCodeAt() - 97] ++;
        }

        if (r - l + 1 === s1.length) {
            return true;
        }
    }

    return false;
    

};

console.log(checkInclusion("ab", "eidboaoo"))