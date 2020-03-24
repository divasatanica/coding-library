/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let count = 0;
    let i = 0;
    let maj = nums[0];

    while (i < nums.length) {
        if (count === 0) {
            maj = nums[i];
            count ++;
        } else {
            if (maj === nums[i]) {
                count ++;
            } else {
                count --;
            }
        }
        i ++;
    }

    return maj;
};

console.log(majorityElement([3,2,3]));