function Animal (name) {
  this.name = name;
}

Animal.prototype.say = function () { console.log('Name:', this.name) };

// 组合式继承
function Cat (name, color) {
  Animal.call(this, name);

  this.color = color;
}

Cat.prototype = new Animal();
Cat.prototype.show = function () { console.log('Name:', this.name, 'Color:', this.color) };
Cat.prototype.constructor = Cat;

const cat = new Cat('cat', '#fff');

cat.show();

// 寄生组合式继承
function Kitty(name, color, age) {
  Cat.call(this, name, color);

  this.age = age;
}

// Object.create 原型式继承
const prototype = Object.create(Cat.prototype);
Kitty.prototype = prototype;
Kitty.prototype.constructor = Kitty;

Kitty.prototype.howOld = function () { console.log('Name:', this.name, 'Color:', this.color, 'age:', this.age) }

const kitty = new Kitty('kitty', '#0f0', 5);

kitty.howOld();
kitty.show();
kitty.say();

// ES6 类继承
class MaleKitty extends Kitty {
  constructor(name, color, age) {
    super(name, color, age);
    this.sex = 'male';
  }
  ouch () {
    console.log('Name:', this.name, 'Color:', this.color, 'age:', this.age, 'Sex:', this.sex);
  }
}

const maleKitty = new MaleKitty('maleKitty', '#00f', 3);

maleKitty.ouch();
maleKitty.howOld();