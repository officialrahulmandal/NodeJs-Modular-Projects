// importing the filesystem module
var fs = require('fs')

// creating a json object
var data = {
    name: 'Bob'
}

// writing inside the file named data.json with the json object we just created
fs.writeFile('data.json', JSON.stringify(data), (err) =>{
    // once we are done with writing the files 'write finished' message is pop up on the console
    console.log('write finished', err)
})
