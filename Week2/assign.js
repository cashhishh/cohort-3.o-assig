//ex-1
const fs = require("fs");
const { resolve } = require("path");

function readFilePromise(filepath, encoding) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fs.readFile(filepath, encoding, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    }, 3000);
  });
}
async function readfileAsync(filepath, encoding, delay) {
  try {
    const data = await readFilePromise(filepath, encoding, delay);
    console.log("File content: ", data);
  } catch (error) {
    console.error("E: ", err);
  }
}
readfileAsync("b.txt", "utf-8", 3000);

//eg-2
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function doSomethingdelayed() {
  console.log("Task started");

  await timeout(3000);
  console.log("Task completed after 3 sec");
}
doSomethingdelayed();

//ex-3
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    if (!response.ok) {
      throw new Error("something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Data: ", data);
    console.log("fetching succesfull");
  })
  .catch((error) => {
    console.log("problem occured");
  });
