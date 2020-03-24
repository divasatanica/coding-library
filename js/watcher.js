class Watcher {

    constructor (data) {
        this._init(data);
    }

    _init (data) {
        this.cbs = {};
        this.data = data;
        let ob = new Observer(data);
        ob.__watcher__ = this;
        this._defineProxy();
    }

    $emit (key, value) {
        let realPath = resolvePath(key),
            temp = this.data,
            lastKey = realPath.pop();
        realPath.forEach(key => {
            temp = data[key];
        });
        temp[lastKey] = value;
    }

    $on (key, cb) {
        let cbs = this._getCbs();

        if (Array.isArray(cbs[key])) {
            cbs[key].push(cb);
        } else {
            cbs[key] = [cb];
        }
    }

    _defineProxy () {
        let source = this.data;
        for (let key in source) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            defineProxy(this, key, source);
        }
    }

    _getCbs () {
        return this.cbs;
    }
}

class Dep {
    constructor () {
        this.cbs = [];
    }

    addSub (w) {
        this.subs.push(w);
    }

    addDep (w) {
        this.addSub(w);
    }
}

class Observer {
    constructor (data) {
        if (typeof data !== 'object') {
            throw new Error('Data must be an object');
        }
        data.__ob__ = this;
        this.walk(data);
    }

    walk (data) {
        for (let i in data) {
            if (!data.hasOwnProperty(i)) {
                continue;
            }
            if (typeof data[i] === 'object') {
                this.walk(data[i]);
            } else {
                defineReactive(data, i, data[i]);
            }
        }
    }
}

function defineProxy (target, key, source) {
    let property = Object.getOwnPropertyDescriptor(source, key),
        setter = property && property.set,
        getter = property && property.get;
    Object.defineProperty(target, key, {
        get () {
            if (getter) {
                return getter.call(source);
            }
        },

        set (newValue) {
            if (setter) {
                setter.call(source, newValue);
            }
        }
    });
}

function defineReactive (target, key, value) {
    const dep = new Dep();
    Object.defineProperty(target, key, {
        get () {
            return value;
        },

        set (newValue) {
            if (newValue === value || newValue !== newValue && value !== value) {
                return;
            }
            value = newValue;
            let watcher = this.__ob__.__watcher__,
                cbs = watcher._getCbs(),
                callbackQueue = cbs[key];
            callbackQueue.forEach(fn => {
                fn(newValue);
            });
        } 
    })
}

function resolvePath (key) {
    return key.split('.');
}


// ---------------------------------------------------------

// 测试用例
let data = {a:1};
const w = new Watcher(data);
w.$on('a', (v) => {
    console.log('first ', v)
})

w.$on('a', (v) => {
    console.log('second ', v)
})



w.a = 2; // console: first 2  second 2

w.$emit('a', 3); // console: first 3  second 3
console.log(w.a === 3); // true

console.log(data);