function merge(intervals: number[][]): number[][] {
  const sortedIntervals = [...intervals].sort((iA, iB) => iA[0] - iB[0]);

  let cursor = 0;
  const result = [];

  while (cursor < sortedIntervals.length) {
    let curr = sortedIntervals[cursor];
    let merged: number[] | null = null;

    while (
      cursor < sortedIntervals.length - 1 &&
      mergable(curr, sortedIntervals[cursor + 1])
    ) {
      merged = mergeTwoIntervals(curr, sortedIntervals[cursor + 1]);
      curr = merged;
      cursor += 1;
    }

    if (merged != null) {
      result.push(merged);
    } else {
      result.push(curr);
    }

    cursor += 1;
  }

  return result;
}

function mergable(intervalA: number[], intervalB: number[]): boolean {
  if (intervalA[0] <= intervalB[0]) {
    return intervalA[1] >= intervalB[0];
  }

  return intervalB[1] >= intervalA[0];
}

function mergeTwoIntervals(intervalA: number[], intervalB: number[]): number[] {
  if (!mergable(intervalA, intervalB)) {
    throw new Error("Not mergable");
  }
  const intervals = [intervalA, intervalB].sort(
    (interval1, interval2) => interval1[0] - interval2[0],
  );

  if (intervals[0][1] >= intervals[1][1]) {
    return [...intervals[0]];
  }

  return [intervals[0][0], intervals[1][1]];
}

console.log(
  merge([
    [1, 3],
    [2, 6],
    [8, 10],
    [15, 18],
  ]),
);

console.log(mergable([4, 4], [1, 4]));
// console.log(mergeTwoIntervals([1, 2], [3, 6]));
