/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */

const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([0,1,2]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var rotateRight = function(head, k) {
    if (!head) {
        return head;
    }
    let p = head;
    let count = 0;
    while (p) {
        p = p.next;
        count ++;
    }
    k = k % count;
    if (!k) {
        return head;
    }
    count = 0;
    let slow = fast = head;
    while (count < k) {
        fast = fast.next;
        count ++;
    }

    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    let resultHead = slow.next;
    slow.next = null;
    fast.next = head;

    return resultHead;
};

let result = rotateRight(l1.getHead(), 4);
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);