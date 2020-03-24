var b = {
  name: 'coma',
  age: 23
};
var c = 0;

setTimeout(() => {
  console.log("After a year");
  b = {name: 'col', age: 23};
  c++;
}, 5000);

module.exports = {
  b,
  c
};