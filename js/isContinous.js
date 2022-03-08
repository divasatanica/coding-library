/**
 * 假设有一个时间轴，服务端会不定期随机更新这条轴上的数据信息(每条数据都会带上一个时间)。正常情况下，服务端下发的数据间隔不会大于0.1s。需要实现一个算法，用于判断约定时间内的数据是否全部加载。

    例如：
    假如服务段顺序下发了以下数据：
    [
      {
        time: 1,
        data: {}
      },
      {
        time: 1.05,
        data: {}
      },
      {
        time: 1.1,
        data: {}
      },
      {
        time: 1.2,
        data: {}
      },
      {
        time: 1.4,
        data: {}
      },
      {
        time: 1.5,
        data: {}
      }
    ]
    那么我们认为1到1.2s是连续的，1.2到1.4s缺失了数据
 */

class TimeLine {
  static MAX_GAP = 0.1;
  pool = [];

  push (value) {
    const insertIndex = findInsertPos(this.pool, value);

    this.pool.splice(insertIndex, 0, value);
  }

  isContinous (start, end) {
    let startIndex = findIndex(this.pool, start);
    let curr = this.pool[startIndex];
    let next = this.pool[startIndex + 1];
    while (next <= end) {
      const gap = oprFloat(next, curr, (a, b) => a - b);
      if (gap > 0.1) {
        return false;
      }

      startIndex += 1;
      curr = this.pool[startIndex];
      next = this.pool[startIndex + 1];
    }

    return true;
  }
}

function oprFloat (num1, num2, callback) {
  if (Number.isInteger(num1) && Number.isInteger(num2)) {
    return callback(num1, num2);
  }
  const str1 = num1.toString();
  const str2 = num2.toString();
  const [_, numAfterPoint1] = str1.split('.');
  const [__, numAfterPoint2] = str2.split('.');
  const increaseTime = (10 ** Math.max(numAfterPoint1.length, numAfterPoint2.length));
  return callback(Math.floor(num1 * increaseTime), Math.floor(num2 * increaseTime)) / increaseTime;
}

function findInsertPos (arr, num) {
  if (arr.length === 0) {
    return 0;
  }
  
  let lo = 0;
  let hi = arr.length - 1;
  let mid = -1;

  while (lo <= hi) {
    mid = Math.floor(lo + (hi - lo) / 2);
    const midNum = arr[mid];

    if (midNum < num) {
      lo = mid + 1;
    } else if (midNum > num) {
      hi = mid - 1;
    } else {
      return mid + 1;
    }
  }

  return lo;
}

function findIndex (arr, num) {
  if (arr.length === 0) {
    return 0;
  }
  let lo = 0;
  let hi = arr.length - 1;
  let mid = -1;

  while (lo <= hi) {
    mid = Math.floor(lo + (hi - lo) / 2);
    const midNum = arr[mid];

    if (midNum < num) {
      lo = mid + 1;
    } else if (midNum > num) {
      hi = mid - 1;
    } else {
      return mid;
    }
  }

  return -1;
}

// const arr = [1,5,8]
// console.log(findInsertPos(arr, 4))

const timeLine = new TimeLine();


timeLine.push(1.3);
timeLine.push(1.01);
timeLine.push(1.1);
console.log(timeLine.pool, timeLine.isContinous(1.01, 1.1));
timeLine.push(1.52);
console.log(timeLine.pool, timeLine.isContinous(1.01, 1.52));

timeLine.push(1.05);
timeLine.push(1.19);
timeLine.push(1.22);

console.log(timeLine.pool, timeLine.isContinous(1.01, 1.3));
// console.log(addZeroPointOne(1.11))
