/*
    Problem Statement:
    Implement mapAsyncLimit(arr, limit, asyncFn) that:

    1. Executes asyncFn for every item in arr.
    2. Runs at most `limit` operations concurrently.
    3. Returns results in the same order as input.
    4. Rejects immediately if any operation fails.
*/

async function mapAsyncLimit(arr, limit, asyncFn) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return [];
  }

  if (limit < 1) {
    throw new Error("limit must be at least 1");
  }

  const results = new Array(arr.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const currentIndex = nextIndex++;

      if (currentIndex >= arr.length) {
        return;
      }

      results[currentIndex] = await Promise.resolve(
        asyncFn(arr[currentIndex], currentIndex, arr),
      );
    }
  }

  const workers = Array(Math.min(limit, arr.length))
    .fill(null)
    .map(() => worker());

  await Promise.all(workers);

  return results;
}

//For the purpose of user debugging.
const delayFn = async (x) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return x * 2;
};
const result = await mapAsyncLimit([1, 2, 3, 4], 2, delayFn);
console.log(result); // Output: [2, 4, 6, 8]

// Example usage of mapAsyncLimit with a limit of 1
const result2 = await mapAsyncLimit([1, 2, 3], 1, delayFn);
console.log(result2); // Output: [2, 4, 6]

// Example usage of mapAsyncLimit with a limit of 2 and synchronous function
const result3 = await mapAsyncLimit([1, 2, 3], 2, (x) => x * 10);
console.log(result3); // Output: [10, 20, 30]

export default mapAsyncLimit;
