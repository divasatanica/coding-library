/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let stack = [];
    let cur = 0;
    let result = 0;

    while (cur < height.length) {
        while (stack.length > 0 && height[cur] > height[peek(stack)]) {
            const h = val(peek(stack));
            stack.pop();
            if (stack.length < 1) {
                break;
            }
            const dis = cur - peek(stack) - 1;
            const min = Math.min(val(peek(stack)), height[cur]);
            result += dis * (min - h);
        }
        stack.push(cur);
        cur ++;
    }
    

    return result;
    
    function val(idx) {
        return height[idx];
    }

    function peek(stack) {
        return stack[stack.length - 1];
    }
};

function abs(n) {
    return Math.abs(n);
}

var a = [0,1,0,2,1,0,1,3,2,1,2,1]
console.log(trap(a));