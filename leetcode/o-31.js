/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function(pushed, popped) {
    const stack = [];
    let pushedP = 0;
    let popedP = 0;

    while (pushedP < pushed.length || stack.length) {
        if (stack.length < 1 || stack[stack.length - 1] !== popped[popedP]) {
            if (pushedP >= pushed.length) {
                break;
            }
            stack.push(pushed[pushedP]);
            pushedP ++;
            continue;
        }

        stack.pop();
        popedP ++;
    }

    return popedP === popped.length;
};

console.log(validateStackSequences([1,2,3,4,5], [4,3,5,1,2]))