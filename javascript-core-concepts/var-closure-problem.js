// Classic var + Closure problem

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

/*
Output:

3
3
3

All callbacks share
the same variable 'i'.
*/

// < ------------------- Fixing the problem ------------------------>

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}

/*
Output:

0
1
2

Each iteration gets
its own binding of i.
*/
