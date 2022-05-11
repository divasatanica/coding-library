fn two_sum(nums: &[i8], target: i8) -> (usize, usize) {
  let mut left: usize = 0;
  let mut right: usize = nums.len() - 1;
  let empty_result: (usize, usize) = (usize::MIN, usize::MIN);

  while left < right {
    let left_num = nums[left];
    let right_num = nums[right];
    let sum = left_num + right_num;

    if sum < target {
      left += 1;
    } else if sum > target {
      right -= 1;
    } else {
      return (left + 1, right + 1);
    }
  }

  return empty_result;
}

fn main() {
  let target: i8 = 15;
  let nums: [i8; 7] = [1,3,4,5,7,10,19];

  let result = two_sum(&nums, target);

  println!("Target: {}, The result is [{}, {}]", target, result.0, result.1);
}