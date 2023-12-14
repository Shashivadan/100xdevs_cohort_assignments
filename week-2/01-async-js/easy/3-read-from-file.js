const { log } = require("console")

fs = require("fs")


fs.readFile('./textfile.txt',"utf8",function(err,data){

    if (err) throw err;

    console.log(data);
})