/*
    Problem Statement:
    Write a function generatePyramid(n) that returns an array of strings
    representing a centered pyramid of height n using '*'.

    Rules:
    - Total width of each row is (2 * n - 1)
    - Row i (1-indexed) contains (2 * i - 1) stars.
    - Stars are centered using spaces on both sides.
    - Return [] for n = 0.
    - Return false for invalid inputs:
      - Negative numbers
      - Non-integers
      - NaN
      - Infinity
      - Non-number values
*/

function generatePyramid(n) {
  // Input validation
  if (
    typeof n !== "number" ||
    !Number.isFinite(n) ||
    !Number.isInteger(n) ||
    n < 0
  ) {
    return false;
  }

  const result = [];

  for (let row = 0; row < n; row++) {
    const spaces = n - row - 1;
    const stars = 2 * row + 1;

    let currentRow = "";

    // Left spaces
    for (let i = 0; i < spaces; i++) {
      currentRow += " ";
    }

    // Stars
    for (let i = 0; i < stars; i++) {
      currentRow += "*";
    }

    // Right spaces
    for (let i = 0; i < spaces; i++) {
      currentRow += " ";
    }

    result.push(currentRow);
  }

  return result;
}

// For user debugging purposes
console.log(generatePyramid(3));
console.log(generatePyramid(0));

export default generatePyramid;
