/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// var rotate = function(nums, k) {
//     let len = nums.length,
//         realStep = k % len,
//         devide = Math.abs(realStep - len),
//         buffer = nums.slice();
//     console.log("realStep:", realStep, "devide:", devide);
//     for (let j = 0; j < len; j ++) {
//         console.log(nums);
//         if (j + realStep >= len) {
//             nums[j - devide] = buffer[j];
//         } else {
//             nums[j + realStep] = buffer[j];
//         }
//     }
// };

var rotate = function (nums, k) {
    let tale,
        len = nums.length;
    while (k > 0 && (k % len !== 0)) {
        tale = nums[len - 1];
        for (let i = len - 1; i > 0; i --) {
            nums[i] = nums[i - 1];
        }
        nums[0] = tale;
        k --;
    }
}

let nums = [1,2,3,4];
rotate(nums, 3);
console.log(nums);