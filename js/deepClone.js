function cloneLoop(x) {
    const root = Object.create(null);
    const map = new WeakMap();
    // 栈
    const callStack = [
        {
            parent: root,
            key: undefined,
            data: x,
        }
    ];

    while (callStack.length) {
        // 深度优先
        const node = callStack.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            parent[key] = {};
            res = parent[key];
        }

        for (let k in data) {
            if (Object.prototype.hasOwnProperty.call(data, k)) {
                if (typeof data[k] === 'object') {
                    if (map.get(data[k])) {
                        res[k] = data[k];
                    } else {
                        // 下一次循环
                        callStack.push({
                            parent: res,
                            key: k,
                            data: data[k],
                        });
                        map.set(data[k], true);
                    }
                } else {
                    res[k] = data[k];
                }
            }
        }
    }
    console.log(root);
    return root;
}

// const _ = {
//     a: 1,
// };

// _.loop = _;
// console.log(_);

const a = {
    data: {
        name: 'coma',
        age: 23,
        friends: {
            name: 'col',
            age: 24
        }
    },
    msg: 'success',
    foo: function() {}
};
a.loop = a;
const b = cloneLoop(a);
// a.loop.a = 3;
console.log(b.loop);
console.log(a.foo === b.foo);