// Each iteration gets its own block scope

for (let i = 1; i <= 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, i * 1000);
}

// Output:
// 1 (after 1 second)
// 2 (after 2 seconds)
// 3 (after 3 seconds)
// 4 (after 4 seconds)
// 5 (after 5 seconds)

// If we had used var instead of let, all iterations would share the same variable i, and the output would be 6 (after 1 second), 6 (after 2 seconds), ..., 6 (after 5 seconds) because by the time the callbacks execute, the loop has completed and i has been incremented to 6.
