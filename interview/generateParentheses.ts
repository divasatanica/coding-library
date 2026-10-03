type CountStat = {
  left: number;
  right: number;
};

function generateParenthesis(n: number): string[] {
  const result: string[] = [];
  generate("(", "", result, n, { left: 0, right: 0 });

  console.log("result", result);
  return result;
}

function generate(
  component: string,
  res: string,
  result: string[],
  n: number,
  stat: CountStat,
): void {
  const _res = res + component;

  // console.log(
  //   "_res",
  //   _res,
  //   "component",
  //   component,
  //   "result",
  //   result,
  //   "stats",
  //   stat,
  // );

  const _stat = { ...stat };
  if (component === "(") {
    _stat.left += 1;
  } else {
    _stat.right += 1;
  }

  if (_res.length === n * 2) {
    result.push(_res);
    return;
  }

  if (_stat.left < n) {
    generate("(", _res, result, n, _stat);
  }
  if (_stat.left > _stat.right) {
    generate(")", _res, result, n, _stat);
  }
}

generateParenthesis(3);
