(function($) {
    'use strict';
    angular
        .module('pacmen.SocketIO')
        .service('socketIO', SocketIO);
    function SocketIO(socketFactory) {
        return socketFactory();
    }
})(jQuery);