/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
 var solution = function(n, bad) {
  function isBadVersion(n) {
    return n >= bad
  }
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  function firstBadVersion(n) {
    let lo = 1;
    let hi = n;
    let mid = 0;

    // let map = {}

    while (lo < hi) {
      mid = Math.floor((hi - lo) / 2 + lo);
      console.log('Lo', lo, 'Hi', hi, 'Mid', mid)
      // if (map[mid] != null) {
      //   return mid + 1
      // }
      if (!isBadVersion(mid)) {
        lo = mid + 1;
        // map[mid] = false;
      } else {
        hi = mid;
        // map[mid] = true;
      }
    }

    return lo;
  };

  return firstBadVersion(n);
};

console.log('First bad version is', solution(5, 4));

