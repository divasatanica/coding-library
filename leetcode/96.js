/**
 * @param {number} n
 * @return {number}
 */
// var numTrees = function(n) {
//     const map = {};

//     function G(n) {

//         if (n === 0) {
//             return 1;
//         }

//         if (n === 1) {
//             return 1;
//         }

//         const nArr = Array.from({length: n}).map((_, i) => i + 1);
//         let result = nArr.reduce((acc, curr) => {
//             return acc += f(n, curr)
//         }, 0);
//         map[n] = result;

//         return result;
//     }

//     function f(n, i) {

//         let result = G(n-i) * G(i-1);
//         map[n] = result;

//         return result;
//     }

//     return G(n);
// };

var numTrees = function(n) {
    const map = {};

    function G(n) {

        if (n === 0) {
            return 1;
        }

        if (n === 1) {
            return 1;
        }

        if (map[n]) {
            return map[n];
        }

        let result = 0;
        for (let i = 1; i <= n; i ++) {
            result += f(n, i);
        }
        map[n] = result;

        return result;
    }

    function f(n, i) {

        let result = G(n-i) * G(i-1);

        return result;
    }

    return G(n);
};

// console.log(numTrees(3));

let a = 90;
let b = 209;
let count = 0;

while (a / b < 0.5) {
    a += 1;
    b += 1;
    count ++;
}

console.log(`${count} once ac needed`);