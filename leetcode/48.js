function printMatrix (A) {
  const row = A.length;
  const col = A[0].length;
  let res = '';

  for (let i = 0; i < row; i ++) {
    for (let j = 0; j < col; j ++) {
      res += A[i][j];
      res += ' ';
    }
    res += '\n';
  }

  console.log(res);
}

function matrixMul (x, y) {
  const rowX = x.length;
  const colX = x[0] && x[0].length;
  const rowY = y.length;
  const colY = y[0] && y[0].length;

  if (colX !== rowY) {
    throw new Error('Fatal: MatrixA\'s row number must be equal to MatrixB\'s col number')
  }

  const result = Array.from({ length: rowX }).fill(1).map(() => Array.from({ length: colY }))

  for (let i = 0; i < rowX; i ++) {
    for (let j = 0; j < colY; j ++) {
      const yArr = y.map(item => item[j]);
      const res = addOneByOne(x[i], yArr)
      result[i][j] = res;
    }
  }

  return result;
}

function addOneByOne(A, B) {
  let res = 0;
  for (i = 0; i < A.length; i ++) {
    res += A[i] * B[i];
  }

  return res;
}

function getTransferMatrix ({ tx, ty, angle }) {
  const ROTATION_ANGLE = angle
  // 使用齐次坐标系下的仿射变换矩阵
  // 题中的顺时针 90° 旋转图片相当于在坐标原点逆时针旋转图片 270° 后往上平移 colG - 1 个单位长度
  // colG - 1 是因为仿射变换处理的是坐标, 原图片矩阵中有 colG 列,即 colG 个元素,那么对应就有 colG - 1 个单位长度
  // 使用 Math.round 取整保证不出现浮点数精度问题, 非本题核心
  return [
    [Math.round(Math.cos(ROTATION_ANGLE)), -Math.sin(ROTATION_ANGLE), tx],
    [Math.sin(ROTATION_ANGLE), Math.round(Math.cos(ROTATION_ANGLE)), ty],
    [0, 0, 1]
  ];
}


/**
 * 使用仿射变换来旋转图像,可适用于任意维度的图像
 * @param {Array{Array}} graph 
 */
function rotate (graph) {
  const rowG = graph.length;
  const colG = graph[0].length;
  const transferMatrix = getTransferMatrix({ tx: 0, ty: colG - 1, angle: 3 * Math.PI / 2 })
  const res = Array.from({ length: colG }).fill(1).map(() => Array.from({ length: rowG }));
  for (let i = 0; i < rowG; i ++) {
    for (let j = 0; j < colG; j ++) {
      // 底部添加一行 1 构造齐次坐标系下的图片像素点坐标
      // 注意这里需要根据坐标系中坐标与二维数组表示的矩阵的索引之间的关系来转换
      const point = [
        [j],
        [rowG - i - 1],
        [1]
      ];
      // 变换矩阵右乘点坐标得到旋转+平移变换之后的点坐标 
      const pointRotated = matrixMul(transferMatrix, point);
      const targetX = pointRotated[0][0];
      const targetY = pointRotated[1][0];

      // console.log(`Transfered: Point(${j}, ${i}) -> Point(${targetX}, ${targetY})`);

      res[colG - 1 - targetY][targetX] = graph[i][j];
    }
  }

  for (let i = 0; i < colG; i ++) {
    for (let j = 0; j < rowG; j ++) {
      graph[i] = graph[i] && graph[i].slice(0, rowG) || [];
      graph[i][j] = res[i][j];
    }
  }

  // 处理旋转后多出来的行
  while (graph.length > colG) {
    graph.pop();
  }
}

const graph = [[1,2,3,4],[5,6,7,8],[9,10,11,15],[12,13,14,16]]
console.log('Before rotation:\n')
printMatrix(graph);
rotate(graph);
console.log('After rotation:\n')
printMatrix(graph);
