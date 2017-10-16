/**
 * Created by qiaoliyang on 17/7/19.
 */
angular.module('loginModule')

  .controller('loginCtrl', [
    '$scope',
    '$state',
    'baseConfig',
    '$ionicLoading',
    '$http',
    'publicMethod',
    '$log',
    'Md5',
    function ($scope,
              $state,
              baseConfig,
              $ionicLoading,
              $http,
              publicMethod,
              $log,
              Md5) {
      $scope.user = {
        userName : '',
        password : ''
      };
      var username = localStorage.getItem("username","");
      var password = localStorage.getItem("password","");
      if(username != ''){
        $scope.user.userName = username;
      }
      if(password != ''){
        $scope.user.password = password;
      }
      $scope.saveUsername = {
        lable: '保存账号',
        selected: true
      };
      $scope.checkbox_savePwd = '';
      $scope.savePassword = function () {
        $scope.checkbox_savePwd = !$scope.checkbox_savePwd;//取反 记住密码框的状态
        console.log("此时密码框的状态为 :", angular.toJson($scope.checkbox_savePwd));
        console.log($scope.checkbox_savePwd);
        return $scope.checkbox_savePwd;
      };

      $scope.loginClick = function () {
        /*console.log('账号:'+$scope.user.userName);
        console.log('密码:'+$scope.user.password);
        console.log('MD5密码:'+Md5.hex_md5($scope.user.password));
        console.log('是否保存:'+$scope.saveUsername.selected);*/
       /* ;*/
        if (isEmpty($scope.user.userName)) {
          $ionicLoading.show({
            template: '账号不为空！',
            duration: 1000
          });
        }else if(isEmpty($scope.user.password)){
          $ionicLoading.show({
            template: '密码不为空！',
            duration: 1000
          });
        }else{

          var password = Md5.hex_md5($scope.user.password);
          var url = baseConfig.basePath + "/hmap/common/zmapp/login";
          var params = '{"username":"' + $scope.user.userName +'","password":"' + password + '"}';
          $http.post(url, params).success(function (result) {
            console.log(result);
            if(result.errorCode == 100){
              if($scope.saveUsername.selected == true && $scope.checkbox_savePwd == true){
                localStorage.setItem("username",$scope.user.userName);
                localStorage.setItem("password",$scope.user.password);

              }else if($scope.saveUsername.selected == true){
                localStorage.setItem("username",$scope.user.userName);

                if(localStorage.getItem("password")){
                  localStorage.removeItem("password")
                }
              }
              $state.go('menu.application',{userId : result.userId});
            }else{
              $ionicLoading.show({
                template: '用户名或密码错误！',
                duration: 1000
              });
            }
          });
        }
      }
    }])
