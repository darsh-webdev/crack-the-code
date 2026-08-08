function decodeSecretCode(s) {
  // Check for invalid inputs
  if (!s || s.length === 0 || s.length % 2 !== 0) return "";

  // Divide into pairs using regex (letter followed by a digit)
  const pairs = s.match(/[a-z]\d/g);

  // Intialize result string
  let result = "";

  pairs.forEach((pair) => {
    const letter = pair[0];
    const shift = parseInt(pair[1]);

    // Calculate new character code and append to result
    const newCharCode = letter.charCodeAt() + shift;
    result += String.fromCharCode(newCharCode);
  });

  return result;
}

// For user debugging
console.log(decodeSecretCode("a2b3c1"));
export default decodeSecretCode;
