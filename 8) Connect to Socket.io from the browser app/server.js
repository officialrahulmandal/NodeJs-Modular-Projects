// importing the express module
var express = require('express')
// importing the body-parser module to extract the message out of the body
var bodyParser = require('body-parser')
// using app from express library
var app = express()
// using the http from express app
var http = require('http').Server(app)
// importing socket.io
var io = require('socket.io')(http)

// finding the path for static assets
app.use(express.static(__dirname))
// using body parser to extract the necessary info out of posted body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


// dummy json message
var messages = [
    {name: 'Tim', message: 'Hi'},
    {name: 'Jane', message: 'Hello'}
]


// get route to retrieve and send all the available messages into the dummy JSON
app.get('/messages', (req, res) =>{
    res.send(messages)
})

// post route for saving a new message into the dummy JSON
app.post('/messages', (req, res) =>{
    messages.push(req.body)
    res.sendStatus(200)
})

// once the user connected this message is pormpted over the screen
io.on('connection', (socket) => {
    console.log('a user connected')
})

// this will tell Us that on which port the server is running
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
