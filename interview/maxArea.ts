function maxArea(height: number[]): number {
  let i = 0;
  let j = height.length - 1;
  let ans = 0;

  while (i < j) {
    const hLeft = height[i];
    const hRight = height[j];
    ans = Math.max(ans, (j - i) * Math.min(hLeft, hRight));

    console.log("ans", ans);

    if (hLeft <= hRight) {
      i++;
    } else {
      j--;
    }
  }

  return ans;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
