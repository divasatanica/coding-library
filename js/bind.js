Function.prototype.mybind = function (context, ...outerArgs) {
    const self = this;
    const _context = context || window;

    const wrapper = function wrapper(...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        
        if (this instanceof wrapper) {
            let obj = {},
                result = self.apply(obj, args);
            
            // obj.__proto__ = self.prototype;
            Object.setPrototypeOf(obj, self.prototype);
            obj.constructor = wrapper;
            return typeof result === 'object' ? result : obj;
        }

        return self.apply(_context, args);
    }

    const Noop = function() {};
    Noop.prototype = this.prototype;
    wrapper.prototype = new Noop();

    return wrapper;
}

function Animal (name) {
    this.name = name;
}

Animal.prototype.say = function () {
    console.log(this.name);
}

let Cat = Animal.mybind(Animal, 'c');

let cat = new Cat();

cat.say();

console.log(cat.constructor === Cat, Cat.prototype.__proto__.constructor === Animal);

// function add(a, b) {
//     return a + b;
// }
// let addOne = add.mybind({}, 1);

// console.log(addOne(3));