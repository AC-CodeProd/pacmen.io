var game = require('./game');
var chat = require('./chat');

module.exports = function(io) {
     io.sockets.on('connection', function(socket) {
        game.onInitGame(io,socket);
        chat.onInitChat(io,socket);
    });
};