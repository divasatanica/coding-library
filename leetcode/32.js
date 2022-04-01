/**
 * @param {string} s
 * @return {number}
 */
 var longestValidParentheses = function(s) {
  let p = 0;
  let stack = [-1];
  let res = 0;
  let count = 0;

  while (p < s.length) {
    const char = s[p];

    if (char === '(') {
      stack.push(p);
    } else {
      stack.pop();

      if (stack.length > 0) {
        console.log('Peek:', stack[stack.length - 1]);
        res = Math.max(res, p - stack[stack.length - 1]);
      } else {
        stack.push(p);
      }
    }
    p ++;
  }

  return res;
};

console.log(longestValidParentheses('())(())'));