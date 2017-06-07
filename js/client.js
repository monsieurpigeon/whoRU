var Client = {};
Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.sendNewPlayer = function(login, callback){
    Client.socket.emit('newPlayer',login);
    Client.socket.on('welcome',function(login){
        Game.login = login;
        callback.start('Game.Lobby');
    });
};

