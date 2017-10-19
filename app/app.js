// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var loginModule = angular.module('loginModule', []);
var reportModule = angular.module('reportModule', []);
var applicationModule = angular.module('applicationModule', []);
var personalModule = angular.module('personalModule', []);
var utilsModule = angular.module('utilsModule', []);
var HmsModule = angular.module('HmsModule', []);

var myApp = angular.module('myApp', [
  'ionic',
  'ngCordova',
  'baseConfig',
  'loginModule',
  'applicationModule',
  'reportModule',
  'personalModule',
  'utilModule',
  'hmsDirectives',
  'utilsModule',
  'serviceModule',
  'HmsModule',
  'menu',
  'ionic-datepicker',
  'Encrypt'
]);

angular.module('myApp')
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }

    });
  });

angular.module('myApp')
  .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
      // Ionic uses AngularUI Router which uses the concept of states
      // Learn more here: https://github.com/angular-ui/ui-router
      // Set up the various states which the app can be in.
      // Each state's controller can be found in controllers.js

      $httpProvider.interceptors.push('httpRequestHeader');//注册过滤器
      $ionicConfigProvider.platform.ios.tabs.style('standard');
      $ionicConfigProvider.platform.ios.tabs.position('bottom');
      $ionicConfigProvider.platform.android.tabs.style('standard');
      $ionicConfigProvider.platform.android.tabs.position('standard');

      $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
      $ionicConfigProvider.platform.android.navBar.alignTitle('center');

      //$ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
      $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

      $ionicConfigProvider.platform.ios.views.transition('ios');
      $ionicConfigProvider.platform.android.views.transition('android');

      $stateProvider
        // setup an abstract state for the tabs directive
        .state('menu', {
          url: '/menu',
          abstract: true,
          templateUrl: 'build/pages/menu/menu.html',
          controller: 'menuController'
        })

        // Each tab has its own nav history stack:

        .state('menu.application', {
          url: '/application/:userId',
          views: {
            'content': {
              templateUrl: 'build/pages/application/application.html',
              controller: 'applicationCtrl'
            }
          }
        })

        .state('menu.report', {
          url: '/report/:userId',
          views: {
            'content': {
              templateUrl: 'build/pages/report/report.html',
              controller: 'reportCtrl'
            }
          }
        })

        .state('menu.search', {
          url: '/search',
          views: {
            'content': {
              templateUrl: 'build/pages/search/search.html',
              controller: 'searchCtrl'
            }
          }
        })

        .state('menu.personal', {
          url: '/personal',
          views: {
            'content': {
              templateUrl: 'build/pages/personal/personal.html',
              controller: 'personalCtrl'
            }
          }
        })

        .state('login', {
          url: '/login',
          templateUrl: 'build/pages/login/login.html',
          controller: 'loginCtrl'
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');

    }]);
