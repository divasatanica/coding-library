console.log(Function.prototype.__proto__.constructor, Object.prototype.__proto__); // Object() null


/**
 * @author nicole_zhang
 * @description 链接：https://juejin.im/post/5b0b9b9051882515773ae714
 */
function new_instance_of(leftVaule, rightVaule) {
  let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
  leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
  while (true) {
    if (leftVaule === null) {
      return false;
    }
    if (leftVaule === rightProto) {
      return true;
    }
    leftVaule = leftVaule.__proto__
  }
}

