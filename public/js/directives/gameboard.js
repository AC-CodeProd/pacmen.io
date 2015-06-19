(function($) {
    'use strict';
    angular.module('pacmen.gameboard').directive('gameboard', GameBoard);

    function GameBoard($rootScope, socketIO) {
        var game = null;

        function link(scope, element, attrs) {
            var gameboardElement = element[0];
            var ctx = null;
            var canvasBoard = document.querySelector('#canvas-board');
            var canvasBubbles = document.querySelector('#canvas-bubbles');
            var canvasPacmen = document.querySelector('#canvas-pacmen');
            var canvasBlinky = document.querySelector('#canvas-ghost-blinky');
            var canvasPinky = document.querySelector('#canvas-ghost-pinky');
            var canvasInky = document.querySelector('#canvas-ghost-inky');
            var canvasClyde = document.querySelector('#canvas-ghost-clyde');
            canvasBoard.setAttribute('width', '550');
            canvasBoard.setAttribute('height', '550');
            canvasBubbles.setAttribute('width', '550');
            canvasBubbles.setAttribute('height', '550');
            canvasPacmen.setAttribute('width', '550');
            canvasPacmen.setAttribute('height', '550');
            canvasBlinky.setAttribute('width', '550');
            canvasBlinky.setAttribute('height', '550');
            canvasPinky.setAttribute('width', '550');
            canvasPinky.setAttribute('height', '550');
            canvasInky.setAttribute('width', '550');
            canvasInky.setAttribute('height', '550');
            canvasClyde.setAttribute('width', '550');
            canvasClyde.setAttribute('height', '550');
            var ctxBoard = canvasBoard.getContext('2d');
            var ctxBubbles = canvasBubbles.getContext('2d');
            var ctxPacmen = canvasPacmen.getContext('2d');
            var ctxBlinky = canvasBlinky.getContext('2d');
            var ctxPinky = canvasPinky.getContext('2d');
            var ctxInky = canvasInky.getContext('2d');
            var ctxClyde = canvasClyde.getContext('2d');
            game = new Game(ctxBoard, ctxBubbles, ctxPacmen, ctxBlinky, ctxPinky, ctxInky, ctxClyde);
            game.onInitGame();
            var canvasBlinky = document.querySelector('#canvas-blinky');
            canvasBlinky.setAttribute('width', '50');
            canvasBlinky.setAttribute('height', '50');
            if (canvasBlinky.getContext) {
                ctx = canvasBlinky.getContext('2d');
                ctx.fillStyle = '#ed1b24';
                game.onDrawHelperGhost(ctx, 25, 25, 1, 0, 0, 0);
            }
            var canvasPinky = document.querySelector('#canvas-pinky');
            canvasPinky.setAttribute('width', '50');
            canvasPinky.setAttribute('height', '50');
            if (canvasPinky.getContext) {
                ctx = canvasPinky.getContext('2d');
                ctx.fillStyle = '#feaec9';
                game.onDrawHelperGhost(ctx, 25, 25, 1, 0, 0, 0);
            }
            var canvasInky = document.querySelector('#canvas-inky');
            canvasInky.setAttribute('width', '50');
            canvasInky.setAttribute('height', '50');
            if (canvasInky.getContext) {
                ctx = canvasInky.getContext('2d');
                ctx.fillStyle = '#4adecb';
                game.onDrawHelperGhost(ctx, 25, 25, 1, 0, 0, 0);
            }
            var canvasClyde = document.querySelector('#canvas-clyde');
            canvasClyde.setAttribute('width', '50');
            canvasClyde.setAttribute('height', '50');
            if (canvasClyde.getContext) {
                ctx = canvasClyde.getContext('2d');
                ctx.fillStyle = '#f99c00';
                game.onDrawHelperGhost(ctx, 25, 25, 1, 0, 0, 0);
            }
            var html = document.querySelector('html');
            if (html.addEventListener) {
                html.addEventListener("keydown", onKeyDown, true);
                html.addEventListener("keypress", onKeyPress, true);
            } else if (html.attachEvent) {
                html.attachEvent("keydown", onKeyDown);
                html.attachEvent("keypress", onKeyPress);
            }
            if ($rootScope.player.person == 'ghost') {
                socketIO.emit('gameboard:pacmen:getposition');
            }
            game.addListener('onKillPacmenEvent', function() {
                socketIO.emit('gameboard:pacmen:kill');
            });
            game.addListener('onScoreEvent', function() {
                socketIO.emit('gameboard:pacmen:score', game.getScorePacmen());
            });
            game.addListener('onHighScoreEvent', function() {
                socketIO.emit('gameboard:pacmen:highscore', game.getHighScorePacmen());
            });
        }
        socketIO.on('gameboard:pacmen:killing', function(position) {
            game.onKillPacmen();
        });

        function onKeyDown(event) {
            var code = event.keyCode;
            if ($rootScope.player.person == 'pacmen') {
                socketIO.emit('gameboard:pacmen:keydown', code);
            } else {
                socketIO.emit('gameboard:ghost:keydown', code);
            }
        }

        function onKeyPress(event) {
            var code = event.keyCode;
            if (code == 37 || code == 38 || code == 39 || code == 40) {
                event.preventDefault();
            }
            if ($rootScope.player.person == 'pacmen') {
                socketIO.emit('gameboard:pacmen:keypress', code);
            } else {
                socketIO.emit('gameboard:ghost:keypress', code);
            }
        }
        socketIO.on('gameboard:pacmen:keydown', function(code) {
            if (code === 39) {
                game.onMovePacmen(1);
            } else if (code === 40) {
                game.onMovePacmen(2);
            } else if (code === 37) {
                game.onMovePacmen(3);
            } else if (code === 38) {
                game.onMovePacmen(4);
            }
        });
        socketIO.on('gameboard:pacmen:getposition', function(position) {
            if ($rootScope.player.person == 'pacmen') {
                socketIO.emit('gameboard:pacmen:setposition', game.onGetPostionPacmen());
            }
        });
        socketIO.on('gameboard:pacmen:setposition', function(position) {
            if ($rootScope.player.person == 'ghost') {
                game.onSetPostionPacmen(position);
            }
        });
        socketIO.on('gameboard:pacmen:score', function(score) {
            $rootScope.game.players.pacmen.score = score;
        });
        socketIO.on('gameboard:pacmen:highscore', function(highscore) {
            $rootScope.game.players.pacmen.highscore = highscore;
        });
        socketIO.on('gameboard:keypress', function(code) {});
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;
    }
})(jQuery);