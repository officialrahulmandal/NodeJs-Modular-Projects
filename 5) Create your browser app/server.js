// importing the express module
var express = require('express')
// using app from express library
var app = express()

// finding the path for static assets
app.use(express.static(__dirname))

// this will tell Us that on which port the server is running
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
