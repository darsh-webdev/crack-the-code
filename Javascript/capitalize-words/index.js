/*
    Problem Statement: Write a function that takes a sentence as input and returns a new
    sentence where the first letter of each word is capitalized and the rest of the letters
    are in lowercase.
*/

function capitalizeWords(sentence) {
  return sentence
    .trim() // Remove space from starting and ending of sentence
    .split(/\s+/) // Split by one or move spaces
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // For each word capitalize the first letter and lowercase the rest
    .join(" "); // Join back words to create the result string
}

//For the purpose of user debugging.
console.log(capitalizeWords("hello world"));
export default capitalizeWords;
