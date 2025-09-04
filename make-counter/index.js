/*
    Problem Statement: Write a function that returns a counter object with
    methods to increment, decrement, reset the counter. The counter should
    maintain its current value between method calls.
    Optional: getValue method to retrieve the current value of the counter.
*/

function makeCounter(initialValue = 0) {
  let count = initialValue;

  return {
    increment: () => {
      count++;
      return count;
    },
    decrement: () => {
      count--;
      return count;
    },
    reset: () => {
      count = initialValue;
      return count;
    },
    getValue: () => {
      return count;
    },
  };
}

//For the purpose of user debugging.
const counter = makeCounter(8);
console.log(counter.getValue()); // 8
console.log(counter.increment()); // 9
console.log(counter.increment()); // 10
console.log(counter.decrement()); // 9
console.log(counter.reset()); // 8

export default makeCounter;
