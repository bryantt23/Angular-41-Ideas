// Code goes here

var app = angular.module("projects", []);

app.controller("projectsCtrl", function ($scope, hexafy, geolocationSvc, $http) {
    $scope.msg = "hello";

    $scope.numbersAdded = false;
    $scope.numbersMultiplied = false;

    $scope.locationString = "";

    $scope.addNumbers = function () {
        $scope.numbersAdded = true;
        $scope.numbersMultiplied = false;
    }

    $scope.multiplyNumbers = function () {
        $scope.numbersAdded = false;
        $scope.numbersMultiplied = true;
    }

    function onUserLocationFound(position) {
        var lat = position["coords"]["latitude"];
        var long = position["coords"]["longitude"];
        $scope.locationString = "Your latitude is: " + lat + " and your longitude is: " + long;
        $scope.getWeather(long, lat);
    }

    $scope.getWeather = function (long, lat) {
        var urlString = "https://fcc-weather-api.glitch.me/api/current?lon=" + long + "&lat=" + lat;
        $http({
            method: 'get',
            url: urlString
        }).then(function (response) {
            $scope.weatherInfo = response;
        });
    }



    $scope.captureUserLocation = function () {

        geolocationSvc.getCurrentPosition().then(onUserLocationFound);
        var location = geolocationSvc.getCurrentPosition();

    }();

    $scope.hex = hexafy.myFunc(255);
})


app.filter('celsiusToFarenheit', function () {
    return function (x) {
        return x * 9 / 5 + 32 + " degrees Farenheit";
    };
});

app.service('hexafy', function () {
    this.myFunc = function (x) {
        return x.toString(16);
    }
});

app.service('geolocationSvc', ['$q', '$window', function ($q, $window) {

    'use strict';
    function hi() {
        alert("hii");
    }

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }
    return {
        hi: hi,
        getCurrentPosition: getCurrentPosition
    };
}]);