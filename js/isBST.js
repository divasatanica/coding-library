const { genBSTByArr } = require('../data_structure/tree/binary-search-tree/make');

function isBST (root) {
  if (root == null) {
    return false;
  }

  const _isBST = root => {
    if (root == null) {
      return true;
    }
    const rootVal = getValue(root);
    const leftVal = root.left && getValue(root.left) || -Number.MAX_VALUE;
    const rightVal = root.right && getValue(root.right) || Number.MAX_VALUE;

    return rootVal > leftVal && rootVal < rightVal && _isBST(root.left) && _isBST(root.right);
  }

  return _isBST(root);
}

function getValue(node) {
  return node.value;
}

const { root } = genBSTByArr([1,2,3], 1);

console.log(root);

console.log(isBST(root));
