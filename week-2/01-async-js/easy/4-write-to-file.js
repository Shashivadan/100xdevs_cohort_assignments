

fs = require("fs")

let content = "hello there. this is Shahsi"

fs.readFile("./textfile.txt","utf-8",function(err,data){
    if (err) throw err;
    console.log(data);
})

// fs.writeFile("./textfile.txt",content,"utf-8",function(err){
//     if (err) throw err
// })

fs.appendFile("./textfile.txt",content,"utf-8",(err)=>{
    if (err) throw err;
})
// fs.readFile("./textfile.txt","utf-8",function(err,data){

//     if (err) throw err;
//     console.log(data);
// })