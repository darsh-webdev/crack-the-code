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

  // ---------- Build Trie ----------
  class TrieNode {
    constructor() {
      this.children = {};
      this.word = null;
    }
  }

  const root = new TrieNode();

  for (const word of words) {
    let node = root;

    for (const ch of word) {
      if (!node.children[ch]) {
        node.children[ch] = new TrieNode();
      }

      node = node.children[ch];
    }

    node.word = word;
  }

  const rows = board.length;
  const cols = board[0].length;
  const result = [];

  // 8 Directions
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

  function dfs(r, c, node) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] === "#") {
      return;
    }

    const char = board[r][c];

    if (!node.children[char]) {
      return;
    }

    node = node.children[char];

    // Found a word
    if (node.word !== null) {
      result.push(node.word);

      // Prevent duplicates
      node.word = null;
    }

    board[r][c] = "#";

    for (const [dr, dc] of directions) {
      dfs(r + dr, c + dc, node);
    }

    board[r][c] = char;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
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
