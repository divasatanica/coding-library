const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3]);
const l2 = getLinkedListWithNoCircle([2,3,4,5]);
const l3 = getLinkedListWithNoCircle([1,1,1,1,1,1,1,1,1,2,2,3,3,4,4,5]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var deleteDuplicates = function(head) {
    let p1 = head;
    let p2 = head;

    while (p2) {
        if (p1.val === p2.val) {
            p2 = p2.next;
        } else {
            p1.next = p2;
            p1 = p2;
            p2 = p2.next;
        }
    }

    p1.next = p2;

    return head;
};

let result = deleteDuplicates(l3.getHead());
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);