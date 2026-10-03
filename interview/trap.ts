function trap1(height: number[]): number {
  const highestLeft = [];
  const highestRight = [];

  for (let i = 0; i < height.length; i++) {
    if (highestLeft.length === 0) {
      highestLeft.push(0);
      continue;
    }
    const h = height[i - 1];
    const tail = highestLeft[highestLeft.length - 1];

    highestLeft.push(Math.max(tail, h));
  }

  for (let j = height.length - 1; j >= 0; j--) {
    if (highestRight.length === 0) {
      highestRight.unshift(0);
      continue;
    }
    const h = height[j + 1];
    const head = highestRight[0];

    console.log("h", h, "head", head);

    highestRight.unshift(Math.max(head, h));
  }

  console.log("highestLeft", highestLeft, "highestRight", highestRight);

  let cursor = 0;
  let ans = 0;

  while (cursor < height.length) {
    if (cursor === 0 || cursor === height.length - 1) {
      cursor += 1;
      continue;
    }

    const maxLeft = highestLeft[cursor];
    const maxRight = highestRight[cursor];
    console.log("maxLeft", maxLeft, "maxRight", maxRight);
    const water = Math.max(0, Math.min(maxLeft, maxRight) - height[cursor]);

    console.log("water", water, "cursor", cursor);

    ans += water;
    cursor += 1;
  }

  console.log("ans", ans);
  return ans;
}

function trap(height: number[]): number {
  let leftMax = height[0];
  let rightMax = height[height.length - 1];
  let left = 1;
  let right = height.length - 2;
  let ans = 0;

  while (left <= right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);

    if (leftMax <= rightMax) {
      const water = Math.max(0, leftMax - height[left]);
      ans += water;
      left += 1;
    } else {
      const water = Math.max(0, rightMax - height[right]);
      ans += water;
      right -= 1;
    }
  }

  console.log("ans", ans);
  return ans;
}

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]);
trap([4, 2, 0, 3, 2, 5]);
