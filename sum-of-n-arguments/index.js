/*
    Problem Statement: Write a function that can take any number of arguments and return 
    their total. The function should work for both fixed and variable number of arguments
    using JavaScript features. (Input will always be numbers)
*/

function sum(...args) {
  if (args.length === 0) return 0;
  let sum = 0;
  for (const num of args) {
    sum += num;
  }
  return sum;
}

//For the purpose of user debugging.
console.log(sum(5, -5, 10, 20));

export default sum;
