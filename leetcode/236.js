/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    const map = new WeakMap();
    const set = new Set();
    let queue = [root];
    while (queue.length) {
        const node = queue.shift();

        if (node.left) {
            map.set(node.left, node);
            queue.push(node.left);
        }
        if (node.right) {
            map.set(node.right, node);
            queue.push(node.right);
        }
    }

    // 往 set 中添加 p 的父节点路径
    while (p) {
        set.add(p);
        p = map.get(p);
    }

    // 沿着q的父节点路径遍历，如果遇到 set 中包含的元素，则是第一个公共的祖先
    while (q) {
        if (set.has(q)) {
            return q;
        }
        q = map.get(q);
    }
};

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) {
        return root;
    }
    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);


    /**
     * left 或 right 为空时，说明 p 和 q 都在另一颗子树里面，返回另一棵子树的结果
     * 若 left 和 right 都不为空，说明 p 和 q 一个在左子树一个在右子树，返回根节点
     */
    if (!left) {
        return right;
    }
    if (!right) {
        return left;
    }
    return root;
};