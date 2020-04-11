const { getTrieFromStringArr } = require('./make');
const { Trie } = require('./ctor');

let data = ['fellow', 'follow', 'hello', 'world'];
let trie = getTrieFromStringArr(data, new Trie.builtInIterator.stringIterator(false));

console.log(trie.root);