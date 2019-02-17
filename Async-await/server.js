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
// importing mongoose for making a connection to thhe DB
var mongoose = require('mongoose')

// finding the path for static assets
app.use(express.static(__dirname))
// using body parser to extract the necessary info out of posted body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// using mongoode promise
mongoose.Promise = Promise

// we are using an online mongodb so change this url according to yours
var dbUrl = 'mongodb://user:user@ds155424.mlab.com:55424/learning-node'

// creating a table named message into the DB with two fields in it name and message
var Message = mongoose.model('Message', {
    name: String,
    message: String
})

// get route to retrieve and send all the available messages into the DB
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages)
    })
})

// post route for saving a new message into the DB
app.post('/messages', async (req, res) => {
    // var message that will accept and store the request body
    var message = new Message(req.body)

    // Here we use await because we don't know how much time this save operation is going to take to complete so it will going to wait till the save operation is completed
    var savedMessage = await message.save()

    // once the save operation is completed we receive this save printed over the console
    console.log('saved')

    // now we are serching for the badwords and again we don't the time it takes to complete this process so we are using await here
    var censored = await Message.findOne({ message: 'badword' })

    // if we find a censored message we simply going to remove it from the message Table
    if (censored)
        await Message.remove({ _id: censored.id })
    else
        // if not we are going to emit a message event that will update the messages on the frontend javascript
        io.emit('message', req.body)

    res.sendStatus(200)

        // .catch((err) => {
        //     res.sendStatus(500)
        //     return console.error(err)
        // })

})


// once the user connected this message is pormpted over the screen
io.on('connection', (socket) => {
    console.log('a user connected')
})

/// once our DB is connected we get this messages over the console
mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

// this will tell Us that on which port the server is running
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
