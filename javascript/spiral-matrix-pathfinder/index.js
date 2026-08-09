/*
    Problem Statement:
    Given a 2D matrix where some cells contain obstacles (-1),
    traverse the matrix in spiral order starting from the
    top-left corner.

    Skip all obstacle cells (-1) while collecting values.

    Return an array containing all non-obstacle values
    in spiral traversal order.

    Constraints:
    - Matrix may contain obstacles.
    - Matrix may be empty.
    - Single row / single column supported.
    - Do not revisit any cell.
*/

function spiralMatrixPathfinder(matrix) {
  // Handle invalid input
  if (
    !Array.isArray(matrix) ||
    matrix.length === 0 ||
    !Array.isArray(matrix[0]) ||
    matrix[0].length === 0
  ) {
    return [];
  }

  const result = [];

  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    // Traverse Left -> Right
    for (let col = left; col <= right; col++) {
      if (matrix[top][col] !== -1) {
        result.push(matrix[top][col]);
      }
    }
    top++;

    // Traverse Top -> Bottom
    for (let row = top; row <= bottom; row++) {
      if (matrix[row][right] !== -1) {
        result.push(matrix[row][right]);
      }
    }
    right--;

    // Traverse Right -> Left
    if (top <= bottom) {
      for (let col = right; col >= left; col--) {
        if (matrix[bottom][col] !== -1) {
          result.push(matrix[bottom][col]);
        }
      }
      bottom--;
    }

    // Traverse Bottom -> Top
    if (left <= right) {
      for (let row = bottom; row >= top; row--) {
        if (matrix[row][left] !== -1) {
          result.push(matrix[row][left]);
        }
      }
      left++;
    }
  }

  return result;
}

// For user debugging and testing purposes
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
console.log(spiralMatrixPathfinder(matrix)); // Output: [1, 2, 3, 6, 9, 8, 7, 4, 5]

export default spiralMatrixPathfinder;
