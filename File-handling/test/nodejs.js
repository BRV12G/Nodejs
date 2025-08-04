const fs = require('fs');

// synchronous call/ blocking operation
// console.log("step 1");
// const data =fs.readFileSync('../contacts.txt', "utf-8");
// console.log(data);
// console.log("step 2");


// asynchronus call/ non blocking operation
console.log("step 1");
fs.readFile("../contacts.txt", "utf-8", (err, data) => {
    console.log(data);
})
console.log("step 2");