'use strict';

angular.module('myAppRename.view3', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view3', {
            templateUrl: 'app/view3/view3.html',
            controller: 'View3Ctrl'
        });
    }])

    .controller('View3Ctrl', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/addRoundOne'

        }).success(function (data) {
            console.log("JSON: " + angular.toJson(data));
            $scope.persons = data;

        }).
            error(function (status) {
                var showInfo = true;
                if (status != 200) {
                    $scope.showInfo = showInfo;
                    $scope.color = "danger";
                    $scope.message = "Could not get any data. Please try reload the page!";
                }
            });
    });



