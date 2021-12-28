var solution = (str) => {
  let l = 0, r = 0;
  const res = [];

  while (r <= str.length) {
      const char = str[r];
      if (char === 'b') {
          if (l < r) {
              while (l < r) {
                  res.push(str[l++]);
              }
          }
          l ++;
          r ++;
          continue;
      }

      if (char === 'a') {
          if (l < r) {
              while (l < r) {
                  res.push(str[l++]);
              }
          } else {
              r ++;
          }
          continue;
      }

      if (char === 'c') {
          if (l < r) {
              while (l <= r) {
                  l ++;
              }
              r ++;
          } else {
              res.push(char);
              r ++;
              l ++;
          }
          continue;
      }

      break;
  }

  if (l < r) {
    while (l < r) {
      res.push(str[l ++]);
    }
  }

  return res.join('');
}

var checkResult = (str) => {
  var result = solution(str)
  var trueResult = str.replace(/(b|(ac))/g, '')
  console.log('input:', str, result, trueResult)
  if (result !== trueResult) {
    throw new Error(`${str} not correct`);
  }
}

// var result = solution('caabacccbaaacba');

var randomCase = (count) => {
  const length = 20;
  const pool = ['a', 'b', 'c'];
  const res = [];
  for (let i = 0; i < count; i ++) {
    const caseArr = [];
    for (let j = 0; j < 20; j ++) {
      const index = Math.floor(Math.random() * 3)

      let char = pool[index]

      if (!char) {
        char = 'c'
      }

      caseArr.push(char);
    }
    res.push(caseArr.join(''));
  }

  return res;
}

checkResult('caabacccbaaacba')
checkResult('acbbbacaabacaccc')
checkResult('acb')
checkResult('acacacacbbbbacaccccacaccaaaab')
checkResult('aca')
checkResult('abc')
checkResult('b')
checkResult('abbac')
randomCase(20).map(checkResult);
// console.log('result:', result);