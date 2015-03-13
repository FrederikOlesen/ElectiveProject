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
                var map = {};
                for(var i = 0; i < data.length; i++){
                    map = map[data[i].title] = data[i].priority
                    console.log("Map: " + map)
                }

                console.log("Data: " + map)

                $scope.result = data[6].priority
                $scope.subjects = data[0].title

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
