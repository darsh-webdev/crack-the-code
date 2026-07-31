/*

Promise APIs:

✔ Promise.all()
✔ Promise.allSettled()
✔ Promise.race()
✔ Promise.any()

====================================================
*/

// Helper function
function createPromise(name, delay, shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`${name} Success`);
      } else {
        reject(`${name} Failed`);
      }
    }, delay);
  });
}

const p1 = createPromise("API 1", 1000);
const p2 = createPromise("API 2", 2000);
const p3 = createPromise("API 3", 1500, false);

console.log("Program Started");

// --------------------------------------------------
// Promise.all()
// Resolves when ALL promises fulfill.
// Rejects immediately if ANY promise rejects.
// --------------------------------------------------

Promise.all([p1, p2])
  .then((result) => {
    console.log("Promise.all():", result);
  })
  .catch(console.error);

// --------------------------------------------------
// Promise.allSettled()
// Waits for every promise to settle.
// Never rejects.
// --------------------------------------------------

Promise.allSettled([p1, p2, p3]).then((result) => {
  console.log("Promise.allSettled():", result);
});

// --------------------------------------------------
// Promise.race()
// Settles with the FIRST settled promise
// (fulfilled OR rejected).
// --------------------------------------------------

Promise.race([p1, p2, p3])
  .then((result) => {
    console.log("Promise.race():", result);
  })
  .catch((error) => {
    console.log("Promise.race() Error:", error);
  });

// --------------------------------------------------
// Promise.any()
// Resolves with the FIRST fulfilled promise.
// Rejects only if ALL promises reject.
// --------------------------------------------------

Promise.any([p3, p2])
  .then((result) => {
    console.log("Promise.any():", result);
  })
  .catch((error) => {
    console.log("Promise.any() Error:", error);
  });

/*
====================================================

Summary

Promise.all()

✔ Waits for all promises
✔ Fails fast if any reject
✔ Returns array of resolved values

Use when:
Every request must succeed.

-----------------------------------

Promise.allSettled()

✔ Waits for all promises
✔ Never rejects
✔ Returns status of every promise

Use when:
You want every result regardless of failure.

-----------------------------------

Promise.race()

✔ First settled promise wins
✔ Can resolve OR reject

Use when:
You need the fastest response or a timeout.

-----------------------------------

Promise.any()

✔ First fulfilled promise wins
✔ Ignores rejected promises
✔ Rejects only if every promise fails

Use when:
You have multiple fallback sources and only
need the first successful result.

====================================================

Interview Cheat Sheet

Promise.all()
→ All must succeed.

Promise.allSettled()
→ Get every outcome.

Promise.race()
→ First settled wins.

Promise.any()
→ First success wins.

====================================================
*/
