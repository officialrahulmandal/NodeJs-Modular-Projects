// importing filesystem module
var fs = require('fs')
// importing data.json file path
var data = require('./data.json')

// 
console.log(data.name)

// reading the file
fs.readFile('./data.json', 'utf-8', (err,data) => {
    // reading the file and parsing the json content inside the file
    var data = JSON.parse(data)
    // printing 
    console.log(data.name)
})
