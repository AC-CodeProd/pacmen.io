var players = {};
var games = {};
var sockets = [];

exports.onInitChat = function(io,socket) {
    var players = {};

    /*
    ========================================
    ============== io event ================
    ========================================
    */
    socket.on('chat:newmessage',chat_newmessage);
    socket.on('disconnectchat',chat_disconnect);
    socket.on('chat:newuser', chat_newuser);
    socket.on('change:nickname', chat_changenickname);
    /*
    ========================================
    ============== function ================
    ========================================
    */
    function chat_disconnect(data) {
        io.sockets.emit("chat:disconnect",{
            user : data.user
        });
    }

    function chat_newmessage(data) {
        io.sockets.emit("chat:sendmessage",{
            message: data.message,
            user: data.user
        });
    }

    function chat_newuser(data) {
        io.sockets.emit("chat:newuser",{
            user: data.user
        });
    }

    function chat_changenickname(data) {
        io.sockets.emit("chat:changenickname",{
            name: data
        });
    }
};