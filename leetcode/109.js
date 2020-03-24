/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3,4,5]);

var sortedListToBST = function(head) {
    if (!head) {
        return null;
    }

    if (!head.next) {
        return new TreeNode(head.val);
    }

    let p1 = p2 = head;
    let leftTail = p1;
    while (p2 && p2.next) {
        
        p2 = p2.next.next;
        p1 = p1.next;
        if (p2.next) {
            leftTail = p1;
        }
    }

    if (p1 === head) {
        return new TreeNode(p1.val);
    }

    leftTail.next = null;
    const root = new TreeNode(p1.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(p1.next);

    return root;
};

console.log(sortedListToBST(l1.getHead()));