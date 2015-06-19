(function($) {
    'use strict';
    angular.module('pacmen', [
        'ui.router',
        'pacmen.Route',
        'pacmen.Page',
        'pacmen.Home',
        'pacmen.Games',
        'pacmen.Play',
        'pacmen.Settings',
        'pacmen.SocketIO',
        'btford.socket-io',
        'pacmen.gameboard'
    ]);
})(jQuery);