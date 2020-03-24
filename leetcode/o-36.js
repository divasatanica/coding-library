/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
const { genBSTByArr } = require('../data_structure/tree/binary-search-tree/make');
var treeToDoublyList = function(_root) {
    if (!_root) {
        return _root;
    }

    const _toDoublyList = root => {
        if (!root.left && !root.right) {
            return [
                root,
                root
            ];
        }
        let leftHead, leftTail;
        let rightHead, rightTail;
        if (root.left) {
            [leftHead, leftTail] = _toDoublyList(root.left);
        } else {
            leftHead = root;
            leftTail = root;
        }
        if (root.right) {
            [rightHead, rightTail] = _toDoublyList(root.right);
        } else {
            rightHead = root;
            rightTail = root;
        }

        if (leftTail !== root) {
            leftTail.right = root;
            root.left = leftTail;
        }
        if (rightHead !== root) {
            rightHead.left = root;
            root.right = rightHead;
        }

        return [leftHead, rightTail];
    }

    let [ leftHead, rightTail ] = _toDoublyList(_root);

    leftHead.left = rightTail;
    rightTail.right = leftHead;

    let newHead = leftHead;

    return newHead;
};

const tree = genBSTByArr([1,4,10,9,3], 1);
const result = treeToDoublyList(tree.root)
console.log(result);