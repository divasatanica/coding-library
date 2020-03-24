const { BST } = require('./ctor');

function genBSTByArr (arr, rootIndex = 0) {
    let bst = new BST();

    bst.addNode(arr.splice(rootIndex, 1)[0]);

    arr.forEach(item => {
        bst.addNode(item);
    });

    return bst;
}

module.exports = {
    genBSTByArr
};