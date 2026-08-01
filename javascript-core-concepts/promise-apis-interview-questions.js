/*
This file contains common interview scenarios for:

✔ Promise.all()
✔ Promise.allSettled()
✔ Promise.race()
✔ Promise.any()

====================================================
*/

// Utility
const delay = (value, ms, shouldReject = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldReject ? reject(value) : resolve(value);
    }, ms);
  });

const fastSuccess = delay("Fast Success", 1000);
const slowSuccess = delay("Slow Success", 3000);
const fastFailure = delay("Fast Failure", 500, true);

console.log("=== Promise.all() ===");

Promise.all([fastSuccess, slowSuccess]).then(console.log).catch(console.error);

console.log("=== Promise.allSettled() ===");

Promise.allSettled([fastSuccess, slowSuccess, fastFailure]).then(console.log);

console.log("=== Promise.race() ===");

Promise.race([fastSuccess, slowSuccess, fastFailure])
  .then(console.log)
  .catch(console.error);

console.log("=== Promise.any() ===");

Promise.any([fastFailure, fastSuccess, slowSuccess])
  .then(console.log)
  .catch(console.error);

/*
====================================================

Interview Notes

Promise.all()

✔ Waits for all Promises.
✔ Rejects immediately if one rejects.
✔ Best when every task is required.

----------------------------------

Promise.allSettled()

✔ Waits for every Promise.
✔ Never rejects.
✔ Returns an array of objects:
{
  status: "fulfilled",
  value: ...
}
or
{
  status: "rejected",
  reason: ...
}

----------------------------------

Promise.race()

✔ First settled Promise wins.
✔ May resolve OR reject.

Useful for:
Timeouts.

----------------------------------

Promise.any()

✔ First fulfilled Promise wins.
✔ Ignores rejected Promises.
✔ Rejects only if every Promise rejects.
✔ Rejects with AggregateError.

Useful for:
Multiple mirror servers / CDNs.

====================================================

Interview Cheat Sheet

Promise.all()
→ All succeed or fail fast.

Promise.allSettled()
→ Collect every result.

Promise.race()
→ First settled wins.

Promise.any()
→ First successful result wins.

====================================================
*/
