/* 
 * @Author: Marte
 * @Date:   2016-03-30 10:35:41
 * @Last Modified by:   Marte
 * @Last Modified time: 2016-04-09 22:48:37
 */

(function(angular) {

    var mytodo = angular.module('myTodo');

    mytodo.controller('todoController', [
        '$scope',
        '$location',
        'Storage',

        function($scope, $location, Storage) {

            $scope.randomId = function() {
                return Math.random();
            }

            $scope.input = '';

            $scope.add = function() {
                if (!$scope.input) return;

                Storage.add($scope.input);

                $scope.input = '';
            }

            $scope.todos = Storage.get();

            $scope.editingId = 0;
            $scope.editing = function(current) {
                $scope.editingId = current.id;
            }

            $scope.save = function () {
                Storage.save();
                $scope.editingId = 0;
            }

            $scope.hasCompleted = Storage.hasCompleted;

            $scope.remove = function(current) {
                Storage.remove(current);
            }

            $scope.allCompleted = false;
            $scope.checkAll = function() {
                Storage.checkAll($scope.allCompleted);
            }

            $scope.removeAllCompleted = function () {
                var temp = Storage.removeAllCompleted();
                $scope.todos = temp;
            }

            $scope.filterData = {};

            $scope.location = $location;
            $scope.$watch('location.url()', function(now, old) {
                switch (now) {
                    case '/active':
                        $scope.filterData = { completed: false };
                        break;
                    case '/completed':
                        $scope.filterData = { completed: true };
                        break;
                    default:
                        $scope.filterData = {};
                        break;
                }
            })
        }
    ])
})(angular)
