/**
 * @param {number} capacity
 */
 class LRUCache {
  constructor(capacity) {
    this.map = new Map();
    this.list = new DoubleLinkedList();
    this.capacity = capacity;
  }

  /** 
  * @param {number} key
  * @return {number}
  */
  get(key) {
    if (!this.map.has(key)) {
      return -1;
    }

    const node = this.map.get(key);

    this.list.splice(node);
    const newNode = this.list.push(key, node.val);
    this.map.set(key, newNode);
    return node.val;
  }

  /** 
  * @param {number} key 
  * @param {number} value
  * @return {void}
  */
  put(key, value) {
    if (!this.map.has(key)) {
      const node = this.list.push(key, value);
      this.map.set(key, node);
      if (this.list.count > this.capacity) {
        const lruNode = this.list.shift();
        this.map.delete(lruNode.key);
      }
      return;
    }

    this.list.splice(this.map.get(key));
    const node = this.list.push(key, value);
    this.map.set(key, node);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

class DoubleLinkedListNode {
  constructor (val, key = null) {
    this.pre = null;
    this.next = null;
    this.val = val;
    this.key = key;
  }
}

class DoubleLinkedList {
  constructor () {
    this.head = new DoubleLinkedListNode();
    this.tail = new DoubleLinkedListNode();
    this.head.next = this.tail;
    this.tail.pre = this.head;
    this.count = 0;
  }

  push(key, val) {
    const node = new DoubleLinkedListNode(val, key);
    const last = this.tail.pre;
    last.next = node;
    node.pre = last;
    this.tail.pre = node;
    node.next = this.tail;
    this.count ++;

    return node;
  }


  shift() {
    if (this.count < 1) {
      return null;
    }

    const first = this.head.next;

    this.head.next = first.next;
    first.next.pre = this.head;
    first.next = null;
    first.pre = null;
    this.count --;
    return first;
  }

  splice(node) {
    if (this.count < 1) {
      return null;
    }

    const pre = node.pre;
    const next = node.next;
    node.pre = null;
    node.next = null;
    pre.next = next;
    next.pre = pre;
    this.count --;
    return node;
  }
}


const cache = new LRUCache( 2 /* 缓存容量 */ );

cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1));       // 返回  1
cache.put(3, 3);    // 该操作会使得密钥 2 作废
console.log(cache.get(2));       // 返回 -1 (未找到)
cache.put(4, 4);    // 该操作会使得密钥 1 作废
console.log(cache.get(1));       // 返回 -1 (未找到)
console.log(cache.get(3));       // 返回  3
console.log(cache.get(4));       // 返回  4