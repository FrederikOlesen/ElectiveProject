'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/view1/proposals.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $http({
            method: 'GET',
            url: 'http://localhost:9292/firstRound/proposal'

        }).
            success(function (data) {
                var json = angular.toJson(data);
                $scope.students = data;
            }).
            error(function (status) {
                var showInfo = true;
                if (status != 200) {
                    $scope.showInfo = showInfo;
                    $scope.color = "danger";
                    $scope.message = "Could not get any data. Please try reload the page!";
                }
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
                .post("http://localhost:9292/firstRound/subject", json)
                .success(function (data, status) {
                    var showInfo = true;
                    if (status == 200) {
                        $scope.showInfo = showInfo;
                        $scope.color = "success";
                        $scope.message = "Subject added!";
                        $scope.emptyFields = "";
                        $timeout(function () {
                            $scope.showInfo = false;
                        }, 3500);
                    }
                })
                .error(function (data, status, error) {
                    $scope.error = data;
                });
        };
    }]);
