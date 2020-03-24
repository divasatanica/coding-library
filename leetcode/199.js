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
var rightSideView = function(root) {
    if (!root) {
        return [];
    }

    const result = [];
    let tmp = [];
    let queue = [root];
    let node;

    while (node = queue.shift()) {
        if (node.left) {
            tmp.push(node.left);
        }
        if (node.right) {
            tmp.push(node.right);
        }
        
        if (queue.length < 1) {
            result.push(node.val);
            queue.push.apply(queue, tmp);
            tmp = [];
        }
    }

    return result;
};
