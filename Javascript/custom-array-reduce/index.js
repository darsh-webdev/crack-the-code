/*
    Problem Statement: Implement a custom version of the Array.prototype.reduce
    method and add it to the Array.prototype object as myReduce. The method should
    iterate over the array, apply a reducer function to each element and return
    a single accumulated value.
*/

Array.prototype.myReduce = function (callback, initialValue) {
  // If callback is not a function, throw TypeError
  if (typeof callback !== "function")
    throw TypeError("Callback is not a function");

  const arr = this;
  const len = arr.length;

  if (!len && arguments.length < 2)
    throw TypeError("Empty array with no initial value");

  let acc;
  let startIndex;

  // If no initialValue, use the first element as accumulator
  if (arguments.length < 2) {
    // Find first *present* element to use as initial value
    let i = 0;
    while (i < len && !(i in arr)) {
      i++;
    }
    if (i >= len) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    acc = arr[i];
    startIndex = i + 1;
  } else {
    acc = initialValue;
    startIndex = 0;
  }

  for (let i = startIndex; i < len; i++) {
    // skip holes
    if (i in arr) {
      acc = callback(acc, arr[i], i, arr);
    }
  }
  return acc;
};

console.log([1, , 3].myReduce((acc, val) => acc + val));
