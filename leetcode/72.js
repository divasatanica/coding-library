/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    let len1 = word1.length;
    let len2 = word2.length;

    if (len1 * len2 === 0) {
        return len1 + len2;
    }

    let res = Array.from({ length: len1 + 1 }).map(() => Array.from({ length: len2 + 1 }));

    for (let i = 0; i <= len1; i ++) {
        for (let j = 0; j <= len2; j ++) {
            if (i === 0) {
                res[i][j] = j;
                continue;
            }
            if (j === 0) {
                res[i][j] = i;
                continue;
            }
            let char1 = word1[i - 1];
            let char2 = word2[j - 1];

            if (char1 === char2) {
                res[i][j] = res[i - 1][j - 1];
            } else {
                res[i][j] = Math.min(res[i - 1][j], res[i][j - 1], res[i - 1][j - 1]) + 1;
            }
        }
    }
    return res[len1][len2];
};

console.log(minDistance('horse', 'ros'))