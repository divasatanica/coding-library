const { Trie } = require('./ctor');

function getTrieFromStringArr(data, iterator, iteratorArgs) {
    const trie = new Trie();
    if (iterator) {
        trie.use.apply(trie, [iterator, ...iteratorArgs]);
    }
    data.forEach(str => {
        trie.insert(str);
    });

    return trie;
}

exports.getTrieFromStringArr = getTrieFromStringArr;