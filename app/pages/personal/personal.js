/**
 * Created by xaioyong.luo on 17/10/19.
 */
angular.module('personalModule')

  .controller('personalCtrl', [
    '$scope',
    '$state',
    '$ionicHistory',
    function ($scope,
              $state,
              $ionicHistory) {
      $scope.goback = function () {
        $ionicHistory.goBack();
      };
      $scope.logOut = function () {
        $state.go("login",{}, {reload: true});
      };

    }
  ]);
