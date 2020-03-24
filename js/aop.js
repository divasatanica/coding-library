Function.prototype.before = function before (fn) {
    let context = this;

    return function fnWithBefore (...args) {
        fn.apply(this, args);
        return context.apply(this, args);
    }
}

Function.prototype.after = function after (fn) {
    let context = this;
    return function fnWithAfter (...args) {
        let result = context.apply(this, args);
        fn.apply(this, args);
        return result;
    }
}

function compose (...funcs) {
    return function composed (num) {
        return funcs.reduceRight((acc, curr) => {
            return curr(acc);
        }, num);
    }
}

function addOne (num) {
    console.log('now plus one')
    return num + 1;
}

function mulThree (num) {
    return num * 3;
}

function squareNum (num) {
    return num ** 2;
}

let composedFunc = compose(console.log, squareNum, mulThree, addOne);


// y = [3(x + 1)] ^ 2;
// console.log(composedFunc(2));
composedFunc(2);

let fn = addOne.before(() => console.log('before add')).after(() => console.log('after add'));
fn(2);


// var searchInsert = function(nums, target) {
//     let lo = nums.length,
//         hi = 0,
//         mid = 0;
    
//     while (hi <= lo) {
//         mid = Math.floor((lo + hi) / 2);
//         if (target < nums[mid]) {
//             hi= mid + 1;
//         } else if (target > nums[mid]) {
//             lo = mid - 1;
//         } else {
//             return mid;
//         }
//     }
    
//     return hi;
// };

// console.log(searchInsert([9,8,7,6,4,3,2,1], 5));

// function searchInsert (nums, target) {
//     let lo = 0,
//         hi = nums.length,
//         mid = 0;
    
//     while (lo <= hi) {
//         mid = Math.floor((lo + hi) / 2);
//         if (target < nums[mid]) {
//             hi = mid - 1;
//         } else if (target > nums[mid]) {
//             lo = mid + 1;
//         } else {
//             return mid;
//         }
//     }
    
//     return lo;
// };

// function sortedIndex (arr, target, iterator) {
//     return searchInsert(arr.map(iterator), iterator(target));
// }

// var stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];

// var result = sortedIndex(stooges, {name: 'stooge3', age: 20}, function(stooge){
//     return stooge.age
// });

// console.log(result);

