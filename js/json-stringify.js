let gDebug = true;

function getStringify(schema) {
  gDebug && console.log('SCHEMA:', schema, '\n');
  const schemaStr = JSON.stringify(schema);
  const Split = schemaStr.split(/("##[\[|\]|\w|_|0-9|\.]{1,}##\w{1,}##")/g);
  let code = `return `
  Split.forEach((item, index)=> {
    if (index % 2) {
      gDebug && console.log('ITEM:', item, '\n');
      const [pathStr, type] = item.slice(3, -3).split('##');
      const path = pathStr.split('.').filter(Boolean);
      const valueAccessCode = path.reduce((acc, curr, index) => {
        const res = acc + ` || {})["${curr}"]`;
        return res;
      }, '('.repeat(path.length) + 'object');

      switch (type) {
        case 'string': {
          code += `'"' + ${valueAccessCode} + '"'`;
          break;
        }
        case 'null': {
          code += 'null';
          break;
        }
        case 'object': {
          code += valueAccessCode;
          break;
        }
        default: {
          code += valueAccessCode;
          break;
        }
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

  gDebug && console.log('CODE:', code, '\n');
  return new Function('object', code);
}

function getSchema(obj, pathPrefix = '') {
  const type = getType(obj);
  if (type === 'array') {
    const res = Array.from({ length: obj.length });

    obj.forEach((item, index) => {
      res[index] = getSchema(item, `${pathPrefix}${index}.`);
    });

    return res;
  } else if (type !== 'object') {
    if (type === 'function') {
      return `##${pathPrefix}##null##`;
    }

    return `##${pathPrefix}##${type}##`;
    
  } else {
    const res = Object.create(null);
    // Omit the symbol key using Object.keys() method.
    const keys = Object.keys(obj);

    keys.forEach(key => {
      const value = obj[key];
      const type = getType(value);

      if (type === 'object' || type === 'array') {
        res[key] = getSchema(value, `${pathPrefix}${key}.`);
      } else {
        res[key] = `##${pathPrefix}${key}##${type}##`;
      }
    });

    return res;
  }
  
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

function testObj() {
  const templateObj = {
    id: 1,
    friends: [0, 0],
    info: {
      name: 'coma',
      age: 25,
      single: false,
      address: {
        province: '',
        city: '',
        street: {
          house: 'xx',
          room: 123
        }
      }
    }
  };
  
  const realObj = {
    id: 2,
    friends: [3,4],
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
  const schema = getSchema(templateObj);
  const stringifier = getStringify(schema);
  console.log('RESULT:', stringifier(realObj));

  console.assert(stringifier(templateObj) === JSON.stringify(templateObj));

  console.time('Native JSON.stringify object')
  for (let i = 0; i < 1e6; i ++) {
    JSON.stringify(realObj);
  }
  console.timeEnd('Native JSON.stringify object');

  console.time('Stringify object')
  for (let i = 0; i < 1e6; i ++) {
    stringifier(realObj);
  }
  console.timeEnd('Stringify object');
  console.log('\n');
}

function testArray() {
  const templateObj = [
    { name: 'c' },
    1,
    'name',
    function foo() {}
  ];

  const realObj = [
    { name: 'll'},
    2,
    'cc',
    function bar() {}
  ]

  const schema = getSchema(templateObj);
  const stringifier = getStringify(schema);

  console.log('RESULT:', stringifier(realObj));
  console.assert(stringifier(realObj) === JSON.stringify(realObj));

  console.time('Native JSON.stringify array')
  for (let i = 0; i < 1e6; i ++) {
    JSON.stringify(realObj);
  }
  console.timeEnd('Native JSON.stringify array');

  console.time('Stringify array')
  for (let i = 0; i < 1e6; i ++) {
    stringifier(realObj);
  }
  console.timeEnd('Stringify array');
  console.log('\n');
}

testObj();
testArray();
