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
    console.time(`Restore ${s}`)
    dfs(s, s.length, split, 0, path, res);
    console.timeEnd(`Restore ${s}`)
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
    // 如果开始位置超出有效范围
    // 判断 split 是否为 4 (IP 段最多为 4 段)
    // 拼接出一条有效结果推入 res 数组
    if (begin === len) {
        if (split === 4) {
            res.push(path.join('.'));
        }
        return;
    }

    // 剩下的可以分割的数字,分别讨论最小和最大两个边界
    // 最小即为 (4 - 当前已分割段数) * 1,即后面待分割的段全都是 1 位数的
    // 最大即为 (4 - 当前已分割段数) * 3,即后面待分割的段全都是 3 位数的
    // 剩下的可以分割的数字位数,必须在最小和最大的边界形成的区间以内(闭区间)
    // 否则认为无法完成分割,直接 return
    if (len - begin < 1 * (4 - split) || len - begin > 3 * (4 - split)) {
        return;
    }

    // 尝试分割到 3 位数的情况 (因为 IP 段最长为 3 位数)
    for (let i = 0; i < 3; i ++) {
        if (begin + i >= len) {
            break;
        }
        let ipSegment = isValidIPSegment(s, begin, begin + i);
        if (ipSegment >= 0) {
            // 若为有效的 IP 段,使用 path 暂存
            // 递归调用 dfs 函数继续往下分割
            path.push(ipSegment);
            // split 已分割段数 + 1
            // begin 位置需要加上当前循环内导致的偏移量
            dfs(s, len, split + 1, begin + i + 1, path, res);
            // 递归过程返回后,表示后续可能的分割已经完成
            // 将上面暂存的段丢弃,将当前段多分割一位数进行一轮新的尝试
            path.pop();
        }
    }
}

console.log(restoreIpAddresses('25525111235'))
console.log(restoreIpAddresses('11112211'))