/*
    Problem Statement: Compress a string by replacing consecutive identical
    characters with the character followed by the count of repetitions.
    If a character repeats more than 9 times consecutively, split it into
    multiple groups of at most 9 (e.g. "aaaaaaaaaaa" -> "a9a2").
*/

function compressString(str) {
  if (!str) return "";

  let compressed = "";
  let currentChar = str[0];
  let count = 1;

  function appendCompressed(char, totalCount) {
    // Single occurrence
    if (totalCount === 1) {
      compressed += char;
      return;
    }

    // Split into chunks of at most 9
    while (totalCount > 9) {
      compressed += char + "9";
      totalCount -= 9;
    }

    // Always append the remaining count (1-9)
    compressed += char + totalCount;
  }

  for (let i = 1; i < str.length; i++) {
    if (str[i] === currentChar) {
      count++;
    } else {
      appendCompressed(currentChar, count);
      currentChar = str[i];
      count = 1;
    }
  }

  appendCompressed(currentChar, count);

  return compressed;
}

// For user debugging purposes
console.log(compressString("aabcccdeeeefffgh"));
console.log(compressString("aaabbbccccccccccc"));
console.log(compressString("jjjjjjjjjj"));
export default compressString;
