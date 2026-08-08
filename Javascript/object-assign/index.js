/*
    Problem Statement: Implement a function that mimics the behavior of Object.assign(),
    which copies the values of all enumerable own properties from one or more source objects 
    to a target object. The function should return the target object.
*/

function customAssign(target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError("Cannot convert undefined or null to object");
  }

  const to = Object(target);

  for (const source of sources) {
    if (source === null || source === undefined) continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        to[key] = source[key];
      }
    }
  }

  return to;
}

//For the purpose of user debugging.
console.log(customAssign({ a: 1 }, { b: 2 })); // { a: 1, b: 2 }
export default customAssign;
