/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    const stack = [];
    const tokenArr = path.split('/').filter(i => i);

    for (let i = 0, len = tokenArr.length; i < len; i ++) {
        const token = tokenArr[i];

        if (token === '.') {
            continue;
        }

        if (token === '..') {
            if (stack.length > 0) {
                stack.pop();
            }
            continue;
        }

        stack.push(token);
    }
    
    return `/${stack.join('/')}`;
};

console.log(simplifyPath('/...'));
