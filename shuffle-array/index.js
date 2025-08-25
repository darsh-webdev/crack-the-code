/*
    Problem Statement: Write a function that accepts an array and returns
    a new array with the elements in randomized order. Ensure that all elements
    from the original array are present exactly once and that the original array
    is not mutated.
*/

function shuffle(array) {
  const result = [...array]; // Create shallow copy

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [result[i], result[j]] = [result[j], result[i]]; // swap
  }
  return result;
}

shuffle([1, 2, 3, 4, 5]);

export default shuffle;
