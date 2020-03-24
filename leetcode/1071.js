/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
    if (str1.length < str2.length) {
        let tmp = str1;
        str1 = str2;
        str2 = tmp;
    }
    let len1 = str1.length,
        len2 = str2.length;
    let i = 0;
    let edge;
    let result = '';
    let map = {

    }

    while (i < len1) {
        if (str1[i] in map) {
            if (!edge) {
                edge = i;
            }
            if (map[str1[i]] === (i - edge) % edge) {
                i ++;
                continue;
            }
            return '';
        }
        let j = str2.indexOf(str1[i]);

        if (j < 0) {
            return '';
        }
        result += str1[i];
        map[str1[i]] = j;
        i ++;
    }

    return result;
};


console.log(gcdOfStrings("TAUXXTAUXXTAUXXTAUXXTAUXX", "TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX"));