/**
 * @author coma
 * @description Stack - Test Issue
 */

let {Stack, LinkStack} = require("./ctor");

let stackOne = new LinkStack();
// console.log(stackOne.size, stackOne);
stackOne.push({
  name: 'col',
  age: 23
});
// console.log(stackOne.size, stackOne.data);
console.log(stackOne.length);