/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    let result = [];
    let stack = [];
    if (!root) {
        return result;
    }
    let map = {};

    stack.push(root);
    while (stack.length) {
        const node = stack.pop();

        result.push(node.val);

        if (node.left) {
            stack.push(node.left);
        }

        if (node.right) {
            stack.push(node.right);
        }
    }

    return result;
};