function add(a, b) {
  let lenA = a.length,
    lenB = b.length,
    len = lenA > lenB ? lenA : lenB;

  // 先补齐位数一致
  if (lenA > lenB) {
    for (let i = 0; i < lenA - lenB; i++) {
      b = '0' + b;
    }
  } else {
    for (let i = 0; i < lenB - lenA; i++) {
      a = '0' + a;
    }
  }

  let arrA = a.split('').reverse(),
    arrB = b.split('').reverse(),
    arr = [],
    carryAdd = 0;

  for (let i = 0; i < len; i++) {
    let temp = Number(arrA[i]) + Number(arrB[i]) + carryAdd;
    arr[i] = temp > 9 ? temp - 10 : temp;
    carryAdd = temp >= 10 ? 1 : 0;
  }

  if (carryAdd === 1) {
    arr[len] = 1;
  }

  return arr.reverse().join('');

}