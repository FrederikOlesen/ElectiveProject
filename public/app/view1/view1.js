'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/view1/proposals.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', function ($scope, $http) {
        $http({
            method: 'GET',
            url: 'http://localhost:8080/data'

        }).
            success(function (data) {
                var json = angular.toJson(data);
                console.log("Data: " + data);
                $scope.students = data;
            }).
            error(function (data) {
                $scope.error = data;
            });
        $scope.open = function (item) {

            if ($scope.isOpen(item)) {
                $scope.opened = undefined;
            } else {
                $scope.opened = item;
            }
        };
        $scope.isOpen = function (item) {
            return $scope.opened === item;
        };
        $scope.anyItemOpen = function () {
            return $scope.opened !== undefined;
        };
        $scope.addToFirstRound = function (title, description, teacher) {
            var data = {
                "title": title,
                "description": description,
                "teacher": teacher
            };
            var json = angular.toJson(data)
            console.log(json);
            $http
                .post("http://localhost:8080/addRoundOne/", json)
                .success(function (data, status) {
                })
                .error(function (data, status, error) {
                    $scope.error = data;
                });
        };
    }]);
