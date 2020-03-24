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

function ListNode(val) {
    this.val = val;
    this.next = null;
}

const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3,4,5]);

var reverseList = function(head) {
    if (!head) {
        return head;
    }
    const reverse = (pre, cur) => {
        if (!cur) {
            return pre;
        }

        let next = cur.next;
        cur.next = pre;
        return reverse(cur, next);
    }

    return reverse(null, head);
};

var reverseBetween = function(head, m, n) {
        const count = n - m;
        let p = dummy = new ListNode(0);
        p.next = head;
        let pre, cur, front, tail;

        for (let i = 0; i < m - 1; i ++) {
            p = p.next;
        }
        front = p;
        pre = tail = p.next;
        cur = pre.next;

        for (let i = 0; i < count; i ++) {
            let next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        front.next = pre;
        tail.next = cur;

        return dummy.next;
};

let result = reverseBetween(l1.getHead(), 2,4);
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);