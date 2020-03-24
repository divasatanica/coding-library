'use strict';
Function.prototype.delay = function(time) {
    let self = this;
    return function delayed(...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const result = self.apply(this, args);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }, time);
        })
        
    }
}

Function.prototype.mybind = function (context, ...outerArgs) {
    let self = this;
    let _context = context || window;

    return function wrapper (...innerArgs) {
        let args = [...outerArgs, ...innerArgs];
        
        if (this instanceof wrapper) {
            let obj = {},

                result = self.apply(obj, args);
            obj.__proto__ = self.prototype;
            return typeof result === 'object' ? result : obj;
        }

        return self.apply(_context, args);
    }
}

// function add(a, b) {
//     return a + b;
// }

const add = (a, b) => a + b;

function say() {
    console.log(this.name);
}

async function a(a, b) {
    const _add = add.delay(2000);
   
    let result = await _add(a, b);
    console.log(result);
    console.timeEnd("start");
    return result;
}

console.time("start");
// a(1,2);


async function test() {
    const _say = say.delay(1000).mybind({ name: "coma" });

    await _say();
    console.timeEnd('start');
}

test();