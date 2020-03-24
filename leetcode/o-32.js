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
var levelOrder = function(root) {
    if (!root) {
        return [];
    }
    const queue = [root];
    const result = [];
    while (queue.length) {
        let node = queue.shift();
        result.push(node.val);

        if (node.left) {
            queue.push(node.left);
        }
        if (node.right) {
            queue.push(node.right);
        }
    }

    return result;
};

const A = {
    val: 2,
    left: {
        val: 3,
        left: {
            val: 1,
            left: null,
            right: null
        },
        right: null
    },
    right: {
        val: 2,
        left: null,
        right: null
    }
};

console.log(levelOrder(A));