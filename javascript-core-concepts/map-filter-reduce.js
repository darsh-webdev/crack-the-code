/*

These are Higher-Order Array Methods.

✔ map()    -> Transform every element
✔ filter() -> Keep elements matching a condition
✔ reduce() -> Reduce an array into a single value
*/

const numbers = [1, 2, 3, 4, 5];

// ===========================================
// map()
// ===========================================

const squaredNumbers = numbers.map((num) => num * num);

console.log("Original:", numbers);
console.log("Squared:", squaredNumbers);

// ===========================================
// filter()
// ===========================================

const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log("Even Numbers:", evenNumbers);

// ===========================================
// reduce()
// ===========================================

const sum = numbers.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0);

console.log("Sum:", sum);

// ===========================================
// Real-world Example
// ===========================================

const users = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 16 },
  { name: "Charlie", age: 28 },
];

// Get all names
const names = users.map((user) => user.name);

// Get adults
const adults = users.filter((user) => user.age >= 18);

// Total age
const totalAge = users.reduce((acc, user) => acc + user.age, 0);

console.log("Names:", names);
console.log("Adults:", adults);
console.log("Total Age:", totalAge);

/*
===========================================

Output

Original: [1,2,3,4,5]
Squared: [1,4,9,16,25]

Even Numbers:
[2,4]

Sum:
15

Names:
["Alice","Bob","Charlie"]

Adults:
[
  {name:"Alice",age:22},
  {name:"Charlie",age:28}
]

Total Age:
66

===========================================

Quick Summary

map()
→ transforms every element
→ returns a new array

filter()
→ keeps matching elements
→ returns a new array

reduce()
→ combines all elements
→ returns a single value

None of these methods modify
the original array.

===========================================
*/
