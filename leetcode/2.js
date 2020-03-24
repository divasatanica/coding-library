/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");

const l1 = getLinkedListWithNoCircle([9,9,9,9]);
const l2 = getLinkedListWithNoCircle([9,9,9]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var addTwoNumbers = function(l1, l2) {
    let carry = 0;
    let p1 = l1,
        p2 = l2;
    let result = new ListNode(0),
        head = result;

    while (p1 && p2) {
        let val = p1.val + p2.val + carry;

        if (val >= 10) {
            carry = Math.floor((val / 10));
            val = val - 10;
        } else {
            carry = 0;
        }

        head.val = val;
        if (p1.next || p2.next) {
            head.next = new ListNode(0);
            head = head.next;
        }
        p1 = p1.next;
        p2 = p2.next;
    }

    while (p1) {
        let val = p1.val + carry;

        if (val >= 10) {
            carry = Math.floor((val / 10));
            val = val - 10;
        } else {
            carry = 0;
        }

        head.val = val;
        if (p1.next) {
            head.next = new ListNode(0);
            head = head.next;
        }
        p1 = p1.next;
    }

    while (p2) {
        let val = p2.val + carry;

        if (val >= 10) {
            carry = Math.floor((val / 10));
            val = val - 10;
        } else {
            carry = 0;
        }

        head.val = val;
        if (p2.next) {
            head.next = new ListNode(0);
            head = head.next;
        }
        p2 = p2.next;
    }

    if (carry > 0) {
        head.next = new ListNode(carry);
    }

    return result;
};

let result = addTwoNumbers(l1.getHead(), l2.getHead());
let _ = "";
while (result) {
    _ = result.val + _;
    result = result.next;
}
console.log(_);