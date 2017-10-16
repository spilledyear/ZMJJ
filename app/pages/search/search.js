/**
 * Created by qiaoliyang on 17/7/19.
 */
angular.module('searchModule')

  .controller('searchCtrl', [
    '$scope',
    '$http',
    'baseConfig',
    function ($scope,
              $http,
              baseConfig) {
      $scope.goback = function () {
        $ionicHistory.goBack();
      };
      $scope.search={};
      $scope.datePickerCallback = function (val) {
        if (!val) {
          console.log('Date not selected');
        } else {
          console.log('Selected date is : ', val);
        }
      };
      $scope.search = {};
      $scope.searchBtn = function () {

        var url = baseConfig.basePath + "/hmap/common/zmapp/login";

        var params = '{"username":"' + $scope.user.userName +'","password":"' + password + '"}';

        $http.post(url, params).success(function (result) {
          console.log(result);

        })
      }

    }])
  .directive('dateFormat', ['$filter',function($filter) {
    var dateFilter = $filter('date');
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        function formatter(value) {
          return dateFilter(value, 'yyyy-MM-dd'); //format
        }

        function parser() {
          return ctrl.$modelValue;
        }

        ctrl.$formatters.push(formatter);
        ctrl.$parsers.unshift(parser);

      }
    };
  }]);

