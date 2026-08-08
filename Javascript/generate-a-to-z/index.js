/*
    Problem Statement: Write a function that returns an array of 26 strings
    representing the letters of the English alphabet, in order.
*/

function generateAtoZ() {
  let arr = [];
  for (let i = 65; i <= 90; i++) {
    arr.push(String.fromCharCode(i));
  }

  return arr;
}

// For user debugging
console.log(generateAtoZ()); // ['A', 'B', 'C', 'D', 'E', ..., 'Z']
export default generateAtoZ;
