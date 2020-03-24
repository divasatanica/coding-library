/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) {
            return head;
        }

        Node p = head;

        while (p != null) {
            Node newNode = new Node(p.val, null, null);
            Node next = p.next;

            p.next = newNode;
            newNode.next = next;
            p = next;
        }

        p = head;

        while (p != null) {
            if (p.random != null) {
                p.next.random = p.random.next;
            }
            p = p.next.next;
        }

        p = head;
        Node newHead = p.next;
        Node q = p.next;
        

        while (p != null) {
            p.next = q.next;
            if (q.next != null) {
                q.next = q.next.next;
            }
            
            p = p.next;
            q = q.next;
        }

        return newHead;
    }
}