/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * 在这个过程中设置了一个max全局变量，深度优先遍历这棵树，每遍历完一个节点就更新max，
 * 并通过返回值的方式自底向上把当前节点左右子树的最大高度传给父函数使用，使得每个节点只需访问一次即可。
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
    let help = (node) => {
        if(node == null) return 0;
        let left = node.left ? help(node.left) + 1: 0;
        let right = node.right ? help(node.right) + 1: 0;
        let cur = left + right;
        if(cur > max) max = cur;
        return Math.max(left, right);
    }
    let max = 0;
    if(root == null) return 0;
    help(root);
    return max;
};