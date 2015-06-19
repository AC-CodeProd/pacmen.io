(function($) {
    'use strict';
    angular.module('pacmen.Games').controller('GamesCtrl', GamesCtrl);

    function GamesCtrl($rootScope, $scope, $state, socketIO) {
        var gamesC = this;
        gamesC.games = {};
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            socketIO.emit('get:games');
        })
        socketIO.on('list:games', function(games) {
            gamesC.games = games;
        });
        socketIO.on('joined:game', function(player) {
            $rootScope.player = player;
            $state.go("play");
        });
        gamesC.onCreateGame = function() {
            if (angular.isUndefined(gamesC.namegame) || 0 === gamesC.namegame.length) gamesC.namegame = "game-" + Math.floor(Math.random() * 100000);
            socketIO.emit('create:game', gamesC.namegame);
        }
        gamesC.onJoinGame = function(game) {
            socketIO.emit('join:game', game.id);
        }
        gamesC.onLeaveGame = function(game) {
            socketIO.emit('leave:game', game.id);
        }
        gamesC.onDeleteGame = function(game) {
            socketIO.emit('delete:game', game.id)
        }
    }
})(jQuery);