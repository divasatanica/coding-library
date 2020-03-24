const { Queue } = require('./ctor');

let q1 = new Queue();

q1.push({
    name: 'coma',
    age: 23
});
q1.push({
    name: 'col',
    age: 23
});
q1.push({
    name: 'lorac',
    age: 23
});



console.log(q1.shift(), q1.length);
console.log(q1.shift(), q1.length);
console.log(q1.shift(), q1.length);