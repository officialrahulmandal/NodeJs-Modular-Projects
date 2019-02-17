// importing filesystem module
var fs = require('fs')

// There are two ways to import a file 

// First way is by simply importing the file
// importing data.json file path
var data = require('./data.json')

// and then simply accesing the content inside the file
console.log(data.name)

// Second way is reading the file with utf-8 encoding
// reading the file
fs.readFile('./data.json', 'utf-8', (err,data) => {
    // reading the file and parsing the json content inside the file
    var data = JSON.parse(data)
    // printing  the data inside that file
    console.log(data.name)
})
