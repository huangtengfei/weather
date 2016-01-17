angular.module('myApp', ['ngRoute','myApp.controllers', 'myApp.services'])

.config(function(WeatherProvider){
        WeatherProvider.setApiKey('91be903d21afbf7a');
    })

.config(function($routeProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'MainController'
            })
            .when('/settings', {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsController'
            })
            .otherwise({redirectTo: '/'})
    })
