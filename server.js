var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/assets',express.static(__dirname + '/assets'));

server.listen(3000, function(){
    console.log('Listening on '+server.address().port);
});

app.get('/',function(req, res){
    res.sendFile(__dirname + '/index.html');
});





io.sockets.on('connection', function(socket){
    console.log('Socket connected...');

    socket.on('test',function(){
        console.log('test received');
    });

    socket.on('newPlayer',function(login){
        io.emit('welcome', login);
    });
});