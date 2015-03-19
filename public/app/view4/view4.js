'use strict';

angular.module('myAppRename.view4', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view4', {
            templateUrl: '/view4/resultOfFirstRound.html',
            controller: 'View4Ctrl'
        });
    }])

    .controller('View4Ctrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        var alength = 3;
        var blength = 3;
        var list = [];
        $http({
            method: 'GET',
            url: 'http://localhost:9292/firstRound/subject'

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
        $scope.addToFirstPriority = function (title, description, teacher, pri, id) {
            var json = {"priority": pri, "studentId" : id, "title": title, "description": description, "teacher": teacher}


            if (alength > 2) {
                $scope.aaPriority = json;
                list.push(json)
                alength = 1
            }
            else {
                if (alength < 2) {
                    $scope.abPriority = json;
                    alength = 0;
                    list.push(json)
                }
            }
            if (alength == 0) {
                $scope.buttonStateFirst = "btn-lg disabled"
            }
        }
        $scope.addToSecondPriority = function (title, description, teacher, pri, id) {
            var json = {"priority": pri, "studentId" : id, "title": title, "description": description, "teacher": teacher}
            if (blength > 2) {
                $scope.baPriority = json;
                blength = 1
                list.push(json)
            }
            else {
                if (blength < 2) {
                    $scope.bbPriority = json;
                    blength = 0;
                    list.push(json)
                }
            }

            if (blength == 0) {
                $scope.buttonStateSecond = "btn-lg disabled"
            }

        }
        $scope.removeaa = function (element) {
            var remove = list.indexOf(element)
            if (remove > -1) {
                list.splice(remove, 1)
                element;
                $scope.aaPriority = "";
                alength = 3;
                $scope.buttonStateFirst = "btn-lg enabled"
            }
            console.log(angular.toJson(list));
        };
        $scope.removeab = function (element) {
            var remove = list.indexOf(element)
            if (remove > -1) {
                list.splice(remove, 1)
                element;
                $scope.abPriority = "";
                alength = 1;
                $scope.buttonStateFirst = "btn-lg enabled"
            }
            console.log(angular.toJson(list));
        };
        $scope.removeba = function (element) {
            var remove = list.indexOf(element)
            if (remove > -1) {
                list.splice(remove, 1)
                element;
                $scope.baPriority = "";
                blength = 3;
                $scope.buttonStateSecond = "btn-lg enabled"
            }
            console.log(angular.toJson(list));
        };
        $scope.removebb = function (element) {
            var remove = list.indexOf(element)
            if (remove > -1) {
                list.splice(remove, 1)
                element;
                $scope.bbPriority = "";
                blength = 1;
                $scope.buttonStateSecond = "btn-lg enabled"
            }
            console.log(angular.toJson(list));
        };
        $scope.getHappiness = function () {
            var json = {"poolA": [list[0].title, list[1].title],"poolB": [list[2].title, list[3].title],
                "studentID": ["Bjarke Carlsen","Martin Olgenkjær","Henrik Stavnem","Nicklas Thomsen"]}
            $http
                .post("http://localhost:9292/firstRound/happiness", json)
                .success(function (data, status) {
                    $scope.result = data;
                })
                .error(function (data, status, error) {
                    $scope.error = data;
                });
        }
    }]);
