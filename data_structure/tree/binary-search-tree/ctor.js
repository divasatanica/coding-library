class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
        this.size = 1;
    }
}
class BST {
    constructor() {
        this.root = null
        this.size = 0
    }
    getSize() {
        return this.size
    }
    isEmpty() {
        return this.size === 0
    }
    addNode(v) {
        this.root = this._addChild(this.root, v)
    }

    _getSize (node) {
        return node ? node.size : 0;
    }

    getRank (v) {
        let rank = this._getRank(this.root, v);

        // -1表示要寻找的值不在这棵树上
        // 排名从0开始
        return rank ? rank - 1 : -1;
    }

    _getRank (node, v) {
        if (!node) {
            return null;
        }
        let value = node.value,
            result;
        if (value < v) {
            result = this._getSize(node.left) + 1 + this._getRank(node.right, v);
        } else if (value === v) {
            result = this._getSize(node.left) + 1;
        } else {
            result = this._getRank(node.left, v);
        }
        return result;
    }

    // 添加节点时，需要比较添加的节点值和当前
    // 节点值的大小
    _addChild(node, v) {
        if (!node) {
            this.size++
            return new Node(v)
        }

        if (node.value > v) {
            node.size ++;
            node.left = this._addChild(node.left, v)
        } else if (node.value < v) {
            node.size ++;
            node.right = this._addChild(node.right, v)
        }
        return node
    }

    // 先序遍历可用于打印树的结构
    // 先序遍历先访问根节点，然后访问左节点，最后访问右节点。
    preTraversal() {
        this._pre(this.root)
    }
    _pre(node) {
        if (node) {
            console.log(node.value)
            this._pre(node.left)
            this._pre(node.right)
        }
    }
    // 中序遍历可用于排序
    // 对于 BST 来说，中序遍历可以实现一次遍历就
    // 得到有序的值
    // 中序遍历表示先访问左节点，然后访问根节点，最后访问右节点。
    midTraversal() {
        this._mid(this.root)
    }
    _mid(node) {
        if (node) {
            this._mid(node.left)
            console.log(node.value)
            this._mid(node.right)
        }
    }
    // 后序遍历可用于先操作子节点
    // 再操作父节点的场景
    // 后序遍历表示先访问左节点，然后访问右节点，最后访问根节点。
    backTraversal() {
        this._back(this.root)
    }
    _back(node) {
        if (node) {
            this._back(node.left)
            this._back(node.right)
            console.log(node.value)
        }
    }

    select(k) {
        let node = this._select(this.root, k)
        return node ? node.value : null
    }
    _select(node, k) {
        if (!node) return null
        // 先获取左子树下有几个节点
        let size = node.left ? node.left.size : 0
        // 判断 size 是否大于 k
        // 如果大于 k，代表所需要的节点在左节点
        if (size > k) return this._select(node.left, k)
        // 如果小于 k，代表所需要的节点在右节点
        // 注意这里需要重新计算 k，减去根节点除了右子树的节点数量
        if (size < k) return this._select(node.right, k - size - 1)
        return node
    }
}

module.exports = {
    BST
};