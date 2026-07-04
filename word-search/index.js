/*
    Problem Statement:
    Given a 2D board of characters and a list of words, return all words
    that can be formed by sequentially adjacent cells.

    Rules:
    - You may move in all 8 directions:
      Horizontal, Vertical, and Diagonal.
    - The same cell cannot be used more than once in a word.
    - Return each found word only once.

    Constraints:
    - Board may be empty.
    - Words list may be empty.
    - Board size up to 12 x 12.
    - Up to 30,000 words.
*/

function findWords(board, words) {
  if (!board.length || !board[0].length || !words.length) {
    return [];
  }

  const rows = board.length;
  const cols = board[0].length;
  const result = [];

  // 8 possible directions
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  function dfs(row, col, word, index) {
    // Entire word found
    if (index === word.length) {
      return true;
    }

    // Out of bounds
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return false;
    }

    // Character mismatch or already visited
    if (board[row][col] !== word[index]) {
      return false;
    }

    const temp = board[row][col];
    board[row][col] = "#";

    for (const [dr, dc] of directions) {
      if (dfs(row + dr, col + dc, word, index + 1)) {
        board[row][col] = temp;
        return true;
      }
    }

    board[row][col] = temp;
    return false;
  }

  for (const word of words) {
    let found = false;

    for (let i = 0; i < rows && !found; i++) {
      for (let j = 0; j < cols && !found; j++) {
        if (dfs(i, j, word, 0)) {
          result.push(word);
          found = true;
        }
      }
    }
  }

  return result;
}

const board = [
  ["o", "a", "a", "n"],
  ["e", "t", "a", "e"],
  ["i", "h", "k", "r"],
  ["i", "f", "l", "v"],
];
const words = ["oath", "pea", "eat", "rain", "nate"];

// For user debugging purposes
console.log(findWords(board, words));

export default findWords;
