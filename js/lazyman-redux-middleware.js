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
        this.sleepFirstMiddlewares.push(next => async () => {
            await sleep(time);
            console.log(`Wake up after sleepFirst ${time} ms`);
            next && next();
        });
        return this;
    }
  
    sleep(time) {
        time = time * 1000;
        this.middlewares.push(next => async () => {
            await sleep(time);
            console.log(`Wake up after sleep ${time} ms`);
            next && next();
        });
        return this;
    }
  
    eat(food) {
        this.middlewares.push(next => () => {
            console.log(`Eat ${food}~`);
            next && next();
        });
        return this;
    }
  
    _say() {
        return next => () => {
            console.log(`Hi, this is ${this.name}`);
            next && next();
        };
    }
  
    _run() {
        this._applyMiddlewares([...this.sleepFirstMiddlewares, ...this.middlewares])();
    }
  
    _applyMiddlewares(middlewares) {
        const [lastActionGenerator, ...restActionGenerators] = middlewares.reverse(); 
        return compose(restActionGenerators)(lastActionGenerator());
    }
}
  
function compose(funcs) {
    return arg => funcs.reduce((acc, curr) => curr(acc), arg);
}

function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

LazyMan('Hank').sleepFirst(3).eat('lunch').sleep(3).eat('dinner').sleepFirst(2);