const fs = require('fs');
import fs from 'fs';

// synchronous call
fs.writeFileSync('./test.txt', "Hello world");

//asynchronus call
fs.writeFile("./test2.txt", "Hello world asynchronus", (err) => {
    
})


// read contents of a file synchornously
const data = fs.readFileSync("./contacts.txt", "utf-8");
console.log(data);

//read contents of a file asyncchornously
const dataasync = fs.readFile("./contacts.txt", "utf-8", 
    (err, dataasync) => {
    if(err){
        console.log(err);
    }else {
        console.log(dataasync);
    }
}
);
console.log(dataasync);



//append sync
fs.appendFileSync("./test.txt", new Date().toDateString());
fs.appendFileSync("./test.txt", new Date().toTimeString());
fs.appendFileSync("./test2.txt", "Hey there\n");


//copy sync
fs.cpSync("./test2.txt", "./test3.txt");

//stats sync
const stats = fs.statSync("./test.txt");
console.log(stats);

//creating directories
fs.mkdirSync("test");



