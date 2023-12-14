/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

<<<<<<< HEAD
function sleep (milliseconds) {

    console.log("start");
    return new Promise((resolve)=>{
        setTimeout(()=>
        {
        resolve("excuted")
        },milliseconds)
    })
}

sleep(9000).then((data)=>{console.log(data);})
=======
function sleep(milliseconds) {
}

module.exports = sleep;
>>>>>>> a89f27a5191bfb3b539213f7adf5c1a83e21a948
