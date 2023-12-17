/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
  return new Promise((rsolve) => {
    setTimeout(() => {
      rsolve("1done");
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((rsolve) => {
    setTimeout(() => {
      rsolve("2done");
    }, t * 1000);
  });
}

function wait3(t) {
  return new Promise((rsolve) => {
    setTimeout(() => {
      rsolve("3done");
    }, t * 1000);
  });
}

function calculateTime(t1, t2, t3) {
  let startTime = Date.now();
  return wait1(t1).then((data) => {
    // console.log(data);
    return wait2(t2).then((data) => {
      //   console.log(data);
      return wait3(t3).then((data) => {
        let endTime = Date.now();
        let timeTaken = endTime - startTime;
        return timeTaken;
        // console.log(timeTaken);
      });
    });
  });
}

// calculateTime(1, 2, 3);
module.exports = calculateTime;
