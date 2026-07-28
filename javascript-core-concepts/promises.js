/*
A Promise is an object representing the
eventual completion (or failure) of an
asynchronous operation.

Promise States:

1. Pending
2. Fulfilled
3. Rejected

A Promise can settle only once.

====================================================
*/

console.log("Program Started");

// Creating a Promise

const fetchUser = new Promise((resolve, reject) => {
  console.log("Fetching user...");

  setTimeout(() => {
    const success = true;

    if (success) {
      resolve({
        id: 1,
        name: "Darshan",
      });
    } else {
      reject("Failed to fetch user.");
    }
  }, 2000);
});

// Consuming the Promise

fetchUser
  .then((user) => {
    console.log("User:", user);

    return user.name;
  })
  .then((name) => {
    console.log("Name:", name);
  })
  .catch((error) => {
    console.log("Error:", error);
  })
  .finally(() => {
    console.log("Promise Completed");
  });

console.log("Program Continues...");

/*
====================================================

Expected Output

Program Started
Fetching user...
Program Continues...

(after ~2 seconds)

User: { id: 1, name: "Darshan" }
Name: Darshan
Promise Completed

====================================================

Promise Lifecycle

Pending
   ↓
Fulfilled (resolve)
        OR
Rejected (reject)

====================================================

Advantages over Callbacks

✔ Avoids Callback Hell

✔ Solves Inversion of Control

✔ Better error handling
  using .catch()

✔ Promise can resolve/reject
  only once

✔ Supports chaining using .then()

====================================================

Key Takeaways

✔ A Promise represents the future
  result of an asynchronous operation.

✔ resolve(value)
  → fulfills the Promise.

✔ reject(error)
  → rejects the Promise.

✔ .then()
  → handles success.

✔ .catch()
  → handles failure.

✔ .finally()
  → executes regardless of success
  or failure.

====================================================
*/
