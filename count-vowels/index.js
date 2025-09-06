/*
    Problem Statement: Write a function that takes a string as input and returns
    the number of vowels in that string. Vowels include both lowercase and uppercase
    characters.
*/

function countVowels(str) {
  // RegEx to match vowels (both uppercase and lowercase)
  const vowelsRegex = /[aeiouAEIOU]/g;

  // Match the vowels in the string
  const vowelsInStr = str.match(vowelsRegex);

  // Return the count of vowels found
  if (vowelsInStr) {
    return vowelsInStr.length;
  }
  // If no vowels found, return 0
  return 0;
}

//For the purpose of user debugging.
console.log(countVowels("HeLLO"));

export default countVowels;
