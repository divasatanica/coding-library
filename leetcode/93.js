/**
 * 回溯算法就是在一棵树上做 DFS
 * 将数字字符串可能分割的情况构造成一棵树，对这棵树进行深度优先搜索
 * 中途遇到不符合的情况进行剪枝
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    let res = []
    if (s.length < 4 || s.length > 12) {
        return res;
    }
    let path = [];
    let split = 0;
    dfs(s, s.length, split, 0, path, res);

    return res;
};

function isValidIPSegment(s, begin, end) {
    let len = end - begin + 1;

    if (len > 1 && s[begin] === '0') {
        return -1;
    }

    let res = 0;

    for (let i = begin; i <= end; i ++) {
        res = res * 10 + Number(s[i]);
    }

    if (res > 255) {
        return -1;
    }
    return res;
}

function dfs(s, len, split, begin, path, res) {
    if (begin === len) {
        if (split === 4) {
            res.push(path.join('.'));
        }
        return;
    }

    if (len - begin < (4 - split) || len - begin > 3 * (4 - split)) {
        return;
    }

    for (let i = 0; i <= 3; i ++) {
        if (begin + i >= len) {
            break;
        }
        let ipSegment = isValidIPSegment(s, begin, begin + i);
        if (ipSegment >= 0) {
            path.push(ipSegment);
            dfs(s, len, split + 1, begin + i + 1, path, res);
            path.pop();
        }
    }
}

console.log(restoreIpAddresses('25525511135'))