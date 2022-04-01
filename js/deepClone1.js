function deepClone (obj) {
  if (obj == null || typeof obj !== 'object') {
    return obj;
  }
  const parentMap = new Map();
  let id = 0;
  const getQueueFrame = (obj, key, parent) => {
    const parentKey = parent && parent.key || 0
    return {
      path: key,
      value: obj,
      key: id ++,
      parentKey,
      type: getType(obj)
    };
  };
  const queue = [getQueueFrame(obj, '')];
  let res = Array.isArray(obj) ? [] : {};
  

  while (queue.length > 0) {
    const frame = queue.shift();
    const { type, key } = frame;
    let shouldInit = !parentMap.has(key);
    switch (type) {
      case 'array': {
        const target = [];
        if (shouldInit) {
          parentMap.set(key, target);
        }
        const { value, path, parentKey } = frame;


        value.forEach((item, index, arr) => {
          queue.push(
            getQueueFrame(item, index, frame)
          );
        });

        if (path !== '') {
          Reflect.set(parentMap.get(parentKey), path, target);
        }
        break;
      }
      case 'object': {
        const target =  {};
        if (shouldInit) {
          parentMap.set(key, target);
        }
        const { path, value, parentKey } = frame;
        const keys = Object.keys(value);

        keys.forEach(key => {
          queue.push(
            getQueueFrame(value[key], key, frame)
          );
        });
        if (path !== '') {
          Reflect.set(parentMap.get(parentKey), path, target);
        }
        break;
      }
      // Primitive value and Function will be copied to the new object. 
      case 'function':
      case 'primitive': {
        const { parentKey, path, value } = frame;
        Reflect.set(parentMap.get(parentKey), path, value);
        break;
      }
      default: {
        throw new Error('Unknown typeof value')
      }
    }
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

  return 'primitive';
}

const target = {
  name: 'coma',
  age: 25,
  info: {
    address: '123123'
  },
  friends: [1, 2, [1,2,3], { name: 'll' }],
  tag: Symbol('target'),
  say: function foo () {}
};
const target1 = [
  target,
  function bar() {}
]
// console.time('target');
const result = deepClone(target);
// console.timeEnd('target')
const result1 = deepClone(target1);
// console.log(result, target.say === result.say);
// console.log(result1, result1[0].info === target.info);

console.time('target1')
for (let i = 0; i < 10000; i ++) {
  deepClone(target1)
}
console.timeEnd('target1')