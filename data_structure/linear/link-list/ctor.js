/**
 * @author coma
 */

class ListNode {
  constructor ({
    next,
    value
  }) {
    this.next = next;
    this.val = value;
  }
}

class LinkedList {
  constructor ({
    head = null
  }) {
    this.getHead = function () {
      return head;
    }
  }

  getSize () {
    let head = this.getHead(),
        buf = head,
        count = head ? 1 : 0;
    if (head === null) {
      return 0;
    }
    while (buf.next) {
      count ++;
      buf = buf.next;
    }
    return count;
  }

  getLastKNode (k) {
    let head = this.getHead(),
        first = head,
        second = head,
        size = this.getSize();
    if (head === null || k <= 0) {
      throw new Error(`Wrong Parameter 'k'`);
    }
    if (k >= size) {
      return head;
    }
    for (let i = 0; i < k - 1; i ++) {
      second = second.next;
    }
    while (second.next) {
      first = first.next;
      second = second.next;
    }
    return first;
  }

  output() {
    const result = [];
    let p = this.getHead();

    while (p) {
      result.push(p.val);
      p = p.next;
    }

    return result;
  }
}

module.exports = {
  ListNode,
  LinkedList
}