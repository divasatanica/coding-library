/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */

// var hasPathSum = function(root, sum) {
//     if (!root) {
//         return false;
//     }

//     if (root.val === sum && !root.left && !root.right) {
//         return true;
//     }

//     return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val);
// };

// 解法1 拷贝当前path，递归调用
var pathSum = function(root, sum) {
    if (!root) {
        return [];
    }

    if (!root.left && !root.right && root.val === sum) {
        return [
            [root.val]
        ];
    }

    let result = [];

    const _pathSum = (root, sum, path) => {
        if (!root.left && !root.right && root.val === sum) {
            result.push([...path, root.val]);
            return;
        }

        _pathSum(root.left, sum - root.val, [...path, root.val]);
        _pathSum(root.right, sum - root.val, [...path, root.val]);
    }
    _pathSum(root, sum, []);

    return result;
};

// 解法2 使用一个 stack 保存树的结构，不用拷贝 path，节省空间
var pathSum2 = function(root, sum) {
    if (!root) {
        return [];
    }

    if (!root.left && !root.right && root.val === sum) {
        return [
            [root.val]
        ];
    }

    let result = [];
    let stack = [];
    const _pathSum = (root, sum) => {
        if (!root) {
            stack.push(root);
            return;
        }
        if (!root.left && !root.right && root.val === sum) {
            stack.push(root.val);
            result.push([...stack]);
            return;
        }

        stack.push(root.val);
        _pathSum(root.left, sum - root.val);
        stack.pop();
        _pathSum(root.right, sum - root.val);
        stack.pop();
    }

    _pathSum(root, sum);

    return result;
}

// 解法3 while 循环加一个栈前序遍历
var pathSum3 = function(root, sum) {
    if (!root) {
        return [];
    }

    if (!root.left && !root.right && root.val === sum) {
        return [
            [root.val]
        ];
    }

    let result = [];
    let stack = [
        [
            root,
            sum,
            []
        ]
    ];

    while (stack.length) {
        const [root, sum, path] = stack.pop();

        if (!root.left && !root.right && root.val === sum) {
            result.push(path);
            break;
        }

        if (root.right) {
            stack.push([root.left, sum - root.val, [...path, root.val]]);
        }

        if (root.left) {
            stack.push([root.left, sum - root.val, [...path, root.val]]);
        }
    }

    return result;
}