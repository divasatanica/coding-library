/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this._count = 0;
    this._capacity = capacity;
    this._valueMap = {};
    this._first = null;
    this._last = null;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const node = this._valueMap[key];
    const keyExists = !!node;

    if (!keyExists) {
        this._valueMap[key] = void 0;
        return -1;
    }

    this._setMRU(key);
    return node.val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    const node = this._valueMap[key];
    const keyExists = !!node;

    if (keyExists) {
        node.val = value;
    } else {
        if (this._count >= this._capacity) {
            this._removeLRU();
        }
        this._addToList(key, value);
    }
    this._setMRU(key);
};

LRUCache.prototype._removeLRU = function() {
    const second = this._first.next;
    const key = this._first.key;
    this._first.next = null;
    if (second) {
        second.pre = null; 
    }
    this._first = second;
    this._count --;
    delete this._valueMap[key];
}

LRUCache.prototype._setMRU = function(key) {
    const newLast = this._valueMap[key];
    const preLast = this._last;

    if (preLast === newLast) {
        return;
    }

    this._last = newLast;

    // 如果 newLast.pre 为空，说明 newLast 曾经是第一个节点，需要更新 _first 指针
    if (newLast.pre) {
        newLast.pre.next = newLast.next;
    } else if (newLast.next) {
        this._first = this._first.next;
    }
    if (newLast.next) {
        newLast.next.pre = newLast.pre; 
    }
    if (preLast) {
        preLast.next = newLast;
        newLast.pre = preLast;
        newLast.next = null;
    }
}

LRUCache.prototype._addToList = function(key, value) {
    this._count ++;

    const newLast = new DoubleLinkedListNode(value);

    // 这里加个 key 是为了方便调用 _removeLRU 删掉 map 中对应的 LRU 节点
    newLast.key = key;
    this._valueMap[key] = newLast;

    // 如果此时没有 this._first，说明是首次调用，直接赋值给 _first 和 _last
    if (!this._first) {
        this._first = this._last = newLast;
    } else {
        this._setMRU(key);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


var DoubleLinkedListNode = function(val) {
    this.pre = null;
    this.next = null;
    this.val = val;
}

// JAVA LinkedHashMap = LinkedList + HashMap

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