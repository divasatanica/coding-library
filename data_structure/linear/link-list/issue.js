let { getLinkedListWithNoCircle } = require('./make'),
    {LinkStack} = require('../../stack/ctor'),
    exampleDataSet = [1, 3, 2, 4, 6, 5],
    exampleDataSetOdd = exampleDataSet.concat([7]),
    { ListNode } = require('./ctor');

let listEven = getLinkedListWithNoCircle(exampleDataSet),
    listOdd = getLinkedListWithNoCircle(exampleDataSetOdd);

/**
 * @param {ListNode} head
 * @description 倒序打印链表，使用栈来辅助
 */

function reverseLogList (head) {
  let stack = new LinkStack(),
      buf = head,
      nodeValue = null;
  if (head === null) {
    return console.log('empty');
  }
  do {
    stack.push(buf.value);
    buf = buf.next;
  } while (buf.next)
  stack.push(buf.value);

  while (nodeValue = stack.pop()) { 
    console.log(nodeValue);
  }
  return;
}

// reverseLogList(getLinkedListWithNoCircle(exampleDataSet).getHead());

/**
 * @param {ListNode} head
 * @description 查找单链表的中间节点
 */
function findTheMiddleNode (head) {
  let first = head,
      second = head;
  while (second.next !== null && second.next.next !== null) {
    first = first.next;
    second = second.next.next;
  }
  return first;
}

// console.log(findTheMiddleNode(listOdd.getHead()));

/**
 * @param {ListNode} head1
 * @param {ListNode} head2
 * @returns {ListNode}
 */
function mergeList (head1, head2) {
    let result = new ListNode({
        next: null,
        value: null
      }),
      temp = result;
  if (head1 === null || head2 === null) {
    return head1 || head2;
  }
  while (head1 !== null && head2 !== null) {
    if (head1.value < head2.value) {
      temp.next = head1;
      head1 = head1.next;
    } else {
      temp.next = head2;
      head2 = head2.next;
    }
    temp = temp.next;
  }

  // 执行完上面的while循环后一定有有一条链表已经遍历完成
  // 接下来只需把另一条链表剩下的部分拼到后面即可
  if (head1 !== null) {
    temp.next = head1;
  }
  
  if (head2 !== null) {
    temp.next = head2;
  }
  
  return result.next;
}

let orderedList1 = getLinkedListWithNoCircle([1, 4, 6, 8]),
    orderedList2 = getLinkedListWithNoCircle([2, 3, 7, 9, 10]),
    mergedList = mergeList(orderedList1.getHead(), orderedList2.getHead());

reverseLogList(mergedList);

