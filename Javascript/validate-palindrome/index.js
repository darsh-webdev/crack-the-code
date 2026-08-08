/*
    Problem Statement: Write a function that checks if a given string is a palindrome.
    A palindrome is a word, phrase, number, or other sequences of characters that reads 
    the same forward and backward(ignoring cases and all non-alphanumeric characters).
*/

function validatePalindrome(str) {
  // To ignore case and non-alphanumeric characters
  const format = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Reverse the formatted string
  const reverseStr = str.split("").reverse().join("");

  // Check if the formatted string is equal to its reverse
  return format(str) === format(reverseStr);
}

//For the purpose of user debugging.
console.log(validatePalindrome("race a car"));

export default validatePalindrome;
