/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var hasCycle = function(head) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let p1 = p2 = dummy;

    while (p1.next && p2.next) {
        if (p1 === p2) {
            return true;
        }
        p1 = p1.next;
        p2 = p2.next.next;
    }

    return false;
};