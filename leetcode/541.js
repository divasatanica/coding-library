/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    let i = 0;
    let list = s.split(""),
        len = list.length;
    let result = [];

    while (i < len) {
        result = [...result, ...list.slice(i, i + k).reverse(), ...list.slice(i + k, i + 2 * k)];
        i += Math.min(2 * k, len - i);
    }
    const { rss } = process.memoryUsage();
    console.log("Memory used:", (rss / (1024 * 1024)).toFixed(2), "MB");
    return result.join("");
};

var reverseStr2 = function(s, k) {
    let i = 0,
        j = 0;
    let len = s.length;
    let result = "";
    while (i < len) {
        j = i + Math.min(k, len - i) - 1;
        while (j >= i) {
            result += s[j];
            j --;
        }
        j = i + k;
        i += k;
        while (i < j + Math.min(k, len - j)) {
            result += s[i] || '';
            i ++;
        }
    }
    const { heapUsed } = process.memoryUsage();
    console.log("Memory used:", (heapUsed / (1024 * 1024)).toFixed(2), "MB");
    return result;
};


function test(s, k) {
    // return reverseStr(s, k) === reverseStr2(s, k);
    reverseStr2(s, k);

}

console.time("reverseStr");
console.log(test("abcdedfghijklmn".repeat(20000), 20));
console.timeEnd("reverseStr");
// console.log(test("abcdedfasdasd", 3));
// console.log(test("abcdedfzxc", 2));
// console.log(test("abcdedf", 4));
// console.log(test("abcdedfasdasdasd", 5));
// console.log(test("abcdedfczxczc", 5));
// console.log(test("abcdedfabcdef", 4));
// console.log(test("abcdedfjkljasduioure", 6));
// console.log(test("abcdedfabcdefg", 4));
// console.log(test("", 3));