/**
 * 设定如下的对应关系(A=1,B=2,C=3,...,Z=26,AA=27,AB=28,....AZ=, BA=, .....AAA=, ...)，编写一个转换函数，根据上面的规则把一个字符串: "WECHAT" 转换为数字
 */

function converStrToValue (str) {
  return str.charCodeAt() - 64;
}

function convert (str) {
  let res = 0;

  Array.prototype.forEach.call(str, ((char, index) => {
    const value = converStrToValue(char);

    res += value * (26 ** (str.length - index - 1))
  }));

  console.log(res);
  return res;
}

convert('CD')
convert('AB')
convert('WECHAT')