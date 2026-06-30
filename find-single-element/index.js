/*
    Problem Statement: Given a sorted array of integers where every element appears
    twice, except for one element which appears only once. Find and return that single
    element that appears only once. 
*/

function findSingleElement(arr) {
  const map = new Map();
  arr.forEach((num) => {
    map.set(num, (map.get(num) || 0) + 1);
  });
  return [...map.entries()].find(([num, count]) => count === 1)[0];
}

// For user debugging purposes
console.log(findSingleElement([1, 1, 2]));

export default findSingleElement;
