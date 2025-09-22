/*
    Problem Statement: Write a function that takes a string path and an object, 
    and returns the value at that path within the object. The path can include
    nested properties and array indices.
*/

function getResultByPath(path, obj) {
  // Replace array indices with dot notation
  const normalizedPath = path.replace(/\[(\d+)\]/g, ".$1");
  const keys = normalizedPath.split(".");

  // Traverse the object using the keys
  let result = obj;
  for (let key of keys) {
    if (result === undefined || result === null) break;
    result = result[key];
  }

  return result;
}

const path = "data.results.error";
const obj = {
  data: {
    results: {
      status: "completed",
      error: "",
    },
  },
};

// For user debugging purposes
console.log(getResultByPath(path, obj));
export default getResultByPath;
