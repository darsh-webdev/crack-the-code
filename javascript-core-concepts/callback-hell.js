/*

Callback Hell happens when multiple asynchronous
operations depend on each other and are written
using deeply nested callbacks.

Problems:
✔ Difficult to read
✔ Difficult to debug
✔ Difficult to maintain
✔ Error handling becomes complicated
✔ Leads to Inversion of Control

====================================================
*/

console.log("Application Started");

// Simulate asynchronous operations

function createUser(callback) {
  setTimeout(() => {
    console.log("1. User Created");
    callback();
  }, 1000);
}

function authenticateUser(callback) {
  setTimeout(() => {
    console.log("2. User Authenticated");
    callback();
  }, 1000);
}

function fetchProfile(callback) {
  setTimeout(() => {
    console.log("3. Profile Fetched");
    callback();
  }, 1000);
}

function fetchOrders(callback) {
  setTimeout(() => {
    console.log("4. Orders Fetched");
    callback();
  }, 1000);
}

// Callback Hell

createUser(() => {
  authenticateUser(() => {
    fetchProfile(() => {
      fetchOrders(() => {
        console.log("Workflow Completed");
      });
    });
  });
});

/*
====================================================

Output

Application Started

(after ~1 second)

1. User Created

(after ~1 second)

2. User Authenticated

(after ~1 second)

3. Profile Fetched

(after ~1 second)

4. Orders Fetched

Workflow Completed

====================================================

Execution Flow

createUser()
        ↓
authenticateUser()
        ↓
fetchProfile()
        ↓
fetchOrders()
        ↓
Workflow Completed

====================================================

Key Takeaways

✔ Callback Hell occurs due to deeply nested callbacks.

✔ It is also called the "Pyramid of Doom"
because of its increasing indentation.

✔ Callback Hell is a code structure problem,
not a limitation of JavaScript itself.

✔ When multiple async operations depend on
each other, nested callbacks become difficult
to read and maintain.

✔ Promises were introduced to make asynchronous
code flatter, more readable, and easier to
manage.

====================================================
*/
