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
  // Input validation
  if (
    !Array.isArray(graph) ||
    !Number.isInteger(src) ||
    src < 0 ||
    src >= graph.length
  ) {
    return [];
  }

  const n = graph.length;

  const dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  const queue = [src];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];

    // Skip invalid adjacency lists
    if (!Array.isArray(graph[node])) {
      continue;
    }

    for (const neighbor of graph[node]) {
      // Ignore invalid node indices
      if (!Number.isInteger(neighbor) || neighbor < 0 || neighbor >= n) {
        continue;
      }

      // First visit = shortest path
      if (dist[neighbor] === Infinity) {
        dist[neighbor] = dist[node] + 1;
        queue.push(neighbor);
      }
    }
  }

  return dist;
}

// For user debugging and testing purposes
const graph = [[1, 2], [3], [4], [5], [3], []];
console.log(shortestDistance(graph, 0)); // Output: [0, 1, 1, 2, 2, 3]

export default shortestDistance;
