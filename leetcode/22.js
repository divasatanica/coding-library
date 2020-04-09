/**
 * 可以将问题抽象成一棵二叉树，根节点为空或者为 '('，
 * 每增加一个括号就是添加左节点('(')或右节点(')')，在这颗树上做深度优先搜索并剪枝
 * 剪枝条件：右侧括号数量大于左侧括号数量、左侧括号数量或右侧括号数量大于 n
 */
/**
 * version1
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];
    if (n === 0) {
        return [''];
    }

    dfs(res, '(', 1, 0, n);

    return res;
};

function dfs(res, path, leftCount, rightCount, maxCount) {
    if (leftCount >= maxCount || rightCount >= maxCount) {
        if (leftCount === rightCount) {
            if (checkParenthesis(path)) {
                res.push(path);
                return;
            }
            return;
        }
        if (leftCount > maxCount || rightCount > maxCount) {
            return;
        }
        dfs(res, path + ')', leftCount, rightCount + 1, maxCount);
        return;
    }

    dfs(res, path + '(', leftCount + 1, rightCount, maxCount);
    dfs(res, path + ')', leftCount, rightCount + 1, maxCount);
}

function checkParenthesis(str) {
    const strs = str.split('');
    const stack = [];

    for (let i = 0, len = strs.length; i < len; i ++) {
        const c = strs[i];

        if (c === '(') {
            stack.push(c);
        } else {
            if (stack.length > 0) {
                stack.pop();
            }
        }
    }

    return stack.length === 0;
}


/**
 * version2 改良版，无需校验括号匹配
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    const res = [];

    dfs(res, '', 0, 0, n);
    return res;
};

function dfs(res, path, leftCount, rightCount, maxCount) {
    if (leftCount > maxCount || rightCount > maxCount || rightCount > leftCount) {
        return;
    }

    if (leftCount === rightCount && leftCount === maxCount) {
        res.push(path);
        return;
    }

    dfs(res, path + '(', leftCount + 1, rightCount, maxCount);
    dfs(res, path + ')', leftCount, rightCount + 1, maxCount);
}

console.log(generateParenthesis(2));