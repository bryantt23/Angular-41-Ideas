// Code goes here

var app = angular.module("projects", []);

app.controller("projectsCtrl", function ($scope) {
    $scope.msg = "hello";

    $scope.numbersAdded = false;
    $scope.numbersMultiplied = false;

    $scope.addNumbers = function () {
        $scope.numbersAdded = true;
        $scope.numbersMultiplied = false;
    }

    $scope.multiplyNumbers = function () {
        $scope.numbersAdded = false;
        $scope.numbersMultiplied = true;
    }

})