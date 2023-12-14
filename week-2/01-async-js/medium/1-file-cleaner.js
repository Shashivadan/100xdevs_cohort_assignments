fs = require("fs")

fs.readFile("./text.txt","utf-8",function(err, data){
    if (err) throw err
    console.log(data);

    let answer = data.replace(/\s+/g, " ").trim();

    fs.writeFile("./text.txt",answer,"utf8",function(err){
        if (err) throw err;
    })
})


setTimeout((function(){
    fs.readFile("./text.txt","utf-8",function(err, data){
        if (err) throw err
        console.log(data);
    })
}),1000)



