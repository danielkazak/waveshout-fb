// Reports per spot Controller
angular.module('starter')
.controller('ReportsCtrl', function($scope, $firebaseArray, $stateParams, $ionicNavBarDelegate, FB){

  //var FBURL = "https://waveshout.firebaseio.com/";
  $scope.spotId = $stateParams.spotId;
  $scope.spotName = $stateParams.spotName;
  
  $ionicNavBarDelegate.title('Reports:' + $scope.spotName);

  //$scope.reports = $firebaseArray(new Firebase(FBURL + 'spots/' + $scope.spotId + '/reports'));
  $scope.reports = FB.bind('spots/' + $scope.spotId + '/reports');
  console.log($scope.reports);
});