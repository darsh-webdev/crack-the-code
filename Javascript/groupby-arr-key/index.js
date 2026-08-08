/*
    Problem Statement: Write a function that takes an array of objects and a property
    name (as a string), and returns an object where the keys are the unique values of
    the specified property, and the values are arrays of objects that have that property
    value.
*/

function groupBy(arr, key) {
  if (!key) return {};

  let result = {};

  for (const item of arr) {
    const keyValue = item[key];
    if (!result.hasOwnProperty(keyValue)) {
      result[keyValue] = [];
    }
    result[keyValue].push(item);
  }

  return result;
}

groupBy(
  [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 },
  ],
  "age"
);

export default groupBy;
