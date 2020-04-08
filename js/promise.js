const PENDING = 0;
const FULLFILLED = 1;
const REJECTED = 2;
const passThrough = val => val;
const passErrorThrough = reason => {
    throw reason;
};
const kValue = Symbol('value');
const kReason = Symbol('reason');
const kStatus = Symbol('status');
const kResolveCbs = Symbol('resolveCbs');
const kRejectCbs = Symbol('rejectCbs');

class MyPromise {
    constructor(executor) {
        this[kValue] = void 0;
        this[kReason] = void 0;
        this[kStatus] = PENDING;
        this[kResolveCbs] = [];
        this[kRejectCbs] = [];
        try {
            executor(
                val => resolvePromise(this, val), 
                reason => rejectPromise(this, reason)
            );
        } catch (e) {
            this[kStatus] = REJECTED;
            this[kReason] = e;
            rejectPromise(this, this[kReason]);
        }
    }

    /**
     * Add error handler for this instance
     * @param {Function} onCaught 
     */
    catch(onCaught) {
        return this.then(null, onCaught);
    }

    /**
     * Define the onFinally callback after this instance's status is settled
     * @param {Function} onFinally 
     */
    finally(onFinally) {
        return this.then(
            res => MyPromise.resolve(onFinally(res)),
            err => MyPromise.resolve(onFinally(err))
        );
    }

    /**
     * Define the callback on this instance
     * @param {*} onResolve Callback when promise is resolved
     * @param {*} onReject Callback when promise is rejected
     */
    then(onResolve, onReject) {
        
        if (typeof onResolve !== 'function') {
            onResolve = passThrough;
        }

        if (typeof onReject !== 'function') {
            onReject = passErrorThrough;
        }
        const self = this;
        let gResolve,
            gReject;
        const newP = new MyPromise((resolve, reject) => {
            gResolve = resolve;
            gReject = reject;
        });
        const onResolveCallback = function(val) {
            try {
                const result = onResolve(val);
                Resolve(newP, result, gResolve, gReject);
            } catch (e) {
                gReject(e);
            }
            
        }
        const onRejectCallback = function(reason) {
            try {
                const reason_ = onReject(reason);
                Resolve(newP, reason_, gResolve, gReject);
            } catch (e) {
                gReject(e);
            }
        }
        if (this[kStatus] === FULLFILLED) {
            setTimeout(() => {
                onResolveCallback(this[kValue]);
            });
            return newP;
        }
        if (this[kStatus] === REJECTED) {
            setTimeout(() => {
                onRejectCallback(this[kReason]);
            });
            return newP;
        }
        this[kResolveCbs].push(onResolveCallback);
        this[kRejectCbs].push(onRejectCallback);
        return newP;
    }

    /**
     * return a Promise which will resolve when all instance in promises array.
     * @param {Array<MyPromise | Promise>} promises 
     */
    static all(promises) {
        const len = promises.length;
        const result = [];
        let count = 0;
        let Resolve,
            Reject;

        const newPromise = new MyPromise((resolve, reject) => {
            Resolve = resolve;
            Reject = reject;
        });
        promises.forEach((p, index) => {
            if (p instanceof MyPromise || p instanceof Promise) {
                p.then(res => {
                    result[index] = res;
                    count ++;
                    if (count >= len) {
                        Resolve(result);
                    }
                }, reason => {
                    Reject(reason);
                });
            } else if (typeof p === 'object' || typeof p === 'function') {
                const then = p.then;
                if (typeof then === 'function') {
                    then.call(p, Resolve, Reject);
                } else {
                    Resolve(p);
                }
            } else {
                Resolve(p);
            }
        });

        return newPromise;
    }

    /**
     * return a Promise which will be settled when one of instance in promises array settled
     * @param {Array<MyPromise | Promise>} promises 
     */
    static race(promises) {
        let finished = false;
        let Resolve,
            Reject;

        const newPromise = new MyPromise((resolve, reject) => {
            Resolve = resolve;
            Reject = reject;
        });
        promises.forEach((p, index) => {
            if (p instanceof MyPromise || p instanceof Promise) {
                p.then(res => {
                    if (finished) {
                        return;
                    }
                    Resolve(res);
                    finished = true;
                }, reason => {
                    if (finished) {
                        return;
                    }
                    Reject(reason);
                    finished = true;
                })
            } else if (typeof p === 'object' || typeof p === 'function') {
                const then = p.then;
                if (typeof then === 'function') {
                    then.call(p, val => {
                        if (finished) {
                            return;
                        }
                        finished = true;
                        Resolve(val)
                    }, reason => {
                        if (finished) {
                            return;
                        }
                        finished = true;
                        Reject(reason)
                    });
                } else {
                    if (finished) {
                        return;
                    }
                    finished = true;
                    Resolve(p);
                }
            } else {
                if (finished) {
                    return;
                }
                finished = true;
                Resolve(p);
            }
        });

        return newPromise;
    }
    
    /**
     * return a Promise with rejected status
     * @param {*} reason 
     */
    static reject(reason) {
        return new MyPromise((resolve, reject) => {
            reject(reason);
        });
    }

    /**
     * return a Promise with resolved status
     * @param {*} val 
     */
    static resolve(val) {
        return new MyPromise(resolve => {
            resolve(val);
        });
    }
}

function Resolve(p, x, resolveNewPromise, rejectNewPromise) {
    try {
        const result = x;

        if (p === x) {
            rejectNewPromise(new TypeError('Circular reference detected'));
            return;
        }

        if (result instanceof Promise || result instanceof MyPromise) {
            if (result[kStatus] === PENDING) {
                result.then(function(y) {
                    Resolve(p, y, resolveNewPromise, rejectNewPromise);
                }, rejectNewPromise);
            } else if (result[kStatus] === FULLFILLED) {
                resolveNewPromise(result[kValue]);
            } else {
                rejectNewPromise(result[kReason]);
            }
            return;
        }

        if (typeof result === 'object' || typeof result === 'function') {

            if (result === null) {
                return resolveNewPromise(result);
            }

            const then = result.then;
            if (typeof then === 'function') {
                let called = false;
                try {
                    then.call(
                        x, 
                        function(y) {
                            if (called) {
                                return;
                            }
                            called = true;
                            Resolve(p, y, resolveNewPromise, rejectNewPromise);
                        },
                        function(reason) {
                            if (called) {
                                return;
                            }
                            called = true;
                            rejectNewPromise(reason);
                        }
                    );
                } catch (e) {
                    if (called) {
                        return;
                    }
                    rejectNewPromise(e);
                }
            } else {
                resolveNewPromise(result);
            }
            return;
        }

        resolveNewPromise(result);
    } catch (e) {
        rejectNewPromise(e);
    }
}

function resolvePromise(p, val) {
    setTimeout(() => {
        if (p[kStatus] !== PENDING) {
            return;
        }
        p[kStatus] = FULLFILLED;
        p[kValue] = val;
        p[kResolveCbs].forEach(cb => {
            cb.call(this, val);
        });
    }, 0);
}

function rejectPromise(p, reason) {
    setTimeout(() => {
        if (p[kStatus] !== PENDING) {
            return;
        }
        p[kStatus] = REJECTED;
        p[kReason] = reason;
        p[kRejectCbs].forEach(cb => {
            cb.call(this, reason);
        });
    }, 0);
}

exports.rejected = MyPromise.reject;
exports.resolved = MyPromise.resolve;
exports.deferred = function deferred() {
    let gResolve,
        gReject;
    const promise = new MyPromise((resolve, reject) => {
        gResolve = resolve;
        gReject = reject;
    });
    return {
        promise,
        resolve: gResolve,
        reject: gReject
    };
}

// test case
function Promise_(val, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(val);
        }, time);
    });
}
let p = Promise_(3, 1000);
let p2 = Promise_(5, 1000);

let p3 = p.then(res => res + 3);

MyPromise.race([p3, p2]).then(console.log);