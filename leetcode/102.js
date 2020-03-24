/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

const { genBSTByArr } = require('../data_structure/tree/binary-search-tree/make');

function TreeNode(val) {
    this.val = val;
    his.left = this.right = null;
}

var levelOrder = function(root) {
    let level = 0;
    let result = [];
    let tmp = [];
    let node;
    const queue = [root];

    while (node = queue.shift()) {
        if (!result[level]) {
            result[level] = [node.value];
        } else {
            result[level].push(node.value);
        }
        
        if (node.left) {
            tmp.push(node.left);
        }
        if (node.right) {
            tmp.push(node.right);
        }

        if (queue.length < 1) {
            queue.push.apply(queue, tmp);
            tmp = [];
            level ++;
        }
    }

    return result;
};

let tree = genBSTByArr([4,10,1,3,6,7,2], 3);

// console.log(tree);
let result = levelOrder(tree.root);
console.log(result);