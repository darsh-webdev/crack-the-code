/*
    Problem Statement:
    Given a directed graph represented as an adjacency list and a
    source node `src`, return an array `dist` where:

    - dist[i] = shortest distance (number of edges)
      from src to node i.
    - If node i is unreachable, dist[i] = Infinity.
    - Distance from src to itself is always 0.

    Constraints:
    - Graph may contain cycles.
    - Graph may be disconnected.
    - Handle invalid inputs gracefully.
*/

function shortestDistance(graph, src) {
  // Handle invalid inputs gracefully
  if (
    !Array.isArray(graph) ||
    !Number.isInteger(src) ||
    src < 0 ||
    src >= graph.length
  ) {
    return [];
  }

  const n = graph.length;

  // Int32Array is smaller & faster to allocate/access than a generic Array.
  // Use -1 as "unvisited" sentinel since typed arrays can't hold Infinity.
  const dist = new Int32Array(n).fill(-1);
  dist[src] = 0;

  // Preallocate the queue to its max possible size (n) instead of letting
  // it grow dynamically via push(). Avoids repeated resizing.
  const queue = new Int32Array(n);
  queue[0] = src;
  let head = 0;
  let tail = 1;

  while (head < tail) {
    const node = queue[head++];
    const neighbors = graph[node];

    if (!Array.isArray(neighbors)) continue;

    const len = neighbors.length;
    const d = dist[node] + 1;

    // Classic indexed for-loop: avoids iterator/generator overhead
    // that for...of carries in V8 for plain arrays.
    for (let i = 0; i < len; i++) {
      const neighbor = neighbors[i];

      if (!Number.isInteger(neighbor) || neighbor < 0 || neighbor >= n) {
        continue;
      }

      if (dist[neighbor] === -1) {
        dist[neighbor] = d;
        queue[tail++] = neighbor;
      }
    }
  }

  // Convert sentinel back to Infinity to preserve the original API/contract.
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[i] = dist[i] === -1 ? Infinity : dist[i];
  }
  result[src] = 0; // guaranteed, but cheap to keep explicit

  return result;
}

// For user debugging and testing purposes
const graph = [[1, 2], [3], [4], [5], [3], []];
console.log(shortestDistance(graph, 0)); // Output: [0, 1, 1, 2, 2, 3]

export default shortestDistance;
