// 使用一个 pool 变量作为并发池,每当一个任务完成就把它从并发池中移除,并将队列中下一个任务加入池中的对应位置
// 初始化时分别储存队列索引 index 和池索引 poolIndex,分别用于设置结果和加入池中对应空缺位置

function pLimit(promises, limit = 3) {
  const transfer = (raw, index, poolIndex) => {
    return () => {
      console.log('Task no.', index + 1, 'start');
      return raw().then(res => {
        return {
          result: res,
          index,
          poolIndex
        }
      });
    };
  }
  let count = 0;
  const gResult = [];
  const pool = promises.slice(0, limit).map((item, index) => transfer(item, index, index));
  let i = limit;
  let gResolve;
  let gReject;
  const res = new Promise((resolve, reject) => {
    gReject = reject;
    gResolve = resolve;
  })

  const getNextTask = ({ index, result, poolIndex }) => {
    console.log('Task no.', index + 1, 'finished');
    pool[poolIndex] = null;
    // console.log('Finished', pool.map(item => item ? '================>' : ''))
    gResult[index] = result;
    count ++;
    if (count >= promises.length) {
      console.log('Resolve')
      gResolve(gResult);
    } else {
      if (i < promises.length) {
        pool[poolIndex] = transfer(promises[i], i, poolIndex);
        pool[poolIndex]().then(getNextTask);
        console.log('Started', pool.map(() => '================>'))
        i ++;
      }
    }
  }

  pool.forEach(item => {
    item().then(getNextTask);
  });
  return res;
}

const finishAfter = (p, timeout) => () => new Promise(resolve => {
  setTimeout(() => {
    resolve(p);
  }, timeout);
});

// const tasks = [
//   finishAfter(1, 3500),
//   finishAfter(2, 800),
//   finishAfter(3, 600),
//   finishAfter(4, 1000),
//   finishAfter(5, 1500),
//   finishAfter(6, 2000)
// ]
const getRandomTimeout = index => {
  const res = Math.abs(3000 * Math.random() + (Math.random() <= 0.5 ? -index * 100 : index * 50));
  // console.log('Timeout for index', index, 'is', res, 'ms');
  return res;
};
const tasks = Array.from({ length: 100 }).map((_, index) => finishAfter(index, getRandomTimeout(index)))
console.time('start')
pLimit(tasks, 10).then(res => {
  console.log(res)
  console.timeEnd('start');
});