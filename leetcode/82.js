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
var deleteDuplicates = function(head) {
    let dummy = new ListNode(null);

    let read = head;
    let write = dummy;

    while (read) {
        if (read.val === write.val) {
            read = read.next;
        } else {
            write.next = read;
            write = read;
            read = read.next;
        }
    }

    return dummy.next;
};