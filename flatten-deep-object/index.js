/*
    Problem Statement: Write a function that takes a deeply nested object and 
    returns a new object where nested keys are represented with dot-separated keys.
*/

function flattenObject(obj) {
  const result = {};

  function flatten(current, path = "") {
    for (const key in current) {
      const value = current[key];
      const newPath = path ? `${path}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        flatten(value, newPath);
      } else {
        result[newPath] = value;
      }
    }
  }

  flatten(obj);
  return result;
}

//For the purpose of user debugging.
console.log(flattenObject({ a: { b: 1 } }));

export default flattenObject;
