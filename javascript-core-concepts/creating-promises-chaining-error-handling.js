/*
A Promise represents the eventual result
of an asynchronous operation.

Promise States:
✔ Pending
✔ Fulfilled
✔ Rejected
====================================================
*/

console.log("Program Started");

// Function that creates and returns a Promise
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    console.log(`Fetching user ${userId}...`);

    setTimeout(() => {
      const success = true;

      if (success) {
        resolve({
          id: userId,
          name: "Darshan",
        });
      } else {
        reject(new Error("Unable to fetch user."));
      }
    }, 1000);
  });
}

// Promise Chaining
fetchUser(101)
  .then((user) => {
    console.log("User:", user);

    // Returning a normal value
    return user.name.toUpperCase();
  })
  .then((name) => {
    console.log("Uppercase Name:", name);

    // Returning another Promise
    return fetchUser(202);
  })
  .then((secondUser) => {
    console.log("Second User:", secondUser);
  })
  .catch((error) => {
    console.log("Error:", error.message);

    // Recover from the error
    return {
      id: 0,
      name: "Guest",
    };
  })
  .then((user) => {
    if (user) {
      console.log("Recovered User:", user);
    }
  })
  .finally(() => {
    console.log("Promise Chain Completed");
  });

console.log("Program Continues...");

/*
====================================================

Execution Flow

Program Started
        ↓
fetchUser(101)
        ↓
Pending
        ↓
Fulfilled
        ↓
.then()
        ↓
.then()
        ↓
.then()
        ↓
.catch() (only if an error occurs)
        ↓
.finally()

====================================================

Key Takeaways

✔ Promise executor runs immediately.

✔ resolve(value)
→ fulfills the Promise.

✔ reject(error)
→ rejects the Promise.

✔ Every .then() returns a new Promise.

✔ Returning a value passes it to the
next .then().

✔ Returning a Promise waits for it to
settle before continuing the chain.

✔ .catch() handles errors from any
previous Promise in the chain.

✔ .finally() executes whether the
Promise succeeds or fails.

====================================================
*/
