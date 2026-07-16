/*
    Problem Statement:
    Implement a lazy() function that accepts an object of functions
    and returns an object supporting:

    - Dynamic method chaining based on function names
    - Deferred execution
    - execute() to run all queued operations

    Rules:
    - Functions should not execute immediately.
    - All arguments should be preserved until execution.
    - If one function is queued, execute() returns its result.
    - If multiple functions are queued, execute() returns an array of results.
    - If no functions are queued, execute() returns [].
*/

function lazy(functions) {
  const queue = [];

  const proxy = new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "execute") {
          return () => {
            return queue.map(({ fn, args }) => fn(...args));
          };
        }

        if (!(prop in functions)) {
          return () => {
            throw new Error(`Function ${String(prop)} not found`);
          };
        }

        return (...args) => {
          queue.push({
            fn: functions[prop],
            args,
          });

          return proxy;
        };
      },
    },
  );

  return proxy;
}

//For the purpose of user debugging.
const add = (a, b) => a + b;
const result = lazy({ add }).add(2, 3).execute();
console.log("🚀 ~ result:", result);

export default lazy;
