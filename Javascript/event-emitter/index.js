/*
    Problem Statement:
    Implement an EventEmitter class supporting:

    - on(event, callback)
      Register a callback for an event.

    - once(event, callback)
      Register a callback that executes only once.

    - off(event, callback)
      Remove a specific callback from an event.

    - emit(event, ...args)
      Trigger all callbacks registered for the event.

    Constraints:
    - Multiple listeners per event are allowed.
    - once listeners should auto-remove after execution.
    - off should not throw if callback doesn't exist.
    - emit should handle missing listeners gracefully.
*/

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback,
      once: false,
    });
  }

  once(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push({
      callback,
      once: true,
    });
  }

  off(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }

    this.events[eventName] = this.events[eventName].filter(
      (listener) => listener.callback !== callback,
    );

    // Optional cleanup
    if (this.events[eventName].length === 0) {
      delete this.events[eventName];
    }
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) {
      return;
    }

    // Copy array to avoid modification during iteration
    const listeners = [...this.events[eventName]];

    for (const listener of listeners) {
      listener.callback(...args);

      if (listener.once) {
        this.off(eventName, listener.callback);
      }
    }
  }
}

// For User debugging purposes
const emitter = new EventEmitter();

const log = (...args) => console.log(...args);

emitter.on("sayHello", log);
emitter.emit("sayHello", "Hello, World!"); // Logs: Hello, World!

emitter.once("sayBye", () => console.log("Bye!"));
emitter.emit("sayBye"); // Logs: Bye!
emitter.emit("sayBye"); // No output, as the listener was removed after the first call

emitter.off("sayHello", log);
emitter.emit("sayHello", "Hi again!"); // No output, as the listener was removed

export default EventEmitter;
