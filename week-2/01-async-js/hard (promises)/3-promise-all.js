/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Print how long it took for all 3 promises to resolve.
 */


function waitOneSecond() {
    return new Promise((reslov)=>{
        setTimeout(()=>{
            reslov()
        },1000)
    })
}

function waitTwoSecond() {
    return new Promise((reslov)=>{
        setTimeout(()=>[
            reslov()
        ],2000)
    })

}

function waitThreeSecond() {
    const pro = new Promise((reslov)=>{
        setTimeout(()=>{
            reslov()
        },3000)
    })
    return pro
}

function calculateTime() {
    let startTime = Date.now()
  return Promise.all([waitOneSecond(),waitTwoSecond(),waitThreeSecond()]).then((data)=>{
      let endTime =  Date.now()
      let timeTaken = Math.floor((endTime-startTime) / 1000)
      console.log(timeTaken);

})



}

calculateTime()