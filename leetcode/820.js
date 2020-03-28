function TrieNode(val) {
    this.val = val;
    this.children = [];
}

function Trie() {
    this.root = new TrieNode();
}

Trie.prototype.insert = function(str) {
    let cur = this.root;
    let isNew = false;

    for (let i = str.length - 1; i >= 0; i --) {
        let index = str[i].charCodeAt() - 65;

        if (!cur.children[index]) {
            isNew = true;
            this.root.children[index] = new TrieNode(str[i]);
        }
        cur = cur.children[index];
    }

    return (isNew ? str.length + 1 : 0)
}

/**
 * 按照索引字符串的定义，拥有相同后缀的单词可以用同个字符串来编码，所以需要找到所有拥有不同后缀的字符串
 * 使用 Trie 树来完成
 * @param {string[]} words
 * @return {number}
 */
var minimumLengthEncoding = function(words) {
    const root = new Trie();
    words.sort((a, b) => b.length - a.length);

    return words.reduce((acc, curr) => {
        return acc + root.insert(curr);
    }, 0);
};