function stringify(schema) {
  const schemaStr = JSON.stringify(schema);
  const Split = schemaStr.split(/("##[\w|_|0-9|\.]{1,}##\w{1,}##")/g);
  let code = `return `
  const template = Split.forEach((item, index)=> {

    if (index % 2) {
      const [pathStr, type] = item.slice(3, -3).split('##');
      const path = pathStr.split('.');
      const valueAccessCode = path.reduce((acc, curr, index) => {
        const res = acc + ` || {}).${curr}${index === path.length - 1 ? '' : ''}`;
        return res;
      }, '('.repeat(path.length) + 'object');

      if (type === 'string') {
        code += `'"' + ${valueAccessCode} + '"'`;
      } else {
        code += valueAccessCode;
      }

      code += ' + ';
    } else {
      if (index === Split.length - 1) {
        code += `'${item}'`;
        return;
      }
      code += `'${item}' + `;
    }
  });

  console.log(code);
  return new Function('object', code);
}

function getSchema(obj, pathPrefix = '') {
  const res = Object.create(null);
  // Omit the symbol key using Object.keys() method.
  const keys = Object.keys(obj);

  keys.forEach(key => {
    const value = obj[key];
    const type = getType(value);

    if (type === 'object') {
      res[key] = getSchema(value, `${pathPrefix}${key}.`);
    } else {
      res[key] = `##${pathPrefix}${key}##${type}##`;
    }
  });

  return res;
}

function getType (value) {
  if (value === null) {
    return 'null';
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

  return typeof value;
}

const templateObj = {
  // id: 1,
  a: [1,2],
  // info: {
  //   name: 'coma',
  //   age: 25,
  //   single: false,
  //   address: {
  //     province: '',
  //     city: '',
  //     street: {
  //       house: 'xx',
  //       room: 123
  //     }
  //   }
  // }
};

const realObj = {
  id: 2,
  a: [1,2],
  info: {
    name: 'll',
    age: 20,
    single: false,
    address: {
      province: 'asd',
      city: 'dsa',
      street: {
        house: 'xx',
        room: 123
      }
    }
  }
}
// const templateObj = {
//   id: 1,
//   info: {
//     age: 23,
//     address: {
//       province: ''
//     }
//   }
// }

// const realObj = {
//   id: 2,
//   info: {
//     age: 20,
//     address: {
//       province: 'x'
//     }
//   }
// }
const schema = getSchema(templateObj);
const stringifier = stringify(schema);

// console.log(JSON.stringify(schema));
// console.log(stringifier(realObj), JSON.stringify(realObj));

console.log('RESULT:', stringifier(realObj));

console.assert(stringifier(templateObj) === JSON.stringify(templateObj));

console.time('Native')
for (let i = 0; i < 1e5; i ++) {
  JSON.stringify(realObj);
}
console.timeEnd('Native');

console.time('Stringify')
for (let i = 0; i < 1e5; i ++) {
  stringifier(realObj);
}
console.timeEnd('Stringify');
