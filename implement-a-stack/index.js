/*
    Problem Statement: Implement a Stack data structure in Javascript.
    A stack is a collection of elements that follows the Last In First Out (LIFO) principle.
    The last element added to the stack will be the first one to be removed.
*/

class Stack {
  constructor() {
    // Initialize your stack
    this.items = [];
  }

  push(element) {
    // Add element to the top
    this.items.push(element);
    return this.items.length;
  }

  pop() {
    // Remove and return top element
    if (this.isEmpty()) return undefined;
    return this.items.pop();
  }

  peek() {
    // Return top element without removing
    if (this.isEmpty()) return undefined;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    // Check if stack is empty
    return this.items.length === 0;
  }

  size() {
    // Return number of elements
    return this.items.length;
  }

  clear() {
    // Remove all elements
    this.items = [];
  }
}

const stack = new Stack();
console.log(stack.isEmpty()); // true
console.log(stack.push(10)); // 1
console.log(stack.push(20)); // 2
console.log(stack.peek()); // 20
console.log(stack.size()); // 2
console.log(stack.pop()); // 20
console.log(stack.size()); // 1
stack.clear();
console.log(stack.isEmpty()); // true

export default Stack;
