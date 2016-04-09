/* 
* @Author: Marte
* @Date:   2016-03-30 10:36:11
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-30 14:53:24
*/

(function (angular) {
    var mytodo = angular.module('myTodo');
    mytodo.service('Storage', ['$window', function ($window) {
        function getId() {
            return Math.random();
        }

        var storage = $window.localStorage;

        var todos = JSON.parse(storage.getItem('my_todos') || '[]');

        this.save = function () {
            storage.setItem('my_todos', JSON.stringify(todos));
        }

        this.get = function () {
            return todos;
        }

        this.add = function (input) {
            todos.push({
                id: getId(), text: input, completed: false 
            })
            this.save();
        }

        this.hasCompleted = function() {
            return todos.some(todo => todo.completed);
        }

        this.remove = function (current) {
            todos.splice(todos.indexOf(current), 1);
        }

        this.checkAll = function (allCompleted) {
            todos.forEach(todo => {
                todo.completed = allCompleted;
            })
        }

        this.removeAllCompleted = function () {
            var unCompleted = [];
            todos.forEach(todo => {
                if (!todo.completed) {
                    unCompleted.push(todo)
                }
            });
            todos = unCompleted;
            return todos;
        }
    }])
})(angular)
