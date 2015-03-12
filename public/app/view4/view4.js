'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: '/view4/resultOfFirstRound.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/firstRound/priority'

        }).
            success(function (data) {
                console.log("Data: " + angular.toJson(data));
                $scope.result = data;
            }).
            error(function (status) {
                var showInfo = true;
                if (status != 200) {
                    $scope.showInfo = showInfo;
                    $scope.color = "danger";
                    $scope.message = "Could not get any data. Please try reload the page!";
                }
            });
    }]);
