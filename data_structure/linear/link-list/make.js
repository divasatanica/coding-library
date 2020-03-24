let {ListNode, LinkedList} = require('./ctor');

/**
 * @description 创建链表，值的集合为数组dataSet
 * @param {Array<Number>} dataSet
 * @returns {LinkedList}
 */

let getLinkedListWithNoCircle = function (dataSet) {
  if (dataSet.length === 0) {
    return new LinkedList({
      head: null
    });
  }
  let nodeArr = dataSet.map(item => {
    return new ListNode({
      value: item,
      next: null
    });
  }).map((value, index, array) => {
    return Object.assign(value, {
      next: array[index + 1] || null
    });
  });
  return new LinkedList({
    head: nodeArr[0]
  });
}

module.exports = {
  getLinkedListWithNoCircle
}