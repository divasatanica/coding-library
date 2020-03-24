Function.prototype.mybind = function (context, ...outerArgs) {
    let self = this;
    let _context = context || window;

    return function wrapper (...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        
        if (this instanceof wrapper) {
            let obj = {},
                result = self.apply(obj, args);
            
            // obj.__proto__ = self.prototype;
            Object.setPrototypeOf(obj, self.prototype) 
            return typeof result === 'object' ? result : obj;
        }

        return self.apply(_context, args);
    }
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

function add(a, b) {
    return a + b;
}
let addOne = add.mybind({}, 1);

console.log(addOne(3));