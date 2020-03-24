let nodes = [
    {id: 3, value: 3, pid: 0},
    {id: 1, value: 1, pid: 3},
    {id: 2, value: 2, pid: 3},
    {id: 4, value: 4, pid: 1},
    {id: 5, value: 5, pid: 1},
    {id: 7, value: 7, pid: 1},
    {id: 8, value: 8, pid: 5},
    {id: 9, value: 9, pid: 7},
    {id: 6, value: 6, pid: 2},
    {id: 11, value: 11, pid: 6},
    {id: 10, value: 10, pid: 6}
];

class NTreeNode {
    constructor(val, children) {
        this.val = val;
        this.id = val;
        this.children = children;
    }
}

function getNTree (nodes) {
    const GOD_NODE_ID = '0';

    let childrenMap = nodes.reduce((acc, curr) => {
        if (acc[item.pid]) {
            return {
                ...acc,
                [curr.pid]: acc[item.pid].concat(curr.id)
            };
        }
        return {
            ...acc,
            [curr.pid]: [curr.id]
        };
    }, {});

    let queue = [genNTreeNode(...childrenMap[GOD_NODE_ID], [])],
        root = null;

    while (queue.length) {
        let node = queue.shift();
        let children = childrenMap[node.id] ? childrenMap[node.id].map(item => genNTreeNode(item, [])) : [];
        if (!root) {
            root = node;
        }
        node.children = children;
        queue.push.apply(queue, children); 
    }

    return root;
}

function genNTreeNode (id, children) {
    return new NTreeNode(id, children);
}

getNTree(nodes);