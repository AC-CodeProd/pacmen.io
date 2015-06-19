var _ = require('underscore')._;
var uuid = require('node-uuid');
var Game = require('../models/game.js');
var players = {};
var games = {};
var sockets = [];
exports.onInitGame = function(io, socket) {

    var name = "Guest-" + (Math.floor(Math.random() * 100000));
    _player = addNewPlayer(socket.id, name, null, null, null);
    players[socket.id] = _player;
    sockets.push(socket);
    totalPlayerOnline = _.size(players);

    io.sockets.emit('count:player', {
        count: totalPlayerOnline
    });
    socket.emit('connected', {
        player: _player
    });
    socket.on('create:game', onCreateGame);
    socket.on('join:game', onJoinGame);
    socket.on('leave:game', onLeaveGame);
    socket.on('delete:game', onDeleteGame);

    socket.on('change:nickname', onConfirmNickname);

    socket.on('get:games', onGetListGame);
    socket.on('get:game', onGetGame);


    socket.on('gameboard:pacmen:keydown', onKeyDownPacmen);
    socket.on('gameboard:pacmen:keypress', onKeyPressPacmen);

    socket.on('gameboard:pacmen:getposition', onGetPositionPacmen);
    socket.on('gameboard:pacmen:setposition', onSetPositionPacmen);

    socket.on('gameboard:pacmen:kill', onKillPacmen);
    socket.on('gameboard:pacmen:score', onScorePacmen);
    socket.on('gameboard:pacmen:highscore', onHighScorePacmen);


    socket.on('disconnect', onDisconnect);

    function onCreateGame(name) {
        var exists = false;
        _.find(games, function(k, v) {
            if (k.name.toLowerCase() === name.toLowerCase())
                return exists = true;
        });
        if (exists) {
            return;
        }
        var uniqueGameID = uuid.v4();
        var game = new Game(name, uniqueGameID, socket.id);
        players[socket.id].person = 'pacmen';
        players[socket.id].owns = uniqueGameID;
        players[socket.id].ingame = uniqueGameID;
        players[socket.id].game = game;
        players[socket.id].roomname = name;
        game.addPlayer(players[socket.id]);
        games[uniqueGameID] = game;
        socket.room = name;
        socket.join(socket.room);
        socket.emit('joined:game', players[socket.id]);
        io.sockets.emit('list:games', games);
    }

    function onJoinGame(id) {
        var gameToJoin = games[id];
        if (gameToJoin.playersLimit != _.size(gameToJoin.playeringame)) {
            socket.room = gameToJoin.name;
            socket.join(socket.room);
            players[socket.id].ingame = id;
            players[socket.id].person = 'ghost';
            players[socket.id].roomname = gameToJoin.name;
            gameToJoin.addPlayer(players[socket.id]);
            socket.emit('joined:game', players[socket.id]);
            io.sockets.emit('list:games', games);
            io.sockets.emit('update:game', gameToJoin);
        }
    }

    function onLeaveGame() {

        if (players[socket.id].ingame) {
            var game = games[players[socket.id].ingame];
            if (socket.id === game.owner) {

                var socketids = [];
                for (var i = 0; i < sockets.length; i++) {
                    socketids.push(sockets[i].id);
                    if (_.contains((socketids), game.playeringame)) {
                        sockets[i].leave(game.name);
                    }
                }
                if (_.contains((game.playeringame), socket.id)) {
                    for (var i = 0; i < game.playeringame.length; i++) {
                        players[game.playeringame[i]].ingame = null;
                        players[game.playeringame[i]].gamename = null;
                    }
                }

                delete games[players[socket.id].owns];

                players[socket.id].person = null;
                players[socket.id].owns = null;
                io.sockets.emit('list:games', games);
            } else {
                if (_.contains((game.playeringame), socket.id)) {

                    game.removePlayer(socket.id);
                    games[players[socket.id].ingame]=game;
                    players[socket.id].person = null;
                    players[socket.id].ingame = null;
                    players[socket.id].gamename = null;
                    socket.leave(game.name);
                    io.sockets.in(socket.room).emit('update:game', game);
                    io.sockets.emit('list:games', games);
                }
            }
        }
    }

    function onDeleteGame(id) {

    }

    function onGetListGame() {
        io.sockets.emit('list:games', games);
    }

    function onGetGame(id) {
        var game = games[id];
        socket.emit('current:game', game);
    }

    function onConfirmNickname(nickname) {
        players[socket.id].name = nickname;
        socket.emit('changed:nickname', players[socket.id]);
    }

    function onKeyDownPacmen(code) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:keydown', code);
    }

    function onKeyPressPacmen(code) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:keypress', code);
    }

    function onGetPositionPacmen(position) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:getposition', position);
    }

    function onSetPositionPacmen(position) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:setposition', position);
    }

    function onKillPacmen() {
        io.sockets.in(socket.room).emit('gameboard:pacmen:killing');
    }
    function onScorePacmen (score) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:score',score);
    }
    function onHighScorePacmen (highscore) {
        io.sockets.in(socket.room).emit('gameboard:pacmen:highscore',highscore);
    }

    function onDisconnect() {
        if (typeof players[socket.id] !== 'undefined')

        if (players[socket.id].ingame) {
            var game = games[players[socket.id].ingame];
            if (socket.id === game.owner) {
                var socketids = [];
                for (var i = 0; i < sockets.length; i++) {
                    socketids.push(sockets[i].id);
                    if (_.contains((socketids)), game.playeringame) {
                        sockets[i].leave(game.name);
                    }
                }
                if (_.contains((game.players)), socket.id) {
                    for (var i = 0; i < game.playeringame.length; i++) {
                        players[game.playeringame[i]].ingame = null;
                        players[game.playeringame[i]].gamename = null;
                    }
                }
                game.playeringame = 0;
                delete games[players[socket.id].owns];
                delete players[socket.id];

               totalPlayerOnline = _.size(players);
                io.sockets.emit('count:player', {
                    count: totalPlayerOnline
                });
                io.sockets.emit('list:games', games);
                var o = _.findWhere(sockets, {
                    'id': socket.id
                });
                sockets = _.without(sockets, o);

                } else {
                if (_.contains((game.playeringame), socket.id)) {
                    var playerIndex = game.playeringame.indexOf(socket.id);
                    game.playeringame.splice(playerIndex, 1);
                    socket.leave(game.name);
                }
                delete players[socket.id];
                totalPlayerOnline = _.size(players);

                io.sockets.emit('count:player', {
                    count: totalPlayerOnline
                });
                io.sockets.emit('list:games', games);
                var o = _.findWhere(sockets, {
                    'id': socket.id
                });
                sockets = _.without(sockets, o);

            }

        } else {
            delete players[socket.id];
            totalPlayerOnline = _.size(players);
            io.sockets.emit('count:player', {
                count: totalPlayerOnline
            });
            io.sockets.emit('list:games', games);
            var o = _.findWhere(sockets, {
                'id': socket.id
            });
            sockets = _.without(sockets, o);
        }
    }

    function addNewPlayer(id, name, person, ingame, owns) {
        return {
            'id': id,
            'name': name,
            'person': person,
            'ingame': ingame,
            'owns': owns
        }
    }
};