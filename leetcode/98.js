/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const { genBSTByArr } = require('../data_structure/tree/binary-search-tree/make');
// var isValidBST = function(root) {
//     let last = -Number.MAX_SAFE_INTEGER;
//     const _isValidBST = root => {
//         if (root == null) {
//             return true;
//         }
//         if (isValidBST(root.left)) {
//             if (last < root.val) {
//                 last = root.val;
//                 return isValidBST(root.right);
//             }
//         }
//     }

//     return _isValidBST(root);
// };
var isValidBST = function(root) {
    const _isValidBST = (root, min, max) => {
        if (!root) {
            return true;
        }
        if (root.val <= min || root.val >= max) {
            return false;
        }

        return _isValidBST(root.left, min, root.val) && _isValidBST(root.right, root.val, max);
    }

    return _isValidBST(root, -Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
}

const tree = genBSTByArr([4,10,9,5,7,3,2], 6);

console.log(isValidBST(tree.root));