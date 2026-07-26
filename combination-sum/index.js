/*
    Problem Statement:
    Given an array of distinct positive integers `candidates`
    and a target integer `target`, return all unique combinations
    of candidates where the chosen numbers sum to `target`.

    Rules:
    - A candidate can be chosen unlimited times.
    - Return all unique combinations.
    - Return [] if no combination exists.
*/

function combinationSum(candidates, target) {
  const result = [];

  function backtrack(startIndex, currentCombination, remainingTarget) {
    // Found a valid combination
    if (remainingTarget === 0) {
      result.push([...currentCombination]);
      return;
    }

    // Exceeded target
    if (remainingTarget < 0) {
      return;
    }

    for (let i = startIndex; i < candidates.length; i++) {
      const num = candidates[i];

      currentCombination.push(num);

      // Reuse same number by passing i again
      backtrack(i, currentCombination, remainingTarget - num);

      // Backtrack
      currentCombination.pop();
    }
  }

  backtrack(0, [], target);

  return result;
}

// For user debugging and testing purposes
const candidates = [2, 3, 6, 7];
const target = 7;
console.log(combinationSum(candidates, target));

export default combinationSum;
