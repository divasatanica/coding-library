/**
 * 构造一颗字典树，将数组中所有字符串加入到字典树中，然后遍历字典树
 * 找到子节点数为一的最深节点，由根节点到这一节点的路径上组成的字符串就是最长的公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    strs.sort((a, b) => a.length - b.length);
    const trie = new Trie();
    let maxLength = strs[0] && strs[0].length || 0;
    let res = '';
    let cur = trie.root;
    for (let i = 0, len = strs.length; i < len; i ++) {
        if (!strs[i]) {
            return res;
        }
        trie.insert(strs[i]);
    }
    
    while (cur.childrenCount === 1) {
        let keys = Object.keys(cur.children);
        cur = cur.children[keys[0]];
        if (res.length < maxLength) {
            res += cur.val;
        } else {
            return res;
        }
    }
    
    return res;
};

function TrieNode(val) {
    this.val = val;
    this.children = {};
    this.childrenCount = 0;
}

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function(str) {
    let cur = this.root;
    let isNew = false;

    for (let i = 0; i < str.length; i ++) {
        let index = str[i].charCodeAt();

        if (!cur.children[index]) {
            isNew = true;
            cur.children[index] = new TrieNode(str[i]);
            cur.childrenCount ++;
        }
        cur = cur.children[index];
    }

    return (isNew ? str.length + 1 : 0)
}

console.log(longestCommonPrefix(['a', 'aa', 'aaa']))