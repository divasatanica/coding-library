/**
 * @param {number[]} A
 * @return {number}
 */

var minIncrementForUnique = function(A) {
    let repeated = 0;
    let res = 0;
    let i = 1;
    A.sort((a, b) => a - b);


    while (i < A.length) {
        
        if (A[i - 1] === A[i]) {
            repeated ++;

            // 预先减去重复的数值，在后面计算操作数时可以不用考虑重复的数是多少
            res -= A[i];
            i ++;
            continue;
        }

        const space = A[i] - A[i - 1] - 1;

        if (space < 1) {
            i ++;
            continue;
        }
        const give = Math.min(space, repeated);
        res += give * A[i - 1] + ((give + 1) * give) / 2;
        repeated -= give;
        i ++;
    }

    if (repeated > 0) {
        res += repeated * A[A.length - 1] + ((repeated + 1) * repeated) / 2;
    }
    return res;
};

console.log(minIncrementForUnique([3,2,1,2,1,7]));