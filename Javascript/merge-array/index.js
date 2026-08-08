/**
 * Problem:
 * Given two arrays of objects, merge them based on the `id` field.
 *
 * Rules:
 * 1. If an id exists in both arrays, merge their properties.
 * 2. If the same property exists in both objects, prefer the value from the second array.
 * 3. If an id exists in only one array, include it as-is.
 *
 * Return the merged array.
 */

function mergeData(arr1, arr2) {
  const map = new Map();

  // Insert all objects from the first array
  for (const obj of arr1) {
    map.set(obj.id, { ...obj });
  }

  // Merge or insert objects from the second array
  for (const obj of arr2) {
    if (map.has(obj.id)) {
      map.set(obj.id, {
        ...map.get(obj.id),
        ...obj, // Values from arr2 override arr1
      });
    } else {
      map.set(obj.id, { ...obj });
    }
  }

  return Array.from(map.values());
}

// For user debugging purposes
console.log(
  mergeData(
    [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    [
      { id: 2, age: 30 },
      { id: 3, name: "Charlie" },
    ],
  ),
);
export default mergeData;
