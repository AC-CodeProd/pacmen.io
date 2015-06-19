(function($) {
    "use strict";
    angular
        .module("pacmen.Route")
        .config(RouteConfig);

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider.state('home', {
            url: "/",
            templateUrl: 'partial/home',
            controller: 'HomeCtrl',
            controllerAs: 'homeC'
        }).state('games', {
            url: "/games",
            templateUrl: 'partial/games',
            controller: 'GamesCtrl',
            controllerAs: 'gamesC'
        }).state('play', {
            url: "/play",
            templateUrl: 'partial/play',
            controller: 'PlayCtrl',
            controllerAs: 'playC'
        }).state('settings', {
            url: "/settings",
            templateUrl: 'partial/settings',
            controller: 'SettingsCtrl',
            controllerAs: 'settingsC'
        }).state('credits', {
            url: "/credits",
            templateUrl: 'partial/credits',
            controller: 'GameCtrl',
            controllerAs: 'gameC'
        });

    }
})(jQuery);