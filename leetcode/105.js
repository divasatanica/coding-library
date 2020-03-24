/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length < 1) {
        return null;
    }
    if (preorder.length === 1) {
        return new TreeNode(preorder[0]);
    }
    const map = {};
    let index = 0;
    for (let i = 0; i < inorder.length; i ++) {
        map[inorder[i]] = i;
    }

    const _buildTree = (start, end) => {
        if (start > end) {
            return null;
        }
        let val = preorder[index];
        let rootIndex = map[val];
        let root = new TreeNode(val);

        index ++;

        root.left = _buildTree(start, rootIndex - 1);
        root.right = _buildTree(rootIndex + 1, end);

        return root;
    }

    return _buildTree(0, inorder.length - 1);
};