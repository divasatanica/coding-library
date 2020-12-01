function getOnes(n) {
  let count = 0;
  while (n > 0) {
      count += (n % 10 === 1) ? 1 : 0;
      n = Math.floor(n / 10);
  }
  return count;
}

console.log(getOnes(11043189304111));