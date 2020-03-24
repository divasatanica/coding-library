/**
 * 重写原型prototype会丢失constructor属性
 */

function A() {

}

var a1 = new A();
console.log(A.prototype.constructor);

var b = {
  show() {
    console.log('method from b');
  }
};

A.prototype = b;
console.log(A.prototype.constructor);

A.prototype.constructor = A;
var a2 = new A();

console.log(A.prototype.constructor);
