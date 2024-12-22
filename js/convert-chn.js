const upperCaseChnNumber = [
  "零",
  "一",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
];

function convertToUpperCase(number) {
  const upperCaseChnBigAmountNumber = ["", "万", "亿", "京", "兆"];
  const stringForm = number.toString();
  const maxLength = stringForm.length;
  let result = "";

  const chunked = [];
  let tmp = [];
  let i = maxLength - 1;
  while (i > -1) {
    const char = stringForm[i];

    if (tmp.length < 4) {
      i -= 1;
      tmp.push(char);
    }

    if (tmp.length === 4 || i < 0) {
      chunked.push(tmp.reverse());
      tmp = [];
    }
  }

  console.log("Chunk", chunked);

  chunked.forEach((charList, index) => {
    const recurNumber = charList.join("");
    const amountNumber = upperCaseChnBigAmountNumber[index];

    result = `${convertNumberWithinTenThousand(
      Number(recurNumber),
      index === chunked.length - 1
    )}${amountNumber}${result}`;
  });

  console.log("Result", result);
  return result;
}

function convertNumberWithinTenThousand(number, trimZero = false) {
  const upperCaseChnAmountNumber = ["", "十", "百", "千"];
  console.log("Convert", number, trimZero);
  const maxLength = number.toString().length;
  const stringReverseForm = [
    "0".repeat(4 - maxLength),
    ...number.toString().split(""),
  ].join("");

  let result = [];
  let i = 0;

  [3, 2, 1, 0].forEach((item) => {
    const char = stringReverseForm[item];

    if (char != null) {
      result.unshift(
        `${upperCaseChnNumber[char]}${
          char === "0" ? "" : upperCaseChnAmountNumber[3 - item]
        }`
      );
    }
  });

  if (trimZero) {
    let j = 0;
    let k = result.length - 1;

    while (
      result[j] === upperCaseChnNumber[0] ||
      result[k] === upperCaseChnNumber[0]
    ) {
      if (result[j] === upperCaseChnNumber[0]) {
        result.shift();
      }

      if (result[k] === upperCaseChnNumber[0]) {
        result.pop();
      }
    }
  }

  return result.join("");
}

convertToUpperCase(30345);
