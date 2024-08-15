//Assignment 1
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
async function doSomething() {
  console.log("Process started");
  await delay(2000);
  console.log("Completed");
}
doSomething();
