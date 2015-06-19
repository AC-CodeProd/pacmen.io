var _ = require('underscore')._;

function Game(name, id, owner) {
    this.name = name;
    this.id = id;
    this.owner = owner;
    this.playeringame = [];
    this.players = {
        pacmen: {

        },
        blinky: {
            name: 'AI'
        },
        pinky: {
            name: 'AI'
        },
        inky: {
            name: 'AI'
        },
        clyde: {
            name: 'AI'
        }
    };
    this.playersLimit = 5;
    this.status = "available";
};

Game.prototype.addPlayer = function(player) {
    if (this.status === "available") {
        this.playeringame.push(player.id);

        if (player.person == 'pacmen') {
            this.players.pacmen = {};
            this.players.pacmen.id = player.id;
            this.players.pacmen.name = player.name;
            this.players.pacmen.score = 0;
            this.players.pacmen.highscore = 0;
        } else if (player.person == 'ghost') {
            if (this.players.blinky.name == 'AI') {
                this.players.blinky.id = player.id;
                this.players.blinky.name = player.name;
                this.players.blinky.score = 0;
                this.players.blinky.highscore = 0;
            } else if (this.players.pinky.name == 'AI') {
                this.players.pinky.id = player.id;
                this.players.pinky.name = player.name;
                this.players.pinky.score = 0;
                this.players.pinky.highscore = 0;
            } else if (this.players.inky.name == 'AI') {
                this.players.inky.id = player.id;
                this.players.inky.name = player.name;
                this.players.inky.score = 0;
                this.players.inky.highscore = 0;
            } else if (this.players.clyde.name == 'AI') {
                this.players.clyde.id = player.id;
                this.players.clyde.name = player.name;
                this.players.clyde.score = 0;
                this.players.clyde.highscore = 0;
            }
        }

    }
};

Game.prototype.removePlayer = function(playerID) {
    if (_.contains((this.playeringame), playerID)) {
        var playerIndex = this.playeringame.indexOf(playerID);
        this.playeringame.splice(playerIndex, 1);
    }
    var player = _.findWhere(this.players, {
        'id': playerID
    });

    if (this.players.blinky.id == playerID) {
        this.players.blinky = {};
        this.players.blinky.name = 'AI';
    } else if (this.players.pinky.id == playerID) {
        this.players.pinky = {};
        this.players.pinky.name = 'AI';
    } else if (this.players.inky.id == playerID) {
        this.players.inky = {};
        this.players.inky.name = 'AI';
    } else if (this.players.clyde.id == playerID) {
        this.players.clyde = {};
        this.players.clyde.name = 'AI';
    }
};

Game.prototype.getPlayer = function(playerID) {
    var player = null;
    for (var i = 0; i < this.players.length; i++) {
        if (this.players[i].id == playerID) {
            player = this.players[i];
            break;
        }
    }
    return player;
};

Game.prototype.isAvailable = function() {
    return this.available === "available";
};

module.exports = Game;