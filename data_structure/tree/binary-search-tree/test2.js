const { genBSTByArr } = require('./make');

const meta = [1,3,4,5,6,8,2,0];
// const meta = [0,1,2];
const bst = genBSTByArr(meta, 3);

// var inorderTraversal = function(root) {
//     // console.log(root);
//     const result = [];
//     const stack = [];
//     let cur = root;
//     while (stack.length || cur) {
//         console.log('stack', stack.map(n => n.value), result);
//         while (cur) {
//             stack.push(cur);
//             cur = cur.left;
//         }
//         cur = stack.pop();
//         result.push(cur.value);
//         cur = cur.right;
//     }
//     return result;
// };

// function top(stack) {
//     return stack[stack.length - 1] || { left: null, right: null };
// }

var zigzagLevelOrder = function(root) {
    let stack1 = [root];
    let stack2 = [];
    const result = [];
    console.log(root)
    while (stack1.length || stack2.length) {
        const _ = [];
        while (stack1.length) {
            const node = stack1.pop();

            _.push(node.value);

            node.right && stack2.push(node.right);
            node.left && stack2.push(node.left);
        }
        result.push(_);

        let _ = stack2;
        stack2 = stack1;
        stack1 = _;
    }

    return result;
    
};

console.log(zigzagLevelOrder(bst.root));