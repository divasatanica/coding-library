// var moveZeroes = function(nums) {
//     let j = 0,
//         i = 0,
//         len = nums.length;
    
//     while (j < len) {
//         if (nums[j] === 0) {
//             j ++;
//         } else {
//             swap(nums, i, j);
//             j ++;
//             i ++;
//         }
//     }
// };

// function swap (arr, i, j) {
//     let temp = arr[i];

//     arr[i] = arr[j];
//     arr[j] = temp;
// }


// var arr = [0,1,0,3,0,6,0,12];
// moveZeroes(arr);

// console.log(arr);

var mySqrt = function(x) {
    if (x <= 1) {
        return x;
    }
    
    let r = x;
    while (r > x / r) {
        console.log(r);
        r = (r + x / r) / 2;
    }
    return Math.floor(r);
};

console.log(mySqrt(8));