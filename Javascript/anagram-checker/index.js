/*
    Problem Statement: Write a function that checks if two input strings are anagrams of each other.
    An anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
    typically using all the original letters exactly once.
*/

function isAnagram(str1, str2) {
  const format = (str) => str.toLowerCase().replace(/[^a-z]/g, "");

  return (
    format(str1).split("").sort().join("") ===
    format(str2).split("").sort().join("")
  );
}

//For the purpose of user debugging.
console.log(isAnagram("listen", "silent"));
export default isAnagram;
