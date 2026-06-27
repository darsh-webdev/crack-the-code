/*
    Problem Statement: Given a string `s`, return the length of the longest 
    substring without repeating characters. A substring is a contiguous 
    sequence of characters.

*/

function lengthOfLongestSubstring(s) {
  const seen = new Map(); // Stores the last index of each character
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // If the character is already in the current window,
    // move the left pointer just after its previous occurrence.
    if (seen.has(char) && seen.get(char) >= left) {
      left = seen.get(char) + 1;
    }

    // Update the last seen index
    seen.set(char, right);

    // Update maximum window length
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
