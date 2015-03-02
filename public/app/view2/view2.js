'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: '/view2/addsubject.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {
        $scope.saveSubject = function () {
            var data = {
                title: $scope.subjecttitle,
                description: $scope.description,
                teachers: $scope.teacher
            }

            var json = angular.toJson(data);

            console.log("JSON : " + json);

            $http.post('http://localhost:8080/data/', json)
               .success(function (data) {
                    console.log("Data: " + data);
                    $scope.students = data;
                }).
                error(function (data) {
                    $scope.error = data;
                });
        }
    }]);