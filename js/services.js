angular.module('myApp.services', [])

    .provider('Weather', function () {
        var apiKey = "";

        this.setApiKey = function (key) {
            if (key) {
                this.apiKey = key;
            }
        };

        this.getUrl = function (type, ext) {
            return "http://api.wunderground.com/api/" +
                this.apiKey + "/" + type + "/q/" + ext + ".json";
        }

        this.$get = function ($q, $http) {
            var self = this;
            return {
                getWeatherForecast: function (city) {
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: self.getUrl('forecast', city),
                        cache: true
                    }).success(function (data) {
                        deferred.resolve(data.forecast.simpleforecast);
                    }).error(function (err) {
                        deferred.reject(err)
                    });
                    return deferred.promise;
                }
            }
        }

    })

    .factory('UserService', function(){
        var defaults = {
            location: 'autoip'
        };

        var service = {
            user: {},
            save: function(){
                sessionStorage.presenty = angular.toJson(service.user);
            },
            restore: function(){
                // 从sessionStorage中拉取配置
                service.user = angular.fromJson(sessionStorage.presenty) || defaults;
                return service.user;
            }
        };
        // 立即调用它，从sessionStorage中恢复配置
        service.restore();
        return service;
    })