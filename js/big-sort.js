/**
 * 有一个100G的文件，里面都是int32的数字，用空格分隔。写代码对这个文件中的所有数字进行排序，语言不限
 * 假定是正整数吧，[0，2147483647]
 */
const fs = require('fs')
const quickSort = require('./quicksort')
const PER_NUMBER_SIZE = 4
// int32 4 个字节/ 空格 1 个字节
const totalNum = Math.floor(100 * 1024 * 1024 * 1024 / (PER_NUMBER_SIZE + 1))
const min = 0
const max = 2147483647

/**
 * 假设内存上限为 MEMORY_MAX,单位为 Byte
 * 我们希望每个分块的数据量都在内存上限之内
 * 这样就可以直接对分块进行排序
 */

const MEMORY_MAX = 'memory_max'
// 均分情况下的桶个数 = 数字个数 / (单条线程的内存上限 / 4 Byte)
const bucketSize = MEMORY_MAX / PER_NUMBER_SIZE
let k = Math.ceil(totalNum / bucketSize)


const getBucketIndex = n => Math.floor(n / bucketSize)
// 写入文件名和索引联系起来
const getWritableStream = index => {
  if (map.has(index)) {
    return map.get(index);
  }
  const stream = fs.createWriteStream(`path/to/name-${index}`)

  map.set(index, stream)
  return stream
}
let map = new Map()
let oversizeBucket = {}
let bucketCount = {}


const readableStream = fs.createReadStream('path/to/name')
readableStream.on('readable', () => {
  let data;
  let size = PER_NUMBER_SIZE
  while (data = readableStream.read(size)) {
    if (data === ' ') {
      size = PER_NUMBER_SIZE
    } else {
      size = 1
      const number = Number(data)

      const bucketIndex = getBucketIndex(number)
      const writableStream = getWritableStream(bucketIndex)
      writableStream.write(number)
      writableStream.write(' ')
      bucketCount[bucketIndex] += 1;
    }
  }
})

readableStream.on('end', () => {
  const iterator = map.keys()

  let stream
  while (stream = iterator.next()) {
    stream.close()
  }

  // 把数据溢出的桶索引找出来
  const counts = Object.keys(bucketCount).filter(key => bucketSize[count] > bucketSize);

  // 使用 reduce API 控制 Promise 继发式运行
  const stepArrayPromise = counts.reduce((acc, curr) => {
    const key = curr;

    // 这里删除这个 key 对应的值
    // 代表会在 splitOverAndSort 函数中对它处理
    // 在最后输出过程中跳过对它的处理,直接拼接到输出文件中
    delete counts[key];
    return acc.then(() => {
      return splitOversizeAndSort(curr)
    })
  }, Promise.resolve())

  const output = fs.createWriteStream('/path/to/name-output')
  let i = 0;
  let outputReadStream = fs.createReadStream(`/path/to/name-${i}`)

  // 多出一个元素用来最后结束调用,关闭 output 输出流
  let kArray = Array.from({ length: k + 1 }).fill(0)
  
  kArray.reduce((acc, curr, currentIndex) => {
    if (currentIndex === k) {
      output.close()
      return null;
    }

    // counts 中有值的索引代表数量未溢出的文件块
    // 那么我们需要对其进行同样的操作
    // 排序后重新写回源文件
    if (counts[currentIndex]) {
      return readFileBlockAndSort(currentIndex).then(() => {

        // 完成之后进行和下面一样的操作
        // 逐个读取并输出到源文件中
        return getSortedAndWriteOutput(currentIndex, output);
      })
    }

    return acc.then(() => {
      return getSortedAndWriteOutput(currentIndex, output)
    })
  }, stepArrayPromise);
});

function readFileBlockAndSort (readIndex) {

  return new Promise(resolve => {
    const outputReadStream = fs.createReadStream(`/path/to/name-${i}`)

    let nums = [];

    outputReadStream.on('readable', () => {
      let data
      let size = PER_NUMBER_SIZE
      while (data = outputReadStream.read(size)) {
        // xxx 省略重复的读取数据的过程,跟上面一样,读一个 2 byte 数字,读一个空格,交替读取
        if (data === ' ') {
          size = PER_NUMBER_SIZE
        } else {
          size = 1
          const number = Number(data)

          output.write(Buffer.from())
        }
      }
    });

    outputReadStream.on('end', () => {
      quickSort(nums);

      fs.rmSync(`path/to/name-${readIndex}`)
      const outputSort = fs.createWriteStream(`path/to/name-${readIndex}`)
      
      nums.forEach((number, index) => {
        outputSort.write(number);
        if (index < number.length - 1) {
          outputSort.write(' ')
        }
      });

      outputSort.close();

      resolve();
    })
  })
}

function getSortedAndWriteOutput (readIndex, ouput) {
  return new Promise(resolve_ => {
    let outputReadStream = fs.createReadStream(`/path/to/name-${readIndex}`)

    outputReadStream.on('readable', () => {
      let data
      let size = PER_NUMBER_SIZE
      while (data = outputReadStream.read(size)) {
        if (data === ' ') {
          size = PER_NUMBER_SIZE
        } else {
          size = 1
          const number = Number(data)
          output.write(number)
        }
      }
    })

    outputReadStream.on('end', () => {
      resolve()
    })
  })
}

/**
 * 简单来说就是把数据量超过 bucketSize 的文件块,
 * 读取出来,切分成 n 个小的文件块并排序
 * 然后读取这 n 个文件块,重新合并回源文件
 * @param {*} key 
 * @returns 
 */
function splitOversizeAndSort (key) {
  return new Promise(resolveRoot => {
    const counts = bucketCount[key];
    const shouldSplit = Math.ceil(counts / bucketSize);
    let streams = [];
    for (let i = 0; i < shouldSplit; i ++) {
      streams.push(
        fs.createWriteStream(`path/to/name-${key}-tmp-${i}`)
      );
    }

    fs.rmSync(`path/to/name-${key}`)
    const readable = fs.createReadStream(`path/to/name-${key}`)

    // 这里是分成 shouldSplit 个分区来读取源文件中的数据
    // 凑够 bucketSize 个数字之后
    // 对当前已读取完的 bucketSize 个数据进行快速排序
    // 然后写入一个 block 称为分块文件
    let nums = [];
    readable.on('readable', () => {
      let data;
      let size = PER_NUMBER_SIZE
      let streamIndex = 0;
      let count = 0;
      while (data = readable.read(size)) {
        if (data === ' ') {
          size = PER_NUMBER_SIZE
        } else {
          size = 1
          const number = Number(data)

          const writable = streams[streamIndex]

          writable.write(number)
          nums.push(number);
          count ++;
          if (count >= bucketSize) {
            quickSort(nums);
            nums.forEach((n, index) => {
              streams[streamIndex].write(n);
              if (index < nums.length - 1) {
                streams[streamIndex].write(' ');
              }
            });
            streamIndex = (streamIndex >= shouldSplit - 1) ? 0 : streamIndex + 1;
            count = 0;
            nums = [];
          }
        }
      }
    })

    readable.on('end', () => {
      streams.forEach((stream, index) => {
        stream.close()
      })
      streams = [];

      for (let i = 0; i < shouldSplit; i ++) {
        streams.push(
          fs.createReadStream(`path/to/name-${key}-tmp-${i}`)
        );
      }

      const status = Array.from({ length: shouldSplit }).fill(false)

      // 下面做的事情是逐个读取各个分块文件流里面的数字,一次只读一个
      // 然后取出当中最小的写入源文件
      // 达到将分块文件排序后合并的目的
      // 相当于合并 shouldSplit 个有序数组
      fs.rmSync(`path/to/name-${key}`)
      const writable = fs.createWriteStream(`path/to/name-${key}`)
      let tmp = [];
      Promise.all(streams.map((stream, _index) => {
        return new Promise(_resolve => {
          stream.on('readable', () => {
            _resolve();
          })
        })
      })).then(() => {
        // 给所有的可读流加上 readable 监听器之后,开始手动读取数据
        let shouldRead = 0;
        let finishCount = 0;
        let finishMap = {};

        // 用 shouldRead 控制当前需要读取数据的流索引
        // 如果 tmp 没有满,就轮询式地读取这几个流
        while (true) {
          // 已完成的流提前 continue
          if (finishMap[shouldRead]) {
            shouldRead = (shouldRead >= shouldSplit) ? 0 : shouldRead + 1;
            continue;
          }
          // 读一个数字读一个空格
          // 如果读到的数字是最后一个数字
          // 那么 nextChunk 就是 null
          const chunk = streams[shouldRead].read(PER_NUMBER_SIZE);
          const nextChunk = streams.read(1);
          

          // 若读取到 null
          if (nextChunk == null) {
            finishCount ++;
            finishMap[shouldRead] = true;
            streams[shouldRead].close();
            fs.rm(`path/to/name-${key}-tmp-${_index}`);

            // 所有流都完成读取,退出 while 循环
            if (finishCount === shouldSplit) {
              writable.close();
              resolveRoot();
              break;
            }

            shouldRead = (shouldRead >= shouldSplit) ? 0 : shouldRead + 1;
            continue;
          }

          const number = Number(chunk);
          tmp[shouldRead] = number; 
          let minIndex
          if (tmp.length === shouldSplit) {
            let min = Number.MAX_VALUE;
            let minIndex = -1;
            // 在这里取出最小的数字写回源文件
            // 将 minIndex 赋值给 shouldRead
            // 并在下一次 while 循环中继续读取 minIndex 索引指向的流的数据
            tmp.forEach((n, nIndex) => {
              if (n < min) {
                min = n;
                minIndex = nIndex;
                writable.write(n);
                writable.write(' ');
              }
            });

            shouldRead = minIndex;
          } else {
            shouldRead = (shouldRead >= shouldSplit) ? 0 : shouldRead + 1;
          }
        }
      })
    })
  })
}