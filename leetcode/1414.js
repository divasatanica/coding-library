// 1 1 2 3 5 8 13 21
// k=19

function findMinFibonacciNumbers(k) {
  // 定义 F(1) 和 F(2)
  // 定义 Fk(n) 为值大于 k 的斐波那契数列数字
  let a = 1, b = 1;
  while (b <= k) {
    let c = a + b;
    a = b; b = c;
  }
  console.log('a', a, 'b', b)
  // 最终 b 储存的是 Fk(n), a 储存的是 Fk(n) 的前一个数字
  let ans = 0;
  while (k != 0) {
    // 只要当前项小于等于 k,就可以作为一个组成部分凑进去,保证每次凑进去的都是当前可以凑进去的最大整数
    if (k >= b) {
      console.log('k', k, 'b', b)
      k -= b; ans++;
    }
    // 往前递推前面的项
    let c = b - a;
    b = a; a = c;
    console.log('a2', a, 'b2', b, 'c', c)
  }
  return ans;
}

console.log(findMinFibonacciNumbers(19))