/**
 * 实现一个解码器,编码规则如下:
 * 遇到方括号则对方括号内的字符串重复n次，n是方括号前面的数字，如果没有数字则为1次，可能存在嵌套
 */
const test1 = "a2[b]a2[b2[c]]";
// abbabccbcc
const test2 = "2[3[c]]a2a";
// cccccca2a
const test3 = "[abc][d]10[e2]434";
// abcde2e2e2e2e2e2e2e2e2e2434
const test4 = "[abc][d]3[e2]4[b2[c]]"
// abcde2e2e2bccbccbccbcc

function decodeString (source) {
  const numStack = [];
  const stack = [];
  let res = '';
  let i = 0;
  while (i < source.length) {
    const char = source[i];

    const isLastCharNumber = !isNaN(Number(source[i - 1]));

    switch (true) {
      case isWord(char): {
        // 如果上一位字符是数字,那么代表前面至少有一位数字是源数据,需要直接添加到结果中
        if (isLastCharNumber) {
          res += String(numStack.pop());
        }
        res += char;
        i ++;
        break;
      }
      case !isNaN(Number(char)): {
        // 处理连续数字的情况
        // 也可以方便处理末尾的多位数字源数据(下面的注释会解释)
        if (isLastCharNumber) {
          const lastNum = numStack.pop();
          const newNum = String(lastNum) + char;
          numStack.push(Number(newNum));
        } else {
          numStack.push(Number(char));
        }
        i ++;
        break;
      }
      case char === '[': {
        const lastChar = source[i - 1];
        // 一开始就是左方括号或上一位字符不是数字
        // 表示本次重复次数为 1
        if (!lastChar || isNaN(Number(lastChar))) {
          numStack.push(1);
        }
        let j = i + 1;
        let param = '';
        const leftStack = ['['];

        // 在这里进行括号匹配,扫描方括号里面的输入
        // 用于递归调用得出结果
        while (leftStack.length > 0) {
          const char = source[j];

          if (char === '[') {
            param += char;
            leftStack.push('[');
          } else if (char === ']') {
            leftStack.pop();
            // 如果是本次扫描最开始的左方括号匹配的右方括号
            // 就不需要当做递归的入参的一部分
            // 否则需要当做入参的一部分传入
            if (leftStack.length > 0) {
              param += char;
            }
          } else {
            param += char;
          }

          j ++;
        }

        // 取出本次结果的重复次数
        let count = numStack.pop();
        // 将扫描得到的方括号里面的值用来递归调用解码
        let result = decodeString(param);
        while (count > 0) {
          res += result;
          count --;
        }
        // 处理完这一串方括号的串之后
        // 直接把指针从左方括号处跳到与其匹配的右方括号的下一位
        i = j;
      }
    }
  }

  // 如果遍历完成数字栈里面仍有数据,表示这些是源数据结尾的数字
  // 需要拼接到输出的末尾
  // 因为上面已经对连续数字的输入情况做了处理,可以知道这个栈如果还有数据,一定只有一个数据
  // 直接取栈顶元素拼接即可
  if (numStack.length > 0) {
    res += numStack.pop();
  }

  return res;
}

function isWord (char) {
  const charCode = char.charCodeAt()
  return charCode >= 97 && charCode <= 122
}

console.assert(decodeString(test1) === 'abbabccbcc', 'abbabccbcc')
console.assert(decodeString(test2) === 'cccccca2a', 'cccccca2a')
console.log(decodeString(test3));
console.assert(decodeString(test3) === 'abcde2e2e2e2e2e2e2e2e2e2434', 'abcde2e2e24')
console.assert(decodeString(test4) === 'abcde2e2e2bccbccbccbcc', 'abcde2e2e2bccbccbccbcc')

console.log(decodeString('[a2[b3[c4[d]4]]]'))