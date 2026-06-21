setTimeout(() => {
  console.log("Executed");
}, 0);

/*
Event Loop continuously checks:

"Is the Call Stack empty?"

If yes:
Move callback from Callback Queue
to Call Stack.
*/
