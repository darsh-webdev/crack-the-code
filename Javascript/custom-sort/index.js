/*
    Problem Statement: Write a function that takes an array of characters and numbers as input 
    and sorts them such that all characters come before numbers, and both characters and numbers 
    are sorted in ascending order within their respective groups.
*/

function customSort(arr) {
  const chars = arr.filter((ch) => /[A-Za-z]/.test(ch)) || [];
  const nums = arr.filter((ch) => /[0-9]/.test(ch)) || [];

  function bubbleSort(arr) {
    let result = [...arr];
    for (let i = 0; i < result.length; i++) {
      for (let j = 0; j < result.length - i - 1; j++) {
        if (result[j] > result[j + 1]) {
          [result[j], result[j + 1]] = [result[j + 1], result[j]];
        }
      }
    }

    return arr;
  }

  const sortedChars = bubbleSort(chars);
  const sortedNums = bubbleSort(nums);

  return [...sortedChars, ...sortedNums];
}

const input = ["g", "s", 5, 2, "c", "e", 6, 1, "a"];
console.log(customSort(input));
export default customSort;
