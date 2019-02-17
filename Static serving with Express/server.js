//  importing express
var express = require('express')
// importing app from express
var app = express()

// giving the path to serve static assets
app.use(express.static(__dirname))

// serving the sever on port 3000 
var server = app.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
