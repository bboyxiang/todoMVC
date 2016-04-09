/* 
* @Author: Marte
* @Date:   2016-03-30 10:36:46
* @Last Modified by:   Marte
* @Last Modified time: 2016-03-30 11:03:19
*/

(function (angular) {
    var mytodo = angular.module('myTodo');
    mytodo.directive('autoFocus', [function () {
        return {
            link: function (scope, element, attribute) {
                element.on('dblclick', function () {
                    angular.element(this).find('input')[1].focus();
                })
            }
        }
    }])
})(angular)