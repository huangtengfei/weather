angular.module('myApp.controllers', [])

    .controller('MainController', ['$scope', '$timeout', 'Weather', 'UserService',
        function ($scope, $timeout, Weather, UserService) {

            $scope.date = {};
            $scope.weather = {};
            $scope.user = UserService.user;

            var updateTime = function () {
                $scope.date.raw = new Date();
                $timeout(updateTime, 1000);
            }

            updateTime();

            Weather.getWeatherForecast($scope.user.location).then(function (data) {
                $scope.weather.forecast = data;
            });

        }])

    .controller('SettingsController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
        $scope.user = UserService.user;
        $scope.save = function () {
            UserService.save();
            $location.path('/');
        }
    }])
