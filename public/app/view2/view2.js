'use strict';

angular.module('myAppRename.view2', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: '/view2/addsubject.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.saveSubject = function (showInfo) {
            var data = {
                title: $scope.subjecttitle,
                description: $scope.description,
                teacher: $scope.teacher
            }

            var json = angular.toJson(data);

            console.log("JSON : " + json);

            $http.post('http://localhost:8080/proposal', json)
                .success(function (data, status) {
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
                .error(function (status) {
                    if (status != 200) {
                        $scope.showInfo = showInfo;
                        $scope.color = "danger";
                        $scope.message = "Something went wrong.. Please try again!";
                    }
                });
        }

    }]);