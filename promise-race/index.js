/*
    Problem Statement: Implement a function `promiseRace` that mimics the 
    behavior of JavaScript's Promise.race(). The function takes an array 
    of promises or values and returns a promise that settles (resolves or rejects)
    as soon as the first input promise/value settles.

*/

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) return;

    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject);
    }
  });
}

// For user debugging purposes
promiseRace([Promise.resolve(1), Promise.resolve(2)]).then(console.log); // 1
export default promiseRace;
