(function($) {
    "use strict";
    angular.module("pacmen.Page").controller('PageCtrl', PageCtrl);

    function PageCtrl($rootScope, $scope, $state, $location, $timeout, socketIO) {
        var pageC = this;
        $rootScope.player = {};
        pageC.countPlayer = 0;
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if ($state.current.url == "/") {
                $('.back-home-btn').hide();
            } else {
                $('.back-home-btn').show();
            }
            if ($state.current.url == "/play") {
                $('.back-home-btn').hide();
                $('.quit-game-btn').show();
            } else {
                $('.quit-game-btn').hide();
            }
        });
        socketIO.on('connected', function(data) {
            var player = data.player;
            $rootScope.player.name = data.player.name;
        });
        socketIO.on('count:player', function(data) {
            pageC.countPlayer = data.count;
        });
        /*
         ===============================================
         ============  Jquery chat event  ==============
         ===============================================
         */
        $("nav .chat .chat_tool .chat_submit").on('click', function() {
            var message = $("nav .chat .chat_tool input").val();
            send_message(message);
        });
        $("nav .chat .chat_tool input").on("keypress", function(e) {
            var code = e.keyCode || e.which;
            if (code == 13) {
                var message = $("nav .chat .chat_tool input").val();
                send_message(message);
            }
        });
        $(".chat_btn").on("click", function() {
            $(".chat").toggle();
        });
        /*
         ========================================
         ============  Chat event  ==============
         ========================================
         */
        socketIO.on('connected', function(data) {
            socketIO.emit('chat:newuser', {
                user: data.player.name
            });
        });
        socketIO.on('disconnect', function(data) {
            socketIO.emit('connected', {
                user: data.player.name
            });
        });
        // local event => refresh the chat
        socketIO.on('chat:sendmessage', function(data) {
            message(data.user.name + ": " + data.message);
        });
        socketIO.on('chat:newuser', function(data) {
            message("<b style='color:green'> [JOIN] " + data.user + "</b>");
        });
        socketIO.on('chat:changenickname', function(data) {
            message("<i> A guest is now know as : " + data.name + "</i>");
        });
        socketIO.on('chat:disconnect', function(data) {
            message("<b style='color:red'> [DISCONNECT] " + data.user + "</b>");
        });
        /*
         ==========================================
         ============ Chat functions ==============
         ==========================================
         */
        function message(message) {
            var current = $(".chat .chat_content").html();
            $(".chat .chat_content").html(current + "<p>[" + time() + "] " + message + "</p>");
            $(".chat .chat_content").animate({
                scrollTop: $(".chat .chat_content").height()
            }, 0);
            $("nav .chat .chat_tool input").val("");
        }

        function send_message(message) {
            if (message.length >= 1) {
                socketIO.emit('chat:newmessage', {
                    message: message,
                    user: $rootScope.player
                });
            }
        }

        function time() {
            var currentdate = new Date();
            var datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
            return datetime;
        }
    }
})(jQuery);