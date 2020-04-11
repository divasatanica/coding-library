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
        this.getInsertResult = getInsertResult || function() { return true; };
    }

    insert(data) {
        if (!this.iterator) {
            this.use(new Trie.builtInIterator.stringIterator(false));
        }
        this.iterator.load(data);
        let cur = this.root;
        let isNew = false;
        let char;

        if (!this.iterator.next) {
            throw new Error('Arguments[0] is not iterable');
        }

        while (char = this.iterator.next()) {
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

    /**
     * Use this method to inject itertor instance for insertion.
     * You should implment 'load' method for loading new string and
     * 'next' method to iterate on the string loaded by 'load' method
     * or just inject the builtin iterator instance.
     * @param {Iterator} iterator 
     * @param  {...any} args 
     */
    use(iterator) {

        if (!iterator || !iterator.next || !iterator.load) {
            throw new TypeError('Implementation for \'load\' and \'next\' missing');
        }

        this.iterator = iterator;
    }

    static get builtInIterator() {
        return {
            stringIterator: StringIterator
        }
    }
}

class StringIterator {
    constructor(reverse = false) {
        this.reverse = reverse;
    }

    load(data) {
        this.cur = this.reverse ? data.length - 1 : 0;
        this.data = data;
    }

    next() {
        if (!this.data) {
            return null;
        }
        if (this.cur >= this.data.length || this.cur < 0) {
            return null;
        }
        const char = this.data[this.cur];
        this.cur += (this.reverse ? -1 : 1);

        return char;
    }
}

exports.Trie = Trie;