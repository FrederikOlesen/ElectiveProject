'use strict';

angular.module('myAppRename.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: '/view1/students.html',
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
    }]);