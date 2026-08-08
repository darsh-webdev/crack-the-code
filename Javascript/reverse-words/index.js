/*
    Problem Statement: Write a function that takes a sentence string as input and 
    returns a new string where each word reversed but the order of the words reamins
    the same. Words are separated by spaces. Preserve the original spacing.
*/

function reverseWords(sentence) {
  return sentence
    .split(" ")
    .map((str) => str.split("").reverse().join(""))
    .join(" ");
}

//For the purpose of user debugging.
console.log(reverseWords("  Hello  and World "));

export default reverseWords;
