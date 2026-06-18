// <--------------------------- Functions can be assigned to variables --------------------------->

const greet = function () {
  console.log("Hello");
};

greet();

/*
Functions behave like values.

They can be:
- Stored in variables
- Passed as arguments
- Returned from functions
*/

// <--------------------------- Functions as Arguments --------------------------->
function greet() {
  console.log("Hello");
}

function execute(fn) {
  fn();
}

execute(greet);

/*
Functions can be passed
to other functions.
*/

// <--------------------------- Functions returning functions --------------------------->
function multiply(multiplier) {
  return function (num) {
    return num * multiplier;
  };
}

const double = multiply(2);

console.log(double(5)); // 10

/*
Functions can return functions.

This is heavily used in
closures and currying.
*/

// <--------------------------- Functions Statement vs Expression --------------------------->
// Function Statement

sayHi();

function sayHi() {
  console.log("Hi");
}

// Function Expression

// sayHello(); // TypeError

var sayHello = function () {
  console.log("Hello");
};

/*
Function declarations are hoisted.

Function expressions behave
like variables.
*/

// <--------------------------- Callback Functions --------------------------->
function processUser(callback) {
  console.log("Processing user...");

  callback();
}

processUser(() => {
  console.log("User processed");
});

/*
A callback is a function
passed to another function.
*/


