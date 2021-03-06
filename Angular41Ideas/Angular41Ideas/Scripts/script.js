// Code goes here

var app = angular.module("projects", []);

app.controller("projectsCtrl", function ($scope, hexafyService, geolocationSvc, $http, $timeout) {
    $scope.msg = "hello";

    $scope.numbersAdded = false;
    $scope.numbersMultiplied = false;
    $scope.readingInProcess = false;
    
    $scope.locationString = "";
    $scope.timeLeft = "";
    $scope.hover = false;
    

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

    $scope.showTextToRead = function () {
        var arr = $scope.textToRead.split(" ");

        var i = 0, n = arr.length;

        $scope.readingInProcess = true;
        myLoop(arr, i, n);    
    }

    $scope.wordToRead = "";

    $scope.$watch('wordToRead', function () {
        //alert('hey, myVar has changed!');
    });

    $scope.$watch('timeRemaining', function () {
        //alert('hey, myVar has changed!');
    });




    $scope.startTimer = function () {
        $scope.timeRemaining = $scope.countDownTime;
        countDownNumbers();
/*
 * 
 *         //  create a loop function
        $timeout(function () {    //  call a 3s setTimeout when the loop is called
            $scope.timeRemaining;          //  your code here
                                 //  increment the counter
            if ($scope.timeRemaining > 0) {            //  if the counter < 10, call the loop function
                $scope.startTimer();             //  ..  again which will trigger another 
            }                        //  ..  setTimeout()
            else {
                alert("Timer finished!");
            }
        }, 1000)
 */
    }

    function countDownNumbers() {
        $timeout(function () {    //  call a 3s setTimeout when the loop is called
            --$scope.timeRemaining;          //  your code here
            //  increment the counter
            if ($scope.timeRemaining > 0) {            //  if the counter < 10, call the loop function
                countDownNumbers();             //  ..  again which will trigger another 
            }                        //  ..  setTimeout()
            else {
                alert("Timer finished!");
            }
        }, 1000)
    }

    function myLoop(arr, i, n) {           //  create a loop function
        $timeout(function () {    //  call a 3s setTimeout when the loop is called
            $scope.wordToRead = arr[i];          //  your code here
            i++;                     //  increment the counter
            if (i < n) {            //  if the counter < 10, call the loop function
                myLoop(arr, i, n);             //  ..  again which will trigger another 
            }                        //  ..  setTimeout()
            else {
                $scope.readingInProcess = false;
            }
        }, 1000)
    }                  //  start the loop


    $scope.captureUserLocation = function () {

        geolocationSvc.getCurrentPosition().then(onUserLocationFound);
        var location = geolocationSvc.getCurrentPosition();

    }();

    $scope.captureCoordinate = function ($event) {
        $scope.x = $event.x;
        $scope.y = $event.y;
    }

    $scope.hex = hexafyService.myFunc(255);
})