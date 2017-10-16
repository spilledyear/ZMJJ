/**
 * Created by qiaoliyang on 17/7/19.
 */
angular.module('myInfoModule')

  .controller('myInfoCtrl', [
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


      /*console.log('myInfoCtrl.enter');

       $scope.$on('$ionicView.enter', function (e) {
       console.log('myInfoCtrl.$ionicView.enter');
       });

       $scope.$on('$destroy', function (e) {
       console.log('myInfoCtrl.$destroy');
       });*/
    }]);
