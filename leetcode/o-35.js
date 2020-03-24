/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) {
        return null;
    }

    let p = head;

    while (p) {
        const node = new Node(p.val, null, null);
        const next = p.next;

        p.next = node;
        node.next = next;
        p = next;
    }

    p = head;

    while (p) {
        if (p.random !== null) {
            p.next.random = p.random.next;
        }
    }

    p = head;
    let newHead = q = p.next;

    while (p && q) {
        p.next = q.next;
        if (q.next) {
            q.next = q.next.next;
        }
        
        p = p.next;
        q = q.next;
    }

    return newHead;
};