const { genBSTByArr } = require('./make');

let arr = [6, 0,3, 1,2,,4,5]

let bst = genBSTByArr(arr, 2);

// bst.preTraversal();

// console.log('*************');

// bst.midTraversal();

// console.log('*************');

// bst.backTraversal();

// console.log(bst);

// console.log(bst.getRank(3));
// console.log(bst.getRank(22))
// console.log(bst.select(7));
// console.log(bst);

// console.log(bst.root.right.left.right.value);

function midTraverse (treeRoot, cb) {
    const stack = [];
    let root = treeRoot.root;
    if (!root) {
        return;
    }
    
    while (root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        if (stack.length) {
            let node = stack.pop();
            cb(node.value);
            root = node.right;
        }
    }
}

function preTraverse (treeRoot, cb) {
    const stack = [];
    let root = treeRoot.root;
    if (!root) {
        return;
    }

    while(root || stack.length) {
        while (root) {
            cb(root.value);
            stack.push(root);
            root = root.left;
        }

        if (stack.length) {
            let node = stack.pop();
            root = node.right;
        }
    }
}
console.log(bst);
preTraverse(bst, console.log);
console.log("*****");
midTraverse(bst, console.log);