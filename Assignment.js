//Assignment 1
function sum(a, b) {
  let total = a + b;
  return total;
}
console.log(sum(1, 3));

//Assignment 2

function canVote(age) {
  if (age > 18) {
    console.log("You can vote");
  } else {
    console.log("You are a minor");
  }
}
canVote(12);

//Assignment 3
function OddorEven(num) {
  if (num % 2 == 0) {
    console.log("The number is even");
  } else {
    console.log("The number is odd");
  }
}
OddorEven(12);

//Assignment 4
function findSum(a) {
  if (a < 1) {
    return 0;
  }
  let total = 0;
  for (i = 1; i < a; i++) {
    total += i;
  }
  return total;
}
console.log(findSum(5));
