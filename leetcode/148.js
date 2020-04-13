
const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([-84,142,41,-17,-71,170,186,183,-21,-76,76,10,29,81,112,-39,-6,-43,58,41,111,33,69,97,-38,82,-44,-7,99,135,42,150,149,-21,-30,164,153,92,180,-61,99,-81,147,109,34,98,14,178,105,5,43,46,40,-37,23,16,123,-53,34,192,-73,94,39,96,115,88,-31,-96,106,131,64,189,-91,-34,-56,-22,105,104,22,-31,-43,90,96,65,-85,184,85,90,118,152,-31,161,22,104,-85,160,120,-31,144,115]);
function ListNode(val) {
    this.val = val;
    this.next = null;
}
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
var sortList = function(head) {
    if (head == null) {
        return head;
    }
    const len = getLength(head);
    const dummy = new ListNode();
    dummy.next = head;
    let i = 1;

    while (i < len) {
        let prev = dummy;
        let curr = prev.next;

        while (curr != null) {
            let left = curr;
            let right = cut(left, i);
            curr = cut(right, i);
            prev.next = mergeTwoLists(left, right);

            while (prev.next != null) {
                prev = prev.next;
            }
        }
        i <<= 1;
    }

    return dummy.next;
};

function cut(head, step) {
    if (head == null) {
        return head;
    }
    for (let i = 1; head.next != null && i < step; i ++) {
        head = head.next;
    }
    const right = head.next;
    head.next = null;
    return right;
}

function getLength(head) {
    let count = 0;
    let p = head;
    while (p != null) {
        count ++;
        p = p.next;
    }

    return count;
}

function mergeTwoLists(l1, l2) {
    if (l1 === null || l2 === null) {
        return l1 || l2;
    }
    
    let result = new ListNode(null),
        tmp = result;
    
    
    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            tmp.next = l1;
            l1 = l1.next;
        } else {
            tmp.next = l2;
            l2 = l2.next;
        }
        tmp = tmp.next;
    }
    
    if (l1 !== null) {
        tmp.next = l1;
    }
    
    if (l2 !== null) {
        tmp.next = l2;
    }
    
    return result.next;
};

var p = sortList(l1.getHead());

while (p) {
    console.log(p.val);
    p = p.next;
}