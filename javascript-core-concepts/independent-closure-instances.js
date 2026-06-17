function createCounter() {
  let count = 0;

  return {
    increment() {
      count++;
    },

    print() {
      console.log(count);
    },
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

counter1.increment();
counter1.increment();

counter2.increment();

counter1.print(); // 2
counter2.print(); // 1

/*
Every function invocation
gets its own lexical environment.
*/
