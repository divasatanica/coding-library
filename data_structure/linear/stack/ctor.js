/**
 * @author coma
 * @description Data Structure - Stack
 */

let {ListNode} = require('../link-list/ctor');

class Stack {

  constructor () {
    let data = [];
    this.getData = function () {
      return data;
    }
    this.setData = function (val) {
      return data = val;
    }
  }

  get size () {
    return this.getData().length;
  }

  push (item) {
    let len = this.size,
        data = this.getData();
    data.length = len + 1;
    data[len] = item;
  }

  pop () {
    let len = this.size,
        data = this.getData(),
        result = data[len - 1];
    if (len === 0) {
      return null;
    }
    data[len - 1] = null;
    data.length = len - 1;
    return result;
  }

  clear () {
    this.setData([]);
  }
}

/**
 * @author coma
 * @description Implementation of stack using linked-list
 *              Using list head as the top of stack.
 */

const LinkStack = (function () {
  let _private = new WeakMap();
  class LinkStack {
    constructor() {
      _private.set(this, {});
      _private.get(this).head = null;
    }

    get length () {
      let count = 1,
          head = _private.get(this).head;
      if (head === null) {
        return 0;
      }
      while (head.next !== null) {
        count ++;
        head = head.next;
      }
      return count;
    }

    push (item) {
      let head = _private.get(this).head;
      try {
        if (head === null) {
          _private.get(this).head = new ListNode({
            next: null,
            value: item
          });
        } else {
          let temp = new ListNode({
            next: head,
            value: item
          });
          _private.get(this).head = temp;
        }
        return true;
      } catch (e) {
        return false;
      }
    }

    pop () {
      let head = _private.get(this).head,
          temp = head;
      if (head === null) {
        return null;
      }
      _private.get(this).head = head.next;
      temp.next = null;
      return temp.value;
    }
  }
  return LinkStack;
}());


module.exports = {
  Stack,
  LinkStack
};