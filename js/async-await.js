function asyncWrapper(gen) {
    const iterator = gen();

    const handle = ({ value, done }) => {
        if (done) {
            return;
        }

        if (value instanceof Promise) {
            value.then(val => {
                handle(iterator.next(val));
            }, e => iterator.throw(e));
        }
    }

    try {
        handle(iterator.next());
    } catch (e) {
        throw e;
    }
}

function* gen() {
    try {
        yield sleep(2000);
        const a = yield Promise.resolve(1);
        console.log(a);
        const b = yield new Promise((resolve, reject) => setTimeout(resolve, 1000, a + 10));
        console.log(b);
        const c = yield Promise.resolve(b + 100);
        console.log(c);
        console.log(a, b, c); // 输出 1，11，111
    } catch (e) {
        console.log("出错了：", e);
    }
}

async function gen1() {
    try {
        await sleep(2000);
        const a = await Promise.resolve(1);
        console.log(a);
        const b = await new Promise((resolve, reject) => setTimeout(resolve, 1000, a + 10));
        console.log(b);
        const c = await Promise.resolve(b + 100);
        console.log(c);
        console.log(a, b, c); // 输出 1，11，111
    } catch (e) {
        console.log("出错了：", e);
    }
}

function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// asyncWrapper(gen);
gen1();