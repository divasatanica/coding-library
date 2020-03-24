/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function(A, B) {
    if (!B || !A) {
        return false;
    }
    const isSubTree = (A, B) => {
        if (!B) {
            return true;
        }
        if (!A) {
            return false;
        }
        if (A.val !== B.val) {
            return false;
        }
        return isSubTree(A.left, B.left) && isSubTree(A.right, B.right);
    }
    let result = false;
    if (A.val === B.val) {
        result = isSubTree(A, B);
        if (result) {
            return true;
        }
        return isSubStructure(A.left, B) || isSubStructure(A.right, B);
    }
    
    return isSubStructure(A.left, B) || isSubStructure(A.right, B);
};

const A = {
    val: 2,
    left: {
        val: 3,
        left: 1,
        right: null
    },
    right: {
        val: 2,
        left: null,
        right: null
    }
};

const B = {
    val: 1,
    left: null,
    right: null
}

console.log(isSubStructure(A, B));