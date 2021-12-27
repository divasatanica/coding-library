/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */


/**
 * @param {TreeNode} root
 */
 var CBTInserter = function(root) {
  this._root = root;
  this._totalTarget = 1;
  this._count = 0;
  this._currentLayerHead = null;
  this._shouldGoNextLevel = false;
  this.link_next(root);
};

/** 
 * @param {number} v
 * @return {number}
 */
CBTInserter.prototype.insert = function(v) {
  if (this._shouldGoNextLevel) {
    this._shouldGoNextLevel = false;
    const newNode = new TreeNode(v);
    newNode.return = this._currentLayerHead;
    this._currentLayerHead.left = newNode;
    newNode.next = null;
    this._currentLayerHead = newNode;
    return newNode.return.val;
  }

  let p = this._currentLayerHead;
  while (p.next) {
    p = p.next;
  }

  const newNode = new TreeNode(v);

  if (this._currentLayerHead === this._root) {
    const newNode = new TreeNode(v);
    this._currentLayerHead = newNode;
    newNode.return = root;
    newNode.next = null;
    this._root.left = newNode;
    return this._root.val;
  }
  
  if (p.return.left === p) {
    p.next = newNode;
    newNode.return = p.return;
    newNode.next = null;
    newNode.return.right = newNode;
  } else {
    p.next = newNode;
    newNode.return = p.return.next;
    newNode.next = null;
    newNode.return.left = newNode;
  }

  if (newNode.return.next == null && newNode.return.right === newNode) {
    this._shouldGoNextLevel = true;
  }

  return newNode.return.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function() {
  return this._root;
};

CBTInserter.prototype.link_next = function (root) {
  const queue = [root];
  let p = root;
  while (queue.length > 0) {
    const node = queue.shift();
    if (!this._currentLayerHead) {
      this._currentLayerHead = node;
      this._alternative = node;
    }
    this._count ++;
    if (this._count < this._totalTarget) {
      p.next = node;
    } else {
      this._count = 0;
      this._totalTarget *= 2;
      this._currentLayerHead = null;
    }

    if (node.left) {
      node.left.return = node;
      queue.push(node.left);
    }

    if (node.right) {
      node.right.return = node;
      node.right.next = node.next && node.next.left || null;
      node.left.next = node.right;
      queue.push(node.right);
    }
  }

  if (!this._currentLayerHead) {
    this._currentLayerHead = this._alternative;
    this._shouldGoNextLevel = true;
  }
}

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(v)
 * var param_2 = obj.get_root()
 */


 function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}


var rootRight = new TreeNode(3, new TreeNode(6), new TreeNode(7))
var rootLEFTLEFT = new TreeNode(4)
var rootLEFTRIGHT = new TreeNode(5)
var rootLeft = new TreeNode(2, rootLEFTLEFT, rootLEFTRIGHT)
// var rootRight = new TreeNode(3);
// var rootLeft = new TreeNode(2);
var root = new TreeNode(1, rootLeft, rootRight)

// var root = new TreeNode(1);

// console.log(root);
const cbt = new CBTInserter(root);
// console.log(cbt._currentLayerHead.val)

// console.log(rootLEFTLEFT.val, rootLEFTLEFT.return.val, rootLEFTLEFT.next && rootLEFTLEFT.next.val);
// console.log('-----------------')
// console.log(rootLEFTRIGHT.val, rootLEFTRIGHT.return.val, rootLEFTRIGHT.next && rootLEFTRIGHT.next.val);
// console.log('-----------------')
// console.log(rootLeft.val, rootLeft.return.val, rootLeft.next && rootLeft.next.val);
// console.log('-----------------')
// console.log(rootRight.val, rootRight.return.val, rootRight.next && rootRight.next.val);

console.log('**********************')

// console.log(cbt.insert(2))
// console.log('Res:', cbt.insert(4))
console.log('Res:',cbt.insert(8))

console.log('**********************')


// console.log(rootLEFTLEFT.val, rootLEFTLEFT.return.val, rootLEFTLEFT.next && rootLEFTLEFT.next.val);
// console.log('-----------------')
// console.log(rootLEFTRIGHT.val, rootLEFTRIGHT.return.val, rootLEFTRIGHT.next && rootLEFTRIGHT.next.val);
// console.log('-----------------')
// console.log(rootLeft.val, rootLeft.return.val, rootLeft.next && rootLeft.next.val);
// console.log('-----------------')
// console.log(rootRight.val, rootRight.return.val, rootRight.next && rootRight.next.val);
// console.log(rootRight.val, rootRight.left.val, rootRight.right.val);

console.log(cbt._currentLayerHead.val);
console.log(cbt.get_root())
