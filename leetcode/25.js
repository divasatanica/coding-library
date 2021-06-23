/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var reverseKGroup = function(head, k) {
  // 如果 k 为 1，那么代表不需要翻转，直接返回 head
  if (k === 1 || head == null) {
    return head;
  }
  let p = head;
  let q = head;
  // res 这个变量只会被赋值一次，用来储存第一次翻转后的链表头节点，其也是最后结果链表的头节点
  let res = null;
  // 用来计数，表示当前已遍历到 k 个节点中的第 c 个节点
  let c = 0;
  // 这个变量用于处理链表长度为 k 的整数倍的情况
  let hasReversed = false;
  // 递归翻转链表，不赘述，这里加了个 count 参数，用于增加一种提前返回的条件，即 k 个一组已经翻转完成
  const reverse = (pre, curr, count = k) => {
    if (curr == null || count <= 0) {
      return pre;
    }
    const _next = curr.next;
    curr.next = pre;

    return reverse(curr, _next, count - 1);
  }

  while (q) {
    if (c < k) {
      c ++;
      q = q.next;
      // 当链表长度为 k 的整数倍时，最后一组的链表由于无法进入到 else 语句中而未被翻转
      // 因此在这里做一个 hasReversed 置为 false 的操作，用于进入到 while 循环后面的 if 语句中，将最后一组k个节点进行翻转
      if (c === k) {
        hasReversed = false;
      }
    } else {
      // 这里置成 true 是考虑链表长度刚好为 k 时，不会走到此循环中，从而能让代码进入到 while 循环后面的语句中，将整个链表 k 个节点进行翻转
      hasReversed = true;
      c = 0;
      /*
       * 代码开头分别有 p,q 两个指针，将 q 作为探路的指针，当遍历完 k 个节点后，q 会停在第 n * k + 1 个节点上，
       * 即下一组需要反转的节点的第一个节点。此时，先保留好翻转前链表的头节点 _p，因为翻转后它会成为尾节点，用于和下一组节点连接起来。
       * 接着进行链表的翻转，由于有 count 参数的限制，每次只会翻转 k 个节点，翻转完后返回头节点。
       * 若 res 为空，将翻转后的头节点赋值给 res，只需要赋值一次；否则将 _q 指针的 next 指针指向翻转后的头节点（_q 的作用后面再说）
       * 接着将 p 指针指向 q 指针指向的节点，此时 p,q 指针都进入到下一组节点中。
       * 将先前保留的尾节点 _p 的 next 指针指向 p，这样就把当前这组翻转好的节点和下一组未翻转的节点连接起来了，然后重新保留尾节点 _q。
       * 因为每次翻转前 _p 都会变成当前这组节点的翻转前的头节点，所以需要在翻转后用另一个指针指向这个节点，在第二次及以后的翻转过程中，
       * _q 指向的就是前一组链表的尾节点，这样就可以把前一组翻转好的节点和当前这组翻转好的节点连接起来。
       * 其实 _q 和 res 的作用是一样的，只不过 res 只能用一次，因为 res 是作为本函数的返回结果。
       */
      let _p = p;
      const reversed = reverse(null, p);
      if (!res) {
        res = reversed;
      } else {
        _q.next = reversed;
      }
      p = q;
      _p.next = p;
      _q = _p;
    }
  }

  // 进入到此循环，代表链表长度为 k 的整数倍，最后 k 个节点无法在 while 循环中翻转，因此放到这里翻转
  if (!hasReversed) {
    let _p = p;
    const reversed = reverse(null, p);
    if (!res) {
      res = reversed;
    } else {
      _q.next = reversed;
    }
    p = q;
    _p.next = p;
    _q = _p;
  }

  return res;
};

const { getLinkedListWithNoCircle } = require('../data_structure/linear/link-list/make');

const list = getLinkedListWithNoCircle([1,2,3,4,5,6,7,8]);

const res = reverseKGroup(list.getHead(), 3);

// console.log(res);

let p = res;
let arr = [];
while (p) {
  arr.push(p.val);
  p = p.next;
}

console.log(arr);