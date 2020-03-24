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
                continue;
            }
        }

        stack.push(token);
    }

    let p = peek(stack);
    while (stack.length > 1 && (p === '/' || p === '.') ) {
        stack.pop();
        p = peek(stack);
    }
    
    return `/${stack.join('/')}`;
};

console.log(simplifyPath('/...'));

function peek(stack) {
    return stack[stack.length - 1];
}

function tokenize(path) {
    let buf = '';
    let result = [];
    for (let i = 0, len = path.length; i < len; i ++) {
        if (/[a-zA-Z0-9]/.test(path[i])) {
            buf += path[i];
            continue;
        } 
        if (path[i] === '/') {
            if (buf.length > 0) {
                result.push(buf);
                buf = '';
            }
            result.push('/');
            continue;
        }
        if (path[i] === '.') {
            buf += path[i];
            continue;
        }
    }

    if (buf.length > 0) {
        result.push(buf);
    }

    return [...result, '/'];
}