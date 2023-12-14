/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {

    const pro = new Promise((reslove)=>{

        setTimeout(function(){
            reslove("scdshgcfj")
        },n*1000)

    });

    return pro
    
}

let ans = wait(8)
ans.then((data)=>{
    console.log(data);
})