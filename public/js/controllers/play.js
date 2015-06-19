(function($) {
    'use strict';
    angular.module('pacmen.Play').controller('PlayCtrl', PlayCtrl);

    function PlayCtrl($rootScope, $scope, $state, socketIO) {
        var playC = this;
        $rootScope.game = {};
        if ($rootScope.player.ingame == null) {
            $state.go('home');
        }
        socketIO.emit('get:game', $rootScope.player.ingame);
        socketIO.on('current:game', function(game) {
            $rootScope.game = game;
        });
        socketIO.on('update:game', function(game) {
            $rootScope.game = game;
        });
        $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            socketIO.emit('leave:game');
        });
    }
})(jQuery);