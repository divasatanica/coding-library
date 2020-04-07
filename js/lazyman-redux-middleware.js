function LazyMan (name) {
    return new LazyManReduxStyle(name);
}

class LazyManReduxStyle {
    constructor(name) {
        this.name = name;
        this.middlewares = [this._say()];
        this.sleepFirstMiddlewares = [];
        setTimeout(() => {
            this._run();
        });
    }
  
    sleepFirst(time) {
        time = time * 1000;
        this.sleepFirstMiddlewares.push(next => () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} ms`);
                next();
            }, time);
        });
        return this;
    }
  
    sleep(time) {
        time = time * 1000;
        this.middlewares.push(next => () => {
            setTimeout(() => {
                console.log(`Wake up after ${time} ms`);
                next();
            }, time);
        });
        return this;
    }
  
    eat(food) {
        this.middlewares.push(next => () => {
            console.log(`Eat ${food}~`);
            next();
        });
        return this;
    }
  
    _say() {
        return next => () => {
            console.log(`Hi, this is ${this.name}`);
            next();
        };
    }
  
    _run() {
        this._applyMiddlewares([...this.sleepFirstMiddlewares, ...this.middlewares])();
    }
  
    _applyMiddlewares(middlewares) {
        return compose(middlewares.reverse())(() => {});
    }
}
  
function compose(funcs) {
    return arg => funcs.reduce((acc, curr) => curr(acc), arg);
}

new LazyMan('Hank').sleepFirst(3).eat('lunch').sleep(3).eat('dinner').sleepFirst(2);