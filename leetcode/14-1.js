/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 1) {
    return strs[0];
  }

  let result = "";
  let tmp = undefined;
  let index = -1;
  let reachEnd = false;

  while (!reachEnd) {
    let count = 0;
    for (let i = 0; i < strs.length; i++) {
      const str = strs[i];
      console.log("str", str, index, str[index + 1], result);
      if (str[index + 1] == null) {
        reachEnd = true;
      }

      if (str[index] === tmp) {
        count += 1;
      } else {
        break;
      }
    }
    if (count === strs.length) {
      console.log(index, count);
      if (index > -1) {
        result += strs[0][index];
      }
      index += 1;
      tmp = strs[0][index];
    } else {
      break;
    }
  }

  return result;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
