const { getTrieFromStringArr } = require('./make');
const { Trie } = require('./ctor');

let data = ['fellow', 'follow', 'hello', 'world'];
let trie = getTrieFromStringArr(data, Trie.builtInIterator.stringIterator, [true]);

console.log(trie.root);