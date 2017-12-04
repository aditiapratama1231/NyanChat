var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.get('/', function(req, res){
    res.sendfile(__dirname + '/pages/index.html')
})

app.use('/styles', express.static(__dirname + '/styles'));

io.on('connection', function (socket) {
    io.emit('log', 'user connected')

    socket.on('send-chat', function (data) {
        console.log(data)
        io.emit('get-chat', data)
    });
});

server.listen(8080, function(){
    console.log('Server running in port : 8080')
})