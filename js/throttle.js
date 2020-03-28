function throttle(func, time) {
    let now = 0;
    return function throttled(...args) {
        let cur = Date.now();
        if (cur - now < time) {
            return;
        }
        now = cur;
        let result = func.apply(null, args);
        return result;
    }
}

const add = throttle((a, b) => {
    let now = Date.now();
    console.log(a + b)
}, 500);

setInterval(add, 10, 1, 2);
