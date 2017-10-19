/**
 * Created by qiaoliyang on 17/7/19.
 */
angular.module('menu',[])
  .controller('menuController',[ '$scope','$state',function($scope, $state) {
    $scope.goMineCenter = function(){
      $state.go('menu.personal')
    }
  }])
