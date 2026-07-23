/*
===========================================
Namaste JavaScript - Episode 18
Higher-Order Functions & Functional Programming
===========================================

Definition:
A Higher-Order Function (HOF) is a function that:
1. Accepts another function as an argument, OR
2. Returns another function.

Examples:
- map()
- filter()
- reduce()
- forEach()
- sort()

Functional Programming encourages
writing reusable, declarative and
predictable code.
*/

// Sample Data
const numbers = [1, 2, 3, 4, 5];

// ------------------------------
// map()
// ------------------------------

const doubled = numbers.map((num) => num * 2);

console.log("Original:", numbers);
console.log("Doubled:", doubled);

// ------------------------------
// filter()
// ------------------------------

const evenNumbers = numbers.filter((num) => num % 2 === 0);

console.log("Even Numbers:", evenNumbers);

// ------------------------------
// reduce()
// ------------------------------

const sum = numbers.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

console.log("Sum:", sum);

// ------------------------------
// Higher-Order Function
// ------------------------------

function calculate(arr, operation) {
  return arr.map(operation);
}

function square(num) {
  return num * num;
}

const squared = calculate(numbers, square);

console.log("Squared:", squared);

/*
===========================================

Output

Original: [1,2,3,4,5]
Doubled: [2,4,6,8,10]
Even Numbers: [2,4]
Sum: 15
Squared: [1,4,9,16,25]

===========================================

Key Takeaways

✔ Higher-Order Functions either
  accept or return functions.

✔ Callback Functions are passed
  into Higher-Order Functions.

✔ map()
  → transforms every element.

✔ filter()
  → keeps elements matching a condition.

✔ reduce()
  → combines all elements into one value.

✔ map(), filter() and reduce()
  return new arrays (reduce returns
  a single accumulated value) and
  do not modify the original array.

✔ Functional Programming promotes
  reusable and readable code.

===========================================
*/
