/*
    Problem Statement:
    Given a 2D grid where:
      0 -> Empty cell
      1 -> Fresh orange
      2 -> Rotten orange

    Every minute, fresh oranges adjacent (up, down, left, right)
    to a rotten orange also become rotten.

    Return:
    - Minimum minutes required to rot all fresh oranges.
    - Return -1 if impossible.
    - Return 0 if there are no fresh oranges.
*/

function orangesRotting(grid) {
  // Handle invalid/empty grid
  if (
    !Array.isArray(grid) ||
    grid.length === 0 ||
    !Array.isArray(grid[0]) ||
    grid[0].length === 0
  ) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;

  const queue = [];
  let freshCount = 0;

  // Directions: up, down, left, right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  // Count fresh oranges and enqueue all rotten oranges
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) {
        queue.push([r, c]);
      } else if (grid[r][c] === 1) {
        freshCount++;
      }
    }
  }

  // No fresh oranges
  if (freshCount === 0) {
    return 0;
  }

  let minutes = 0;
  let head = 0;

  // Multi-source BFS
  while (head < queue.length && freshCount > 0) {
    const levelSize = queue.length - head;

    for (let i = 0; i < levelSize; i++) {
      const [row, col] = queue[head++];

      for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;

        if (
          newRow < 0 ||
          newRow >= rows ||
          newCol < 0 ||
          newCol >= cols ||
          grid[newRow][newCol] !== 1
        ) {
          continue;
        }

        // Rot the fresh orange
        grid[newRow][newCol] = 2;
        freshCount--;
        queue.push([newRow, newCol]);
      }
    }

    minutes++;
  }

  return freshCount === 0 ? minutes : -1;
}

// For user debugging and testing purposes
const grid = [
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
];
console.log(orangesRotting(grid)); // Output: 4

export default orangesRotting;
