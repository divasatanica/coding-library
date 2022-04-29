/**
 * 给定一个带有小写字母和星号(*)的字符串，将所有字母整理到最左边，
 * 所有星号整理到最右边，字母的相对顺序保持不变
 * @param {String} str 
 */
function swapStar(str) {
  if (!str) {
    return '';
  }
  let i = 0,
      j = 1;
  let arr = str.split('');
  /**
   * 使用双指针来遍历字符串数组，方便交换元素位置
   * 区分以下几种情况：
   * 1. 左边索引为星号，右边索引为字母，根据题意需要交换两个元素
   * 2. 两个索引都为字母，移动左指针
   * 3. 其余情况移动右指针
   * 
   * 这里需要保持字母相对顺序不变，那么在什么情况下字母相对顺序不会变呢？
   * 当要交换的字母和星号之间没有其他字母的时候，此时交换两个元素不会改变相对顺序，
   * 因此当两个索引都指向字母时，需要移动左指针来使得两个指针之间没有字母
   */
  while (j < arr.length) {
    if (arr[i] === '*' && isWord(arr[j])) {
      // i: * j: a-z
      swap(arr, i, j);
    } else if (isWord(arr[j]) && isWord(arr[i])) {
      // i: a-z j: a-z
      while (isWord(arr[j]) && isWord(arr[i])) {
        i ++;
      }
    } else {
      // j: *
      j ++;
    }
  }
  console.log('i:', i);

  return arr.join('');
}

function isWord(c) {
  return /[a-z]/.test(c);
}

function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

console.log(swapStar('a*bef*'))
// console.log(swapStar('a**bcf*hasf*ah*ashk**ef*'))
// console.log(swapStar('a**'))