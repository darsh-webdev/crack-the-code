// Scope chain lookup

var a = 100;

function outer() {
  var b = 200;

  function inner() {
    console.log(a); // found in global scope
    console.log(b); // found in outer scope
  }

  inner();
}

outer();