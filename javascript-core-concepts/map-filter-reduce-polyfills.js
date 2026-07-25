/*

A polyfill is a custom implementation of a feature
that already exists in JavaScript.

Purpose:
- Understand how built-in methods work internally.
- Learn how Higher-Order Functions operate.
- Frequently asked in JavaScript interviews.
====================================================
*/

// ====================================================
// Polyfill for map()
// ====================================================

Array.prototype.myMap = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }

  return result;
};

// Test

const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.myMap((num) => num * 2);

console.log("myMap:", doubled);

// Expected:
// [2, 4, 6, 8, 10]

// ====================================================
// Polyfill for filter()
// ====================================================

Array.prototype.myFilter = function (callback) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

// Test

const evenNumbers = numbers.myFilter((num) => num % 2 === 0);

console.log("myFilter:", evenNumbers);

// Expected:
// [2, 4]

// ====================================================
// Polyfill for reduce()
// ====================================================

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // Handle missing initial value
  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Test

const sum = numbers.myReduce((acc, curr) => acc + curr, 0);

console.log("myReduce:", sum);

// Expected:
// 15

// ====================================================
// Real-world Example
// ====================================================

const users = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 28 },
];

// myMap

const names = users.myMap((user) => user.name);

console.log("Names:", names);

// myFilter

const adults = users.myFilter((user) => user.age >= 18);

console.log("Adults:", adults);

// myReduce

const totalAge = users.myReduce((acc, user) => acc + user.age, 0);

console.log("Total Age:", totalAge);

// ====================================================
// Summary
// =====================================================

/*

myMap()

✔ Iterates through every element
✔ Applies callback
✔ Returns a NEW array
✔ Original array remains unchanged


myFilter()

✔ Iterates through every element
✔ Keeps elements whose callback returns true
✔ Returns a NEW array


myReduce()

✔ Iterates through every element
✔ Maintains an accumulator
✔ Returns ONE final value


Callback Signature

callback(currentValue, index, array)

Reduce Callback Signature

callback(accumulator, currentValue, index, array)

====================================================

Output

myMap:
[2, 4, 6, 8, 10]

myFilter:
[2, 4]

myReduce:
15

Names:
["Alice", "Bob", "Charlie"]

Adults:
[
  { name: "Alice", age: 22 },
  { name: "Charlie", age: 28 }
]

Total Age:
66

====================================================

To Remember:

map()
→ Transform every element.

filter()
→ Select elements.

reduce()
→ Combine elements into a single value.

A polyfill recreates the behavior of a built-in
JavaScript method using basic language features.

====================================================

*/
