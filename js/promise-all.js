// function Add () {
//     // ...
// }

// var count = 0,
//     newCount = 0;

// var oldAdd = Add;

// Add = function () {
//     console.trace(`Add is invoked here`);
//     if (this instanceof Add) {
//         newCount ++;
//     } else {
//         count ++;
//     }
//     return oldAdd();
// }

// Add();
// Add();
// Add();
// new Add();

// console.log('Count', count, 'NewCount', newCount);

// add = a => b => a + b;

// console.log(add(1)(2));



// function go () {
//     var prefix = 'go';
//     return subGo.apply(null, arguments);

//     function subGo() {

//         if (arguments.length > 0) {
//             return prefix + Array.prototype.join.call(arguments, '');
//         }
//         prefix += 'o';
//         return subGo;
//     }
// }

// console.assert(go('d') === 'god', 'test-1');
// console.assert(go()('d') === 'good', 'test-2');
// console.assert(go()()('d') === 'goood', 'test-3');
// console.assert(go()()()('d') === 'gooood', 'test-4');


const timeout = (ms, id) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms);
});

const ajax1 = () => timeout(2000, 1).then(() => {
    console.log('1');
    return 1;
});

const ajax2 = () => timeout(1000, 2).then(() => {
    console.log('2');
    return 2;
});

const ajax3 = () => timeout(2000, 3).then(() => {
    console.log('3');
    return 3;
});

const mergePromise = ajaxArray => {
    // 在这里实现你的代码

    const len = ajaxArray.length,
          data = [];

    let count = 0;
    let result = new Promise((resolve, reject) => {
        ajaxArray.forEach((p, index) => {
            p.then((res) => {
                count ++;
                data[index] = res;
                if (count === len) {
                    resolve(data);
                }
            }, reason => {
                reject(reason);
            });
        });
    });

    return result;
};


// 实现类似于promise.all的方法
// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//     console.log('done');
//     console.log(data); // data 为 [1, 2, 3]
// });

Promise.prototype._finally = function(onFinally) {
    return this.then(
        res => Promise.resolve(onFinally(res)),
        err => Promise.resolve(onFinally(err))
    );
}


Promise.__all__ = mergePromise;
Promise.__all__([ajax1(), ajax2(), ajax3()]).then(data => {
    console.log(data);
})