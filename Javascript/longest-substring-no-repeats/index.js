/*
    Problem Statement: Given a string `s`, return the length of the longest 
    substring without repeating characters. A substring is a contiguous 
    sequence of characters.

*/

function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();

  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    // If character exists in current window,
    // move left pointer after its previous occurrence
    if (lastSeen.has(currentChar) && lastSeen.get(currentChar) >= left) {
      left = lastSeen.get(currentChar) + 1;
    }

    // Update latest index of current character
    lastSeen.set(currentChar, right);

    // Update answer
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

// For debugging
console.log(lengthOfLongestSubstring("abcabcbb"));
console.log(lengthOfLongestSubstring("bbbbb"));
console.log(lengthOfLongestSubstring("pwwkew"));
console.log(lengthOfLongestSubstring(""));
console.log(lengthOfLongestSubstring("aab"));

export default lengthOfLongestSubstring;
