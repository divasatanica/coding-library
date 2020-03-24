/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */

const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3]);
const l2 = getLinkedListWithNoCircle([2,3,4,5]);
const l3 = getLinkedListWithNoCircle([4,5,6,7,3]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}


var swapPairs = function(head) {
    if (!head || !head.next) {
        return head;
    }
    const dummy = new ListNode(0);
    dummy.next = head;
    let p = dummy;

    let node1, node2;

    while ((node1 = p.next) && (node2 = p.next.next)) {
        node1.next = node2.next;
        node2.next = node1;
        p.next = node2;
        p = node1;
    }

    return dummy.next;
};

let result = swapPairs(l3.getHead());
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);