/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  const path = []
  const res = []
  if (!root) {
      return 0
  }
  const _sumNumbers = (root, path, res) => {
      if (!root.left && !root.right) {
          res.push(Number(path.join('')))
          path.pop()
          return
      }
      if (root.left) {
          path.push(root.left.val)
          _sumNumbers(root.left, path, res)
      }

      if (root.right) {
          path.push(root.right.val)
          _sumNumbers(root.right, path, res)
      }
  }

  _sumNumbers(root, [root.val], res)
  return res.reduce((acc, curr) => acc + curr, 0)
};



