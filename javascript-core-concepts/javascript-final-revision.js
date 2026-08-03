/*
Topics Covered

✔ Execution Context
✔ Hoisting
✔ Scope Chain
✔ Lexical Environment
✔ Closures
✔ First-Class Functions
✔ Higher-Order Functions
✔ map()
✔ filter()
✔ reduce()
✔ Polyfills
✔ Callback Functions
✔ Callback Hell
✔ Event Loop
✔ Browser Web APIs
✔ setTimeout()
✔ Promises
✔ Promise Chaining
✔ Error Handling
✔ async / await
✔ Promise APIs
✔ this keyword

==========================================================
1. Execution Context
==========================================================

Memory Creation Phase
↓
Code Execution Phase

var -> undefined
let / const -> TDZ
Function Declaration -> Entire function hoisted

==========================================================
2. Closures
==========================================================

Function + Lexical Environment = Closure

Closures remember variables even after
the outer function has finished execution.

==========================================================
3. Event Loop
==========================================================

Call Stack
    ↓
Browser Web APIs
    ↓
Callback Queue
    ↓
Event Loop
    ↓
Call Stack

setTimeout()
provides a MINIMUM delay,
not an EXACT delay.

==========================================================
4. Higher-Order Functions
==========================================================

map()
→ Transform

filter()
→ Select

reduce()
→ Accumulate

==========================================================
5. Promises
==========================================================

Pending
   ↓
Fulfilled
OR
Rejected

resolve()
→ Success

reject()
→ Failure

Promise Chaining
→ Avoids Callback Hell

==========================================================
6. async / await
==========================================================

async
→ Always returns a Promise

await
→ Pauses only the current async function
→ Does NOT block JavaScript

==========================================================
7. Promise APIs
==========================================================

Promise.all()
→ All must succeed

Promise.allSettled()
→ Get every result

Promise.race()
→ First settled wins

Promise.any()
→ First fulfilled wins

==========================================================
8. this Keyword
==========================================================

Regular Function
→ Depends on how it is called

Arrow Function
→ Lexically inherits this

==========================================================
9. Interview Rules
==========================================================

✔ JavaScript is single-threaded.

✔ The Event Loop moves callbacks only
when the Call Stack is empty.

✔ Closures retain references,
not copies.

✔ Every async function returns a Promise.

✔ Every .then() returns a new Promise.

✔ Promise.all() fails fast.

✔ Promise.any() ignores rejected promises.

✔ Arrow functions don't have their own this.

✔ map(), filter(), reduce()
do not mutate the original array.

==========================================================
10. JavaScript Learning Journey
==========================================================

Execution Context
        ↓
Hoisting
        ↓
Scope
        ↓
Closures
        ↓
Callbacks
        ↓
Event Loop
        ↓
Promises
        ↓
async / await
        ↓
Promise APIs
        ↓
this
        ↓
Interview Ready 🚀

==========================================================
*/
