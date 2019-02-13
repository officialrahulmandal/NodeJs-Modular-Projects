// importing the filesystem module
var fs = require('fs')

// reading all the directories from c Drive
fs.readdir('c:/', (err, data) => {
    // displaying the output over the console
    console.log(data)
})
