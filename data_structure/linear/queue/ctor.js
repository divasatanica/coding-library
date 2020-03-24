/**
 * @author coma
 * @desc Queue implementation using two stack
 */
const {
    LinkStack
} = require('../stack/ctor');

const Queue = (function () {
    let _private = new WeakMap();
    class Queue {
        constructor () {
            _private.set(this, {});
            _private.get(this).stack1 = new LinkStack();
            _private.get(this).stack2 = new LinkStack();
        }

        get length () {
            let stack1 = _private.get(this).stack1,
                stack2 = _private.get(this).stack2;
            return stack1.length + stack2.length;
        }

        push (item) {
            _private.get(this).stack1.push(item);
        }

        shift () {
            let stack1 = _private.get(this).stack1,
                stack2 = _private.get(this).stack2;
            if (stack2.length > 0) {
                return stack2.pop();
            }

            // 这里可以把栈1的元素都放到栈2中，留下最后一个元素直接返回
            // 节省一次入栈出栈栈2的操作
            for (let i = 0, len = stack1.length - 1; i < len; i ++) {
                stack2.push(stack1.pop());
            }
            return stack1.pop();
        }
    }
    return Queue;
})();

module.exports = {
    Queue
};