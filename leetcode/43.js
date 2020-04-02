/**
 * 模拟竖式运算即可，还有一种优化方法是寻找数字在竖式中出现的索引
 * 还没看这个方法
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function(num1, num2) {
    if (num1 === '0' || num2 === '0') {
        return '0';
    }
    let count = 0;
    let res = '0';
    let tailZero = '';

    for (let i = num1.length - 1; i >= 0; i --) {
        if (num1[i] === '0') {
            num1 = num1.slice(0, i);
            tailZero += '0';
        } else {
            break;
        }
    }

    for (let i = num2.length - 1; i >= 0; i --) {
        if (num2[i] === '0') {
            num2 = num2.slice(0, i);
            tailZero += '0';
        } else {
            break;
        }
    }

    if (num1.length < num2.length) {
        let tmp = num1;
        num1 = num2;
        num2 = tmp;
    }
    let carry = 0;
    for (let i = num2.length - 1; i >= 0; i --) {
        let result = '';
        for (let j = num1.length - 1; j >= 0; j --) {
            let _ = Number(num1[j]) * Number(num2[i]) + carry;
            result = (_ % 10) + result;
            carry = Math.floor(_ / 10);
        }
        if (carry !== 0) {
            result = carry + result;
            carry = 0;
        }
        res = add(res, result + ('0').repeat(count));
        count ++;
    }

    return res + tailZero;
};

function add(a, b) {
    let lenA = a.length,
      lenB = b.length,
      len = lenA > lenB ? lenA : lenB;
  
    // 先补齐位数一致
    if (lenA > lenB) {
      for (let i = 0; i < lenA - lenB; i++) {
        b = '0' + b;
      }
    } else {
      for (let i = 0; i < lenB - lenA; i++) {
        a = '0' + a;
      }
    }
  
    let arrA = a.split('').reverse(),
      arrB = b.split('').reverse(),
      arr = [],
      carryAdd = 0;
  
    for (let i = 0; i < len; i++) {
      let temp = Number(arrA[i]) + Number(arrB[i]) + carryAdd;
      arr[i] = temp > 9 ? temp - 10 : temp;
      carryAdd = temp >= 10 ? 1 : 0;
    }
  
    if (carryAdd === 1) {
      arr[len] = 1;
    }
  
    return arr.reverse().join('');
  
  }

console.log(multiply('1002', '20200'));