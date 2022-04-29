const { genBSTByArr } = require('../data_structure/tree/binary-search-tree/make');

const { root } = genBSTByArr([1,2,3,4,5,6,7,8,9], 4);

// console.log(root);

// const root = {
//   left: { left: null, right: null, value: 1},
//   right: { left: null, right: null, value: 3},
//   value: 2
// }


function swap(root) {

  if (!root) {
    return null;
  }

  if (!root.left && !root.right) {
    return root;
  }

  const oldLeft = root.left;
  root.left = swap(root.right);
  root.right = swap(oldLeft);

  return root;
}

function swap1(root) {
  if (!root) {
    return null;
  }

  if (!root.left && !root.right) {
    return root;
  }

  const stack = [root];

  while (stack.length > 0) {
    const node = stack.pop();

    if (node == null) {
      continue;
    }

    const { left, right } = node;

    node.left = right;
    node.right = left;

    stack.push(left);
    stack.push(right);
  }

  return root;
}

function dfs (root) {
  const stack = [];
  const res = [];
  let p = root;

  while (p != null || stack.length > 0) {
    while (p != null) {
      stack.push(p);
      p = p.left;
    }

    if (stack.length > 0) {
      p = stack[stack.length - 1];
      res.push(p.value);
      stack.pop();
      p = p.right;
    }
  }

  console.log('RESULT:', res);
  return res;
}

dfs(root);

const _root = swap1(root);

// console.log(_root);

dfs(_root);