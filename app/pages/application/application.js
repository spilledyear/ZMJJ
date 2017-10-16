/**
 * Created by qiaoliyang on 17/7/19
 */
angular.module('applicationModule')

  .controller('applicationCtrl', [
    '$scope',
    '$state',
    '$timeout',
    'publicMethod',
    '$stateParams',
    function ($scope,
              $state,
              $timeout,
              publicMethod,
              $stateParams) {
      console.log( $stateParams.userId);
      $scope.goDailywork = function () {
        $state.go('menu.dailywork',{userId:$stateParams.userId},{reload: true});
      }

    }]);
