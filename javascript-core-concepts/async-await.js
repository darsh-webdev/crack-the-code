/*
async
✔ Always returns a Promise.

await
✔ Waits for a Promise to settle.
✔ Pauses only the current async function.
✔ Does NOT block the JavaScript engine.

====================================================
*/

console.log("Program Started");

// Simulate an asynchronous API call
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;

      if (success) {
        resolve({
          id: userId,
          name: "Darshan",
        });
      } else {
        reject(new Error("Failed to fetch user."));
      }
    }, 1000);
  });
}

// Async function
async function getUserDetails() {
  try {
    console.log("Fetching user...");

    const user = await fetchUser(101);

    console.log("User:", user);

    // Returning a normal value
    return user.name;
  } catch (error) {
    console.log("Error:", error.message);

    return "Guest";
  } finally {
    console.log("Request Finished");
  }
}

getUserDetails().then((name) => {
  console.log("Returned Name:", name);
});

console.log("Program Continues...");

/*
====================================================

Expected Output

Program Started
Fetching user...
Program Continues...

(after ~1 second)

User: { id: 101, name: "Darshan" }
Request Finished
Returned Name: Darshan

====================================================

Execution Flow

getUserDetails()
        ↓
async function starts
        ↓
await fetchUser()
        ↓
Promise Pending
        ↓
Function pauses
(JavaScript continues running)
        ↓
Promise Fulfilled
        ↓
Function resumes
        ↓
return user.name
        ↓
Promise Resolved
        ↓
.then()

====================================================

Key Takeaways

✔ async functions always return Promises.

✔ await works only with Promises.

✔ await pauses only the current async
function—not the JavaScript engine.

✔ Use try...catch for error handling.

✔ async/await is syntactic sugar over
Promises.

✔ It improves readability by allowing
asynchronous code to be written in a
synchronous style.

====================================================
*/
