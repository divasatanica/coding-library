const { getLinkedListWithNoCircle } = require("../data_structure/linear/link-list/make");
const l1 = getLinkedListWithNoCircle([1,2,3]);
const l2 = getLinkedListWithNoCircle([2,3,4,5]);
const l3 = getLinkedListWithNoCircle([4,5,6,7]);

function ListNode(val) {
    this.val = val;
    this.next = null;
}

var mergeTwoLists = function(l1, l2) {
    if (l1 === null || l2 === null) {
        return l1 || l2;
    }
    
    let result = new ListNode(null),
        tmp = result;
    
    
    while (l1 !== null && l2 !== null) {
        if (l1.val < l2.val) {
            tmp.next = l1;
            l1 = l1.next;
        } else {
            tmp.next = l2;
            l2 = l2.next;
        }
        tmp = tmp.next;
    }
    
    if (l1 !== null) {
        tmp.next = l1;
    }
    
    if (l2 !== null) {
        tmp.next = l2;
    }
    
    return result.next;
};

/**
 * 写法1，这种方法消耗的内存较多，因为递归时复制了 logK 个子数组
 * @param {*} lists 
 */
var mergeKLists = function(lists) {
    if (lists.length < 1) {
        return null;
    }

    if (lists.length <= 2) {
        return mergeTwoLists(lists[0], lists[1] || null);
    }
    const mid = Math.ceil(lists.length / 2);
    
    const result = mergeTwoLists(mergeKLists(lists.slice(0, mid)), mergeKLists(lists.slice(mid)));

    return result;
};

/**
 * 基于解法1，将复制子数组改为操作索引，始终引用原始的链表数组
 * @param {*} lists 
 */
var mergeKLists = function(lists) {
    if (lists.length < 1) {
        return null;
    }

    if (lists.length <= 2) {
        return mergeTwoLists(lists[0], lists[1] || null);
    }

    function _merge(lists, start, end) {
        if (end - start < 0) {
            return null;
        }
        if (end === start) {
            return lists[start];
        }
        const mid = Math.floor(start + (end - start) / 2);
        return mergeTwoLists(_merge(lists, start, mid), _merge(lists, mid + 1, end));
    }

    return _merge(lists, 0, lists.length - 1);
}

let result = mergeKLists([l1.getHead(), l2.getHead(), l3.getHead(), null]);
let _ = [];
while (result) {
    _.push(result.val);
    result = result.next;
}
console.log(_);