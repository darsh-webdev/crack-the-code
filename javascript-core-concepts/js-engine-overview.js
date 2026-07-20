/*
JavaScript Engine

A JavaScript Engine converts JavaScript
source code into machine code so that
the CPU can execute it.

Examples:

V8          -> Chrome, Node.js
SpiderMonkey -> Firefox
JavaScriptCore -> Safari
*/

/*
V8 Execution Pipeline

JavaScript Source Code
        ↓
      Parser
        ↓
Abstract Syntax Tree (AST)
        ↓
Interpreter (Ignition)
        ↓
Machine Code
        ↓
Execution

Frequently executed (Hot) code
is later optimized by TurboFan.
*/

function add(a, b) {
  return a + b;
}

// Imagine this function is called
// thousands of times.

for (let i = 0; i < 100000; i++) {
  add(i, i);
}

/*
Functions executed repeatedly
become "Hot Code".

V8 may optimize them using
TurboFan for better performance.
*/

function createUser() {
  const user = {
    name: "Darshan",
    age: 22,
  };

  return user;
}

let person = createUser();

person = null;

/*
The object created earlier
is no longer reachable.

JavaScript's Garbage Collector
can reclaim its memory.
*/

/*
Ignition
---------
✔ Interprets bytecode
✔ Starts execution quickly

TurboFan
---------
✔ Optimizes frequently
   executed (Hot) code
✔ Produces highly optimized
   machine code
✔ Improves performance
*/
