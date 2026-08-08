/*
    Problem Statement: Write a function that takes an age and returns a 
    string indicating whether the person is eligible to vote or not.
*/

function checkVotingEligibility(age) {
  if (age >= 18) {
    return "Eligible to vote";
  } else {
    return "Not eligible to vote";
  }
}

//For the purpose of user debugging.
console.log(checkVotingEligibility(18));
console.log(checkVotingEligibility(16));
console.log(checkVotingEligibility(25));

export default checkVotingEligibility;
