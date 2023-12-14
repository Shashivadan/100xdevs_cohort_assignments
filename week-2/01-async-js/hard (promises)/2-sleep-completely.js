/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

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
