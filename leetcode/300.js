/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    if (nums.length === 0) {
        return 0;
    }
    let dp = [1];
    let ans = 1;
    for (let i = 1, len = nums.length; i < len; i ++) {
        let maxVal = 0;
        for (let j = 0; j < i; j ++) {
            if (nums[i] > nums[j]) {
                maxVal = Math.max(maxVal, dp[j]);
            }
        }
        dp[i] = maxVal + 1;
        ans = Math.max(ans, dp[i]);
    }

    return ans;
};


/**
 * 维护一个结果数组，遍历 nums ，查找该元素在结果集中的位置（若存在则为该数组中的索引，若不存在则为该元素插入到数组时的位置）
 * 结果就是如果当前数比结果数组中所有数都大，则直接追加以增加子序列的长度
 * 否则，替换掉第一个比这个数大的数（索引为当前数的插入位置），为了让后面的数字能够顺利插入
 * 思想：要让子序列尽可能长的话，则这个子序列应该增长得尽可能慢，增长得越慢，后面的数能够加入子序列的概率越大
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let res = [];
    let len = 0;
    nums.forEach((n, index) => {
        let lo = 0,
            hi = res.length - 1;
        let idx;
        if (res.length < 1) {
            idx = 0;
        } else {
            while (lo <= hi) {
                const mid = Math.floor(lo + (hi - lo) / 2);
    
                if (res[mid] === n) {
                    idx = mid;
                } else if (res[mid] > n) {
                    hi = mid - 1;
                } else {
                    lo = mid + 1;
                }
            }
        }
        if (idx === undefined) {
            idx = lo;
        }
        res[idx] = n;
        if (idx === len) {
            len ++;
        }
    });

    return len;
};

console.log(lengthOfLIS([10,9,2,5,3,7,101,18]));