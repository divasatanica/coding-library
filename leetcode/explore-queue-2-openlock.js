/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */
var openLock = function(deadends, target) {
    console.time('openlock');
    const deadMap = {};
    const visitedMap = {};
    const queue = ['0000'];
    let result = [];
    let step = 0;
    deadends.forEach((n, index) => {
        deadMap[n] = index;
    });
    
    while (queue.length || result.length) {
        let strs = queue.shift();
        if (!strs) {
            queue.push.apply(queue, result);
            result = [];
            step ++;
            continue;
        }
        if (strs in deadMap) {
            continue;
        }
        if (strs in visitedMap) {
            continue;
        }
        let strArr = strs.split('');
        visitedMap[strs] = 1;
        if (strs === target) {
            return step;
        }
        let pre = strArr.slice(0, 0);
        let post = strArr.slice(1);
        for (let i = 0; i < 4; i ++) {
            const upResult = [...pre, next(strArr[i], 1), ...post].join('');
            const downResult = [...pre, next(strArr[i], 0), ...post].join('');

            if (!(upResult in deadMap) && !(upResult in visitedMap)) {
                result.push(upResult);
            }
            if (!(downResult in deadMap) && !(downResult in visitedMap)) {
                result.push(downResult);
            }
            pre.push(strArr[i]);
            post.shift();
        }
        pre = null;
        post = null;
        if (queue.length < 1) {
            queue.push.apply(queue, result);
            result = [];
            step ++;
        }
    }
    console.timeEnd('openlock');
    return -1;
};

function next(curr, direction) {

    if (direction === 1) {
        if (curr === '9') {
            return '0';
        }
        return `${Number(curr)+1}`;
    }
    if (curr === '0') {
        return '9';
    }
    return `${Number(curr)-1}`;
}

// console.log(openLock(["8888"], "0009"));
// console.log(openLock(["0201","0101","0102","1212","2002"], "0202"));
// console.log(openLock(["1301","0113","0202","0122","3012","0131","0200","0203","1232","0222"],"2311"));

openLock(["0201","0101","0102","1212","2002"], "0202")