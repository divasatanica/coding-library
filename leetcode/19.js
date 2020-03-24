/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(-1);
    dummy.next = head;
    let p1 = dummy,
        p2 = dummy;
    
    for (let i = 1; i <= n + 1; i ++) {
        p1 = p1.next;
    }

    while (p1) {
        p1 = p1.next;
        p2 = p2.next;
    }

    p2.next = p2.next.next;

    return dummy.next;
};

let result = removeNthFromEnd(l1.getHead(), 2);
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);