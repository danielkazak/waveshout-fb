// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'firebase']);




app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});





// Routing configurations
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/status.html',
    controller: 'StatusCtrl'
  })
  .state('report', {
    url: '/report/:spotId/:spotName',
    templateUrl: 'views/report.html',
    controller: 'ReportCtrl'
  })
  .state('reports', {
    url: '/reports/:spotId/:spotName',
    templateUrl: 'views/spotReports.html',
    controller: 'ReportsCtrl'
  })
  .state('map', {
    url: '/map',
    templateUrl: 'views/map.html',
    controller: 'MapCtrl'
  })
  .state('auth', {
    url: '/auth',
    templateUrl: 'views/auth.html',
    controller: 'AuthCtrl'
  })
});














// Index page controller
app.controller('IndexCtrl', function($scope, $firebaseArray, MessageService, $ionicLoading){
  $scope.isLoading = false;
  $scope.loading = {
    template: '<ion-spinner class="spinner-calm" icon="lines"></ion-spinner>',
    noBackdrop: true
  };
  
  $scope.baba = {'myInput': 'test'}

  $scope.hideMessage = function(){
    MessageService.hide();
  }

         

});




// Status page controller
app.controller('StatusCtrl', function($scope, $firebaseArray, $ionicLoading, $stateParams, $compile, MessageService){
  $scope.isLoading = false;

  var FBURL = "https://waveshout.firebaseio.com/";
  
  $scope.spots = $firebaseArray(new Firebase(FBURL + 'spots'));
  
  $scope.test = function(){
    MessageService.show(MessageService.types.info, 'Testing this sht');
  }
  
  
         

});



















