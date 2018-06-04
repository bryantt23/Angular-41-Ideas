// Code goes here

var app = angular.module("projects", []);

app.controller("projectsCtrl", function ($scope, hexafy, geolocationSvc) {
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
        var lat=position["coords"]["latitude"];
        var long=position["coords"]["longitude"];
        $scope.locationString = "Your latitude is: " + lat + " and your longitude is: " + long;
        //alert($scope.locationString);
    }

    $scope.captureUserLocation = function () {
        //geolocationSvc.hi();

        geolocationSvc.getCurrentPosition().then(onUserLocationFound);
        var location = geolocationSvc.getCurrentPosition();

        //console.log((location));

        //var keys = Object.keys(location);
        //console.log(keys);

        //console.log(typeof (location));
        //var keys = Object.keys(location);


        //console.log(location["status"]);

        //console.log(JSON.stringify(location));
        //console.log(location["$$state"]);
        //alert(stringify(geolocationSvc.getCurrentPosition()));
    }

    $scope.hex = hexafy.myFunc(255);
})



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


//angular.module('app', []).factory('geolocationSvc', ['$q', '$window', function ($q, $window) {

//    'use strict';

//    function getCurrentPosition() {
//        var deferred = $q.defer();

//        if (!$window.navigator.geolocation) {
//            deferred.reject('Geolocation not supported.');
//        } else {
//            $window.navigator.geolocation.getCurrentPosition(
//                function (position) {
//                    deferred.resolve(position);
//                },
//                function (err) {
//                    deferred.reject(err);
//                });
//        }

//        return deferred.promise;
//    }

//    return {
//        getCurrentPosition: getCurrentPosition
//    };
//}]);
