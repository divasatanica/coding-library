class TrieNode {
    constructor(val) {
        this.val = val;
        this.children = {};
        this.childrenCount = 0;
    }
}

class Trie {
    constructor(getInsertResult) {
        this.root = new TrieNode();
        this.getInsertResult = getInsertResult || () => true;
    }

    insert(data) {
        if (!this.iterator) {
            this.use(Trie.builtInIterator.stringIterator, false);
        }
        const iterator = this.iterator(data);
        let cur = this.root;
        let isNew = false;
        let char;

        if (!iterator.next) {
            throw new Error('Arguments[0] is not iterable');
        }

        while (char = iterator.next()) {
            const index = char.charCodeAt();

            if (!cur.children[index]) {
                isNew = true;
                cur.children[index] = new TrieNode(char);
                cur.childrenCount ++;
            }
            cur = cur.children[index];
        }

        return this.getInsertResult(isNew, data);
    }

    use(iterator, ...args) {
        this.iterator = function(data) {
            return new iterator(data, ...args);
        };
    }

    static get builtInIterator() {
        return {
            stringIterator: StringIterator
        }
    }
}

class StringIterator {
    constructor(data, reverse = false) {
        this.reverse = reverse;
        this.data = data;
        this.cur = reverse ? data.length - 1 : 0;
    }

    next() {
        if (this.cur >= this.data.length || this.cur < 0) {
            return null;
        }
        const char = this.data[this.cur];
        this.cur += (this.reverse ? -1 : 1);

        return char;
    }
}

exports.Trie = Trie;