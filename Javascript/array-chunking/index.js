/*
    Problem Statement: Write a function that splits an array into chuncks of a
    given size n. If the array cannot be split evenly, the final chunk should
    contain the remaining elements.
*/

function chunkArray(arr, n) {
  if (arr.length === 0) return [];

  let result = [];
  for (let i = 0; i < arr.length; i += n) {
    result.push(arr.slice(i, i + n));
  }

  return result;
}

//For the purpose of user debugging.
console.log(chunkArray([1, 2, 3, 4, 5], 2));
export default chunkArray;
