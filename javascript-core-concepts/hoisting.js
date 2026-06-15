// Hoisting with var

console.log(a); // undefined
var a = 10;

// JS internally treats it like:
var a;
console.log(a);
a = 10;
