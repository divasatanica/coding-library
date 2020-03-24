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
const l1 = getLinkedListWithNoCircle([1,2,3,4,5,6,7]);

var reverseList = function(head) {
    if (!head) {
        return head;
    }
    let pre = null,
        cur = head;
    while (cur) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    return pre;
};

var reverseList2 = function(head) {
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

let result = reverseList2(l1.getHead());
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);