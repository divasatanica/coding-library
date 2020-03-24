/**
 * @param {number[]} A
 * @return {boolean}
 */
var canThreePartsEqualSum = function(A) {
    let sum = A.reduce((sum, n) => sum + n, 0);
    if (sum % 3) {
        return false;
    }
    let rest = sum / 3,
        count = 0;

    for (let i = 0, len = A.length; i < len; i ++) {
        rest -= A[i];

        if (rest === 0 && count < 3) {
            count ++;
            rest = sum / 3;
        }
    }

    return count === 3;
};


console.log(canThreePartsEqualSum([0,2,1,-6,6,-7,9,1,2,0,1]));