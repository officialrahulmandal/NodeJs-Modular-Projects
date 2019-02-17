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

// using mongoose promise
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
// try case to first check for bad words and then save the message and in case of any error throws an error
    try {
        throw 'error'
        var message = new Message(req.body)

        var savedMessage = await message.save()

        console.log('saved')

        var censored = await Message.findOne({ message: 'badword' })

        if (censored)
            await Message.remove({ _id: censored.id })
        else
            io.emit('message', req.body)

        res.sendStatus(200)
    } catch (error) {
      // catch the error
        res.sendStatus(500)
        return console.error(error)
    } finally {
      // At last this message wiil be prompted on the console
        console.log('message post called')
    }
})



// once the user connected this message is pormpted over the screen
io.on('connection', (socket) => {
    console.log('a user connected')
})

// once our DB is connected we get this messages over the console
mongoose.connect(dbUrl, { useMongoClient: true }, (err) => {
    console.log('mongo db connection', err)
})

// this will tell Us that on which port the server is running
var server = http.listen(3000, () => {
    console.log('server is listening on port', server.address().port)
})
