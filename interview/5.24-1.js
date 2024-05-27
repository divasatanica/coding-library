/**
 * 5.24
 * Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 */

// case 1: intentione execution

// 1.最少次数，意味着需要找到两个字符串公共子串的最长长度，这样所需的操作次数最少
// 2.不同操作间怎么区分操作多还是少
// 3.

// 遍历字符串
// 一样就继续
// 不一样就三种方式
// 

function solution(word1, word2) {
  if (word1.length === 0) {
    return word2.length;
  }

  if (word2.length === 0) {
    return word1.length;
  }


  let res = Math.abs(word2.length - word1.length);

  let i = 0;
  let j = 0;

  // word1 的 0-i 到 word2 的 0-j 需要的操作次数
  const dp = Array.from({ length: word1.length }).map(() => Array.from({ length: word2.length }));

  while (i < word1.length) {
    while (j < word2.length) {
      const char1 = word1[i];
      const char2 = word2[j];
      let currentOprCount = 0;

      if (char1 === char2) {
        i += 1;
        j += 1;
        currentOprCount = 0;
        dp[i][j] = dp[i - 1][j - 1] + currentOprCount;
        continue;
      } else {
        if (char1 == null) {
          // insert
          currentOprCount = 1;
          dp[i][j] = dp[i - 1][j] + currentOprCount;
          continue;
        }

        if (char2 == null) {
          // remove
          currentOprCount = 1;
          dp[i][j] = dp[i][j - 1] + currentOprCount;
          continue;
        }

        // replace
        currentOprCount = 1;
        dp[i][j] = dp[i-1][j-1] + currentOprCount;
      }
    }
  }

  return dp[word1.length - 1][word2.length - 1];
}