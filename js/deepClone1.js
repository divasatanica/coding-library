let gDebug = false

function deepClone (obj) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  const debugMap = gDebug ? new Map() : null;
  const parentMap = new Map();
  // Reference typed value will be added into this map after accessed
  const circleMap = new WeakMap();
  let id = 0;
  const getQueueFrame = (obj, key = '', parentKey = 0) => {
    const value = {
      path: key,
      value: obj,
      key: id ++,
      parentKey,
      type: getType(obj)
    }
    gDebug && debugMap.set(value.key, value);
    return value;
  };
  const setPropToTarget = function setPropToTarget (parentKey, path, target, shouldInit) {
    // Omit the frame if its parentKey can not be found in parentMap
    // It only happens in circular data's queue frame
    if (path !== '' && parentMap.has(parentKey)) {
      Reflect.set(parentMap.get(parentKey), path, shouldInit ? target : parentMap.get(parentKey));
    }
  }
  const setValueVisited = function setValueVisited (type, key, value) {
    if (
      !circleMap.has(value) &&
      type !== 'function' &&
      type !== 'primitive'
    ) {
      circleMap.set(value, key)
    }
  }
  const queue = [getQueueFrame(obj)];

  while (queue.length > 0) {
    const frame = queue.shift();
    const { type, key, value, path, parentKey } = frame;
    // Value without existance in parentMap and hasn't been visited before should be initialized
    const shouldInit = !parentMap.has(key) && !circleMap.has(value);
    switch (type) {
      case 'array': {
        const target = [];
        if (shouldInit) {
          parentMap.set(key, target);
        }
        value.forEach((item, index, arr) => {
          if (circleMap.has(item)) {
            return;
          }
          queue.push(
            getQueueFrame(item, index, frame.key)
          );
        });

        setPropToTarget(parentKey, path, target, shouldInit);
        break;
      }
      case 'object': {
        const target =  {};
        if (shouldInit) {
          parentMap.set(key, target);
        }
        // Call Object.getOwnPropertySymbols to get symbols which are used as key
        // const keys = [...Object.keys(value), ...Object.getOwnPropertySymbols(value)];
        // Call Reflect.ownKeys to get keys of all types.
        const keys = Reflect.ownKeys(value);

        keys.forEach(key => {
          const obj = value[key];
          if (circleMap.has(obj)) {
            return;
          }
          queue.push(
            getQueueFrame(obj, key, frame.key)
          );
        });

        setPropToTarget(parentKey, path, target, shouldInit);
        break;
      }
      // Primitive value will be copied
      // Function's pointer will be kept in the result 
      case 'function':
      case 'primitive': {
        setPropToTarget(parentKey, path, value, true);
        break;
      }
      default: {
        throw new Error('Unknown typeof value');
      }
    }

    setValueVisited(type, key, value);
  }
  const result = parentMap.get(0)
  parentMap.clear();
  return result;
}
function getType (value) {
  if (value === null) {
    return 'primitive';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  if (typeof value === 'object') {
    return 'object';
  }
  if (typeof value === 'function') {
    return 'function';
  }

  return 'primitive';
}

// const target = {
//   name: 'coma',
//   age: 25,
//   info: {
//     address: '123123'
//   },
//   friends: [1, 2, [1,2,3], { name: 'll' }],
//   tag: Symbol('target'),
//   say: function foo () {}
// };
// let target1;
// target1 = {
//   name: 'coma',
//   friends: [1, 2, [1,2,3], { name: 'll' }],
// }

// target1._test_ = target1
// console.time('target');
// const result = deepClone(target);
// console.timeEnd('target')
// const result1 = deepClone(target1);
// console.log(result1._test_ === result1);

// console.log(result1.friends[2] === target1.friends[2])

// // console.log(result, target.say === result.say);
// // console.log(result1, result1[0].info === target.info);

// console.time('target1')
// for (let i = 0; i < 10000; i ++) {
//   deepClone(target1)
// }
// console.timeEnd('target1')

// const target2 = [null, 2, 3, { name: 'll' }, null]
// target2[0] = target2

// const result2 = deepClone(target2)

// console.log(result2, result2 === result2[0], target2[3] === result2[3])

console.log(deepClone({ [Symbol('test')]: 'coma' }))