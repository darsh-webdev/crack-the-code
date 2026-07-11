/*
    Problem Statement:
    Implement a Priority Queue where elements are stored with a priority.

    Rules:
    - Lower numerical priority means higher importance.
    - Elements with the same priority should follow FIFO ordering.
    - dequeue() removes the highest priority element.
    - peek() returns the highest priority element without removing it.
    - dequeue() and peek() return null if the queue is empty.
*/

class PriorityQueue {
  constructor() {
    this.queue = [];
    this.order = 0; // Used to preserve insertion order
  }

  enqueue(value, priority) {
    const item = {
      value,
      priority,
      order: this.order++,
    };

    let inserted = false;

    // Insert at the correct position
    for (let i = 0; i < this.queue.length; i++) {
      if (priority < this.queue[i].priority) {
        this.queue.splice(i, 0, item);
        inserted = true;
        break;
      }
    }

    // Lowest priority goes to the end
    if (!inserted) {
      this.queue.push(item);
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    return this.queue.shift().value;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.queue[0].value;
  }

  isEmpty() {
    return this.queue.length === 0;
  }

  size() {
    return this.queue.length;
  }
}

// For user debugging purposes
const pq = new PriorityQueue();

pq.enqueue("Clean the house", 2);
pq.enqueue("Do the dishes", 1);
pq.enqueue("Take out the trash", 2);

console.log(pq.dequeue()); // "Do the dishes"
console.log(pq.peek()); // "Clean the house"
console.log(pq.size()); // 2
console.log(pq.isEmpty()); // false

export default PriorityQueue;
