const { Trie } = require('./ctor');

function getTrieFromStringArr(data, iterator) {
    const trie = new Trie();
    if (iterator) {
        trie.use(iterator);
    }
    data.forEach(str => {
        trie.insert(str);
    });

    return trie;
}

exports.getTrieFromStringArr = getTrieFromStringArr;