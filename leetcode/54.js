/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
 var spiralOrder = function(matrix) {
  const SpiralMatrix = new Matrix(matrix);
  let res = [];
  while (SpiralMatrix.hasNext()) {
    res.push(SpiralMatrix.move())
  }

  return res;
};

const LEFT = 1;
const RIGHT = -1;
const UP = 2;
const DOWN = -2;

class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
        // x 为纵坐标，y 为横坐标
        this.x = 0;
        this.y = 0;
        // m 为行， n 为列
        this.m = matrix.length;
        this.n = matrix[0].length;
        this.lastMove = RIGHT;
        this.count = this.m * this.n;
        this.map = {};
    }
    
    move() {
        const [x, y] = [this.x, this.y]

        switch (this.lastMove) {
          case LEFT: {
            if (y > 0 && !this.hasVisited(x, y - 1)) {
              this.left(x, y);
            } else {
              this.up(x, y);
            }
            break
          }
          case RIGHT: {
            if (y < this.n - 1 && !this.hasVisited(x, y + 1)) {
              this.right(x, y);
            } else {
              this.down(x, y);
            }
            break;
          }
          case UP: {
            if (x > 0 && !this.hasVisited(x - 1, y)) {
              this.up(x, y);
            } else {
              this.right(x, y);
            }
            break;
          }
          case DOWN: {
            if (x < this.m - 1 && !this.hasVisited(x + 1, y)) {
              this.down(x, y);
            } else {
              this.left(x, y);
            }
            break;
          }
        }
        return this.matrix[x][y];
    }

    hasNext() {
      return this.count > 0;
    }

    right(x, y) {
      this.setVisited(x, y);
      this.lastMove = RIGHT;
      this.x = x;
      this.y += 1;
    }

    left(x, y) {
      this.setVisited(x, y);
        this.lastMove = LEFT;
        this.x = x;
        this.y -= 1;
    }

    up(x, y) {
      this.setVisited(x, y);
      this.lastMove = UP;
      this.x -= 1;
      this.y = y;
    }

    down(x, y) {
      this.setVisited(x, y);
      this.lastMove = DOWN;
      this.x += 1;
      this.y = y;
    }

    setVisited(x, y) {
      this.map[`${x}-${y}`] = true;
      this.count --;
    }

    hasVisited(x, y) {
      return this.map[`${x}-${y}`]
    }
}

// const matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
// const matrix = [[1,2,3],[4,5,6],[7,8,9]]
const matrix = [[1,2],[3,4]]

console.log(spiralOrder(matrix))