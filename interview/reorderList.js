/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let rear = head;

  while (rear.next != null) {
    rear = rear.next;
  }

  let l = head;

  while (rear !== l) {
    console.log("l", l, "rear", rear);
    let headNext = l.next;

    l.next = rear;
    rear.next = headNext;
    l = headNext;
    let cursor = l;

    console.log("l", l, "cursor", cursor, "rear", rear);

    while (cursor.next !== rear) {
      cursor = cursor.next;
    }
    rear = cursor;
    rear.next = null;
    console.log("----");
  }

  l.next = null;
};

class ListNode {
  constructor(val) {
    this.next = null;
    this.val = val;
  }

  toString() {
    return this.val;
  }
}

function genList(list) {
  let dump = new ListNode(null);
  let c = dump;

  list.forEach((n) => {
    c.next = new ListNode(n);
    c = c.next;
  });

  return dump.next;
}

function printList(head) {
  let result = [];
  let cursor = head;

  while (cursor != null) {
    result.push(cursor.val);
    cursor = cursor.next;
  }

  console.log("result", result);

  return result;
}

const head = genList([1, 2, 3, 4]);

printList(head);

reorderList(head);

printList(head);
