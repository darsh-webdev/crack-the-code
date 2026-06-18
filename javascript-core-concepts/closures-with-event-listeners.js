function attachCounter() {
  let count = 0;

  document.getElementById("btn").addEventListener("click", () => {
    count++;

    console.log(count);
  });
}

attachCounter();

/*
The event listener remembers
the count variable using closure.
*/
