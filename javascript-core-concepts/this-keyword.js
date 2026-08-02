/*
Key Rule:

The value of 'this' is NOT determined by
where a function is written.

It is determined by HOW the function is called.

====================================================
*/

// --------------------------------------------------
// Global Context
// --------------------------------------------------

console.log("Global this:", this);

// --------------------------------------------------
// Regular Function
// --------------------------------------------------

function regularFunction() {
  console.log("Regular Function this:", this);
}

regularFunction();

// --------------------------------------------------
// Object Method
// --------------------------------------------------

const user = {
  name: "Darshan",

  greet() {
    console.log("Method this.name:", this.name);
  },

  regularMethod() {
    console.log("Method this:", this);
  },

  arrowMethod: () => {
    console.log("Arrow this:", this);
  },
};

user.greet();
user.regularMethod();
user.arrowMethod();

// --------------------------------------------------
// Same Function, Different 'this'
// --------------------------------------------------

function introduce(city) {
  console.log(`${this.name} lives in ${city}`);
}

const person1 = {
  name: "Darshan",
};

const person2 = {
  name: "Akshay",
};

introduce.call(person1, "Mumbai");
introduce.call(person2, "Bengaluru");

/*
====================================================

Key Takeaways

✔ 'this' is determined by HOW a function
  is invoked.

✔ Global scope:
   Browser -> window
   Node.js -> module/global context

✔ Regular function:
   Non-strict -> global object
   Strict -> undefined

✔ Object method:
   'this' refers to the object before
   the dot.

✔ Arrow functions:
   Do NOT have their own 'this'.
   They inherit 'this' from the
   surrounding lexical scope.

✔ call(), apply(), and bind()
   allow you to explicitly control
   the value of 'this'.

====================================================
*/
