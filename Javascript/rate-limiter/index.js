/*
    Problem Statement:
    Given an array of request timestamps, implement a sliding window
    rate limiter that allows at most `limit` requests within a
    `windowSize` time period.

    Return an array containing the indices of requests that are allowed.

    Rules:
    - Requests expire exactly at timestamp + windowSize.
    - Expired requests should be removed before processing a new request.
    - Timestamps are sorted in ascending order.
*/

function rateLimiter(requests, limit, windowSize) {
  if (!Array.isArray(requests)) {
    return [];
  }

  const allowedIndices = [];
  const window = [];

  for (let i = 0; i < requests.length; i++) {
    const currentTime = requests[i];

    // Remove expired requests
    while (window.length > 0 && window[0] + windowSize <= currentTime) {
      window.shift();
    }

    // Allow request if capacity exists
    if (window.length < limit) {
      allowedIndices.push(i);
      window.push(currentTime);
    }
  }

  return allowedIndices;
}

const requests = [1, 2, 3, 4, 5];
const limit = 3;
const windowSize = 2;

console.log(rateLimiter(requests, limit, windowSize)); // Output: [0, 1, 2, 3, 4]

export default rateLimiter;
