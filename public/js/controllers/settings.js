(function($) {
    'use strict';
    angular.module('pacmen.Settings').controller('SettingsCtrl', SettingsCtrl);

    function SettingsCtrl($rootScope, $scope, $state, socketIO) {
        var settingsC = this;
        $("#main .nickname-choose input").on("keypress", function(e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
                settingsC.onConfirmNickname();
            }
        });
        settingsC.onConfirmNickname = function() {
            if (angular.isUndefined(settingsC.nickname) || 0 === settingsC.nickname.length) return;
            socketIO.emit('change:nickname', settingsC.nickname);
        };
        socketIO.on('changed:nickname', function(player) {
            if (player != null) {
                $rootScope.player = player;
                $state.go("home");
            }
        });
    }
})(jQuery);