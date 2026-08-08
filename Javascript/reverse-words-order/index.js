/*
    Problem Statement: Write a function that takes a sentence string as input and 
    returns a new string where the order of the words is reversed but the words themselves
    remain in the same order. Words are separated by spaces. The output should not contain
    leading or trailing spaces, and multiple spaces between words should be reduced to a single space.
*/
function reverseWords(s) {
  // Trim leading/trailing spaces, split by one or more spaces, reverse the array, and join with a single space
  return s.trim().split(/\s+/).reverse().join(" ");
}

// For user debugging purposes
console.log(reverseWords("the sky   is blue"));
export default reverseWords;
