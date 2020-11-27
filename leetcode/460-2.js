/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
    this.capacity = capacity;
    this.countMap = {};
    this.freqMap = {};
    this.count = 0;
    this.minFreq = 1;
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    const freq = this.freqMap[key];
    if (!freq) {
        return -1;
    }
    const list = this.countMap[freq];
    if (!list) {
        return -1;
    }
    const { result, val } = list.getAndRemove(key);
    
    if (result < 0) {
        if (freq === this.minFreq) {
            this.minFreq ++;
        }
    }

    if (!this.countMap[freq + 1]) {
        this.countMap[freq + 1] = new DoubleLinkListWithHashMap();
    }

    this.countMap[freq + 1].addNodeFromTail(key, val);
    this.freqMap[key] = freq + 1;

    return val;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, val) {
    if (this.capacity === 0) {
        return;
    }
    if (this.freqMap[key]) {
        const freq = this.freqMap[key];
        const nodeList = this.countMap[freq];
        const isEmpty = nodeList.removeNode(key);
        const nextCount = freq + 1;
        if (isEmpty) {
            delete this.countMap[freq];
        }
        if (!this.countMap[nextCount]) {
            this.countMap[nextCount] = new DoubleLinkListWithHashMap();
        }
        this.countMap[nextCount].addNodeFromTail(key, val);
        this.freqMap[key] = nextCount;
        return;
    }
    if (this.count < this.capacity) {
        const oneFreqList = this.countMap[1];
        if (oneFreqList) {
            oneFreqList.addNodeFromTail(key, val);
        } else {
            this.countMap[1] = new DoubleLinkListWithHashMap();
            this.countMap[1].addNodeFromTail(key, val);
        }
        this.freqMap[key] = 1;
        this.count ++;
    } else {
        const leastFrequentlyUsedList = this.countMap[this.minFreq];

        const { result, key: _key } = leastFrequentlyUsedList.removeHead();
        if (result < 0) {
            delete this.countMap[this.minFreq];
        }
        delete this.freqMap[_key];
        if (!this.countMap[1]) {
            const list = new DoubleLinkListWithHashMap();
            this.countMap[1] = list; 
        }
        this.countMap[1].addNodeFromTail(key, val);
        this.minFreq = 1;
        this.freqMap[key] = 1;
    }   
};

function DoubleLinkListWithHashMap(nodeCtor = null) {
    this.head = this.tail = null;
    this.nodeCtor = nodeCtor || ListNode;
    this.nodeMap = {};
}

function ListNode(val) {
    this.val = val;
    this.next = this.prev = null;
}

DoubleLinkListWithHashMap.prototype.addNodeFromTail = function(key, val) {
    const newNode = new this.nodeCtor(val);
    newNode._key = key;
    this.nodeMap[key] = newNode;

    if (!this.head) {
        this.head = this.tail = newNode;
    } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
    }

    return newNode;
}

DoubleLinkListWithHashMap.prototype.getAndRemove = function(key) {
    const node = this.nodeMap[key];

    if (!node) {
        delete this.nodeMap[key];
        return {
            result: -1,
            val: -1
        };
    }

    const isEmpty  = this.removeNode(key);
    return {
        result: isEmpty ? -1 : 1,
        val: node.val
    };
}

DoubleLinkListWithHashMap.prototype.removeNode = function(key) {
    const node = this.nodeMap[key];
    
    if (!node) {
        delete this.nodeMap[key];
        return;
    }

    const next = node.next;
    const prev = node.prev;

    node.prev = null;
    node.next = null;

    if (next) {
        next.prev = null;
        if (prev) {
            prev.next = next;
        } else {
            this.head = next;
        }
    } else {
        this.tail = prev;
    }

    if (prev) {
        prev.next = null;
        if (next) {
            next.prev = prev;
        } else {
            this.tail = prev;
        }
    } else {
        this.head = next;
    }

    return this.head === null;
}

DoubleLinkListWithHashMap.prototype.removeHead = function() {
    const head = this.head;

    if (this.head === null) {
        return {
            result: -1,
            key: -1
        };
    }

    const isEmpty = this.removeNode(head._key);

    return {
        result: isEmpty ? -1 : 1,
        key: head._key
    };
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// let cache = new LFUCache( 2 /* capacity (缓存容量) */ );

// cache.put(1, 1);
// cache.put(2, 2);
// // console.log(cache);
// console.log(cache.get(1));       // 返回 1
// cache.put(3, 3);    // 去除 key 2
// console.log(cache.get(2));       // 返回 -1 (未找到key 2)
// console.log(cache.get(3));       // 返回 3
// cache.put(4, 4);    // 去除 key 1
// console.log(cache.get(1));       // 返回 -1 (未找到 key 1)
// console.log(cache.get(3));       // 返回 3
// console.log(cache.get(4));       // 返回 4

function _test (testObj, opr, args) {
    let res = [];
    for (let i = 1, len = opr.length; i < len; i ++) {
        let ret = testObj[opr[i]].apply(testObj, args[i]);
        if (!ret) {
            res.push(null);
        } else {
            res.push(ret);
        }
    }

    return res;
}

function Test(opr, args, answer) {
    const k = args[0][0];

    let res = [null, ..._test(new LFUCache(k), opr, args)];

    return res.toString() === answer.toString();
}

console.log(Test(["LFUCache","put","put","put","put","get"], [[2],[3,1],[2,1],[2,2],[4,4],[2]], [null,null,null,null,null,2]));
console.log(Test(["LFUCache","put","put","put","put","get","get"], [[2],[2,1],[1,1],[2,3],[4,1],[1],[2]], [null,null,null,null,null,-1,3]));
console.log(Test(["LFUCache","put","put","get","put","put","get"],[[2],[2,1],[2,2],[2],[1,1],[4,1],[2]], [null,null,null,2,null,null,2]));
console.log(Test(["LFUCache","put","put","put","put","get","get","get","get","put","get","get","get","get","get"],[[3],[1,1],[2,2],[3,3],[4,4],[4],[3],[2],[1],[5,5],[1],[2],[3],[4],[5]], [null,null,null,null,null,4,3,2,-1,null,-1,2,3,-1,5]));
console.log(Test(
    ["LFUCache","put","put","put","put","put","get","put","get","get","put","get","put","put","put","get","put","get","get","get","get","put","put","get","get","get","put","put","get","put","get","put","get","get","get","put","put","put","get","put","get","get","put","put","get","put","put","put","put","get","put","put","get","put","put","get","put","put","put","put","put","get","put","put","get","put","get","get","get","put","get","get","put","put","put","put","get","put","put","put","put","get","get","get","put","put","put","get","put","put","put","get","put","put","put","get","get","get","put","put","put","put","get","put","put","put","put","put","put","put"],
    [[10],[10,13],[3,17],[6,11],[10,5],[9,10],[13],[2,19],[2],[3],[5,25],[8],[9,22],[5,5],[1,30],[11],[9,12],[7],[5],[8],[9],[4,30],[9,3],[9],[10],[10],[6,14],[3,1],[3],[10,11],[8],[2,14],[1],[5],[4],[11,4],[12,24],[5,18],[13],[7,23],[8],[12],[3,27],[2,12],[5],[2,9],[13,4],[8,18],[1,7],[6],[9,29],[8,21],[5],[6,30],[1,12],[10],[4,15],[7,22],[11,26],[8,17],[9,29],[5],[3,4],[11,30],[12],[4,29],[3],[9],[6],[3,4],[1],[10],[3,29],[10,28],[1,20],[11,13],[3],[3,12],[3,8],[10,9],[3,26],[8],[7],[5],[13,17],[2,27],[11,15],[12],[9,19],[2,15],[3,16],[1],[12,17],[9,1],[6,19],[4],[5],[5],[8,1],[11,7],[5,2],[9,28],[1],[2,2],[7,4],[4,22],[7,24],[9,26],[13,28],[11,26]],
    [null,null,null,null,null,null,-1,null,19,17,null,-1,null,null,null,-1,null,-1,5,-1,12,null,null,3,5,5,null,null,1,null,-1,null,30,5,30,null,null,null,-1,null,-1,24,null,null,18,null,null,null,null,14,null,null,18,null,null,11,null,null,null,null,null,18,null,null,-1,null,4,29,30,null,12,11,null,null,null,null,29,null,null,null,null,17,-1,18,null,null,null,-1,null,null,null,20,null,null,null,29,18,18,null,null,null,null,20,null,null,null,null,null,null,null]
))