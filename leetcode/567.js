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

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
 var checkInclusion2 = function(s1, s2) {
    const s1Map = {};
    let gTotal = 0;
    let gCur = 0;
    ([...s1]).forEach((char, index) => {
      let record = s1Map[char];
      if (record) {
        record += 1;
        gTotal += 1;
      } else {
        s1Map[char] = 1;
        gTotal += 1;
      }
    });
  
    let l = 0;
    let r = 0;
  
    while (r < s2.length) {
      const char = s2[r];
      let hasOutOfInclusion = false;
      let record = s1Map[char];

      
  
      if (record != null) {
        if (record <= 0) {
          hasOutOfInclusion = true;
        }
      } else {
        hasOutOfInclusion = true;
      }

    
      if (hasOutOfInclusion) {
        let innerRecord = s1Map[s2[r]];
        console.log(s2[l], s1Map[s2[l]], innerRecord)
        if (innerRecord == null) {
          gCur = 0;
          l ++;
          r ++;
        } else {

          while (l <= r && s1Map[s2[l]] < 0) {

            console.log('Recovering', s1Map[s2[l]], s2[l])
            s1Map[s2[l]] ++;
            l ++;
            gCur --;
          }
          r ++;
        }
      } else {
        // record -= 1;
        // s1Map[s2[r]] -= 1;
        // gCur += 1;
        // r ++;
      }

      console.log('char:', char, 'r:', r, 'gCur:', gCur, 'gTotal:', gTotal, 'record:', record, 'hasOutOfInclusion:', hasOutOfInclusion);
  
      if (gCur >= gTotal) {
        return true
      }
    }
  
    if (gCur >= gTotal) {
      return true
    }
  
    return false;
  };

console.log(checkInclusion2("abcdcc", "eidbadcccooo"))
// console.log(checkInclusion2("ab", "eidbaooo"))
// console.log(checkInclusion2("abcdcc", "eidboaoo"))
// console.log(checkInclusion2("ab", "eidboaoo"))
// console.log(checkInclusion2("ab", "ab"))
// console.log(checkInclusion2("hello", "ooolleoooleh"))