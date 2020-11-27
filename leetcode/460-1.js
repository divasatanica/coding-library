/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
    this.capacity = 0;
    this.maxCapacity = capacity;
    this.cacheMap = {};
    this.freqMap = {};
};

/** 
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
    const targetCache = this.cacheMap[key];
    // 是否命中缓存
    if (targetCache) {
        // 增加freqMap里的freq记录
        this.update(key);
        // 增加cacheMap里的freq记录
        targetCache.freq++;
        // 返回get结果
        return targetCache.value;
    } else {
        return -1;
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
    if (this.maxCapacity === 0) return;
    if (!this.cacheMap[key]) {
        if (this.capacity === this.maxCapacity) {
            // 缓冲区满了，清除
            this.clean();
        }
        // 没有该key记录，则增加缓存记录
        this.cacheMap[key] = {
            value: value,
            freq: 1
        };
        // 将缓存记录到freqMap上
        if (!this.freqMap[1]) {
            this.freqMap[1] = new LinkedList();
        }
        this.freqMap[1].append(key);
        this.capacity++;
    } else {
        // 有该记录，则覆盖value值，且访问次数++
        this.update(key);
        this.cacheMap[key].value = value;
        this.cacheMap[key].freq++;
    }
};

/**
 * 增加freqMap里所记录的访问次数
 * @param {number} key
 */
LFUCache.prototype.update = function(key) {
    let targetFreq = this.cacheMap[key].freq;
    // 删除旧频率记录
    if (this.freqMap[targetFreq].delete(key) === -1) {
        // 删除后，该频率下无其他缓存，则释放该频率所记录的空间
        delete this.freqMap[targetFreq];
    }
    // 频率++
    targetFreq++;
    // 记录到新的频率记录去
    if (!this.freqMap[targetFreq]) {
        this.freqMap[targetFreq] = new LinkedList();
    }
    this.freqMap[targetFreq].append(key);
}

/**
 * 去除最不常访问的缓存
 * @param {number} key
 */
LFUCache.prototype.clean = function(key) {
    // 找到频率最低的元素
    const min = this.freqMap[Object.keys(this.freqMap)[0]];
    // 删除该元素的缓存
    delete this.cacheMap[min.head.next.value];
    // 删除该元素在freqMap里的记录
    if(min.unshift() === -1) {
        // freqMap该频率下无其他记录，则释放该频率记录的空间
        delete this.freqMap[Object.keys(this.freqMap)[0]];
    }
    this.capacity--;
}

/**
 * 自定义链表节点
 * @param {number} value
 */
var Node = function(value = NaN) {
    // 这里的value，用来保存key值
    this.value = value;
    this.next = null;
}

/**
 * 自定义链表
 */
var LinkedList = function() {
    this.head = new Node();
    this.end = this.head;
}

/**
 * 在链表尾节点后插入节点
 * @param {number} value
 */
LinkedList.prototype.append = function(value) {
    this.end.next = new Node(value);
    this.end = this.end.next;
}

/**
 * 在链表中删除目标节点
 * @param {number} value
 * @return {number} -1:链表为空 0:未找到删除目标 1:删除成功
 */
LinkedList.prototype.delete = function(value) {
    let last = this.head;
    let node = this.head.next;
    // 找目标节点
    while (node && node.value !== value) {
        last = last.next;
        node = node.next;
    }
    if (node && node.value === value) {
        last.next = node.next;
        if (node === this.end) {
            this.end = last;
            if (this.end === this.head) {
                return -1;
            }
        }
        return 1;
    }
    return 0;
}

/**
 * 删除链表头节点后的第一个节点
 * @return {number} -1:链表为空
 */
LinkedList.prototype.unshift = function() {
    if (this.head.next === this.end) {
        return -1;
    }
    this.head.next = this.head.next.next;
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

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