/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder = function(postorder) {
    if (postorder.length <= 2) {
        return true;
    }
    const _verify = (postorder, start, end) => {
        if (start >= end) {
            return true;
        }
        let i = start;
        for (; i < end; i ++) {
            if (postorder[i] > postorder[end]) {
                break;
            }
        }

        for (let j = i; j < end; j ++) {
            if (postorder[j] < postorder[end]) {
                return false;
            }
        }

        return _verify(postorder, start, i - 1) && _verify(postorder, i, end - 1);
    }

    return _verify(postorder, 0, postorder.length - 1);
};

/**
 * @param {number[]} postorder
 * @return {boolean}
 */
var verifyPostorder2 = function(postorder) {
    let i = postorder.length - 1;
    let root = Number.MAX_VALUE;
    let stack = [];

    while (i >= 0) {
        if (postorder[i] > root) {
            return false;
        }
        while (stack.length && stack[stack.length - 1] > postorder[i]) {
            root = stack.pop();
        }
        stack.push(postorder[i]);
        i --;
    }

    return true;
};

const testCase = [3,2,7,10,9,8];
console.log(verifyPostorder(testCase) === verifyPostorder2(testCase));