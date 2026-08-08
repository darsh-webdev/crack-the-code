/*
    Problem Statement:
    Implement deepOmit(obj, keysToOmit) that removes all occurrences
    of specified keys from a deeply nested object or array.

    Requirements:
    - Do not mutate the original object.
    - Remove keys at every nesting level.
    - Preserve array structure.
    - Support nested objects and arrays.
*/

function deepOmit(obj, keysToOmit) {
  const omitSet = new Set(keysToOmit);

  function helper(value) {
    // Primitive values
    if (value === null || typeof value !== "object") {
      return value;
    }

    // Arrays
    if (Array.isArray(value)) {
      return value.map(helper);
    }

    // Objects
    const result = {};

    for (const key in value) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        continue;
      }

      if (omitSet.has(key)) {
        continue;
      }

      result[key] = helper(value[key]);
    }

    return result;
  }

  return helper(obj);
}

// for user debugging and testing purposes
const obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
};
console.log(deepOmit(obj, ["c"]));

export default deepOmit;
