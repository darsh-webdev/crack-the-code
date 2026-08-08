/*
    Problem Statement: Write a function that takes a number and returns its factorial.
    Return false for negative numbers, non-integer numbers, and non-number inputs. 
    The factorial of 0 is 1.
*/

// Solution using recursion
function factorial(n) {
  if (
    typeof n !== "number" ||
    !Number.isFinite(n) ||
    n < 0 ||
    !Number.isInteger(n)
  )
    return false;
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

//For the purpose of user debugging.
console.log(factorial(5)); // 120
console.log(factorial([0])); // false
console.log(factorial(-5)); // false
console.log(factorial(10)); // 3628800

export default factorial;
