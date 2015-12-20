angular.module('starter')
.controller('ReportCtrl', function($scope, $firebaseArray, $timeout, $location, $stateParams, $rootScope, MessageService, FB){
  $scope.spotId = $stateParams.spotId;
  $scope.spotName = $stateParams.spotName;
  $scope.report = {};

  $scope.reports = FB.bind('spots/' + $scope.spotId + '/reports');
  $scope.spots = FB.bind('spots');


  $scope.addReport = function(){
    if(!$rootScope.currentUser){
      MessageService.show(MessageService.types.success, 'Please login first!');
    } else {
          $scope.isLoading = true;
    $scope.reports.$add(
        {
          user: $rootScope.currentUser.password.email,
          waveHeight: $scope.report.waveHeight,
          comment: $scope.report.comment,
          wind: $scope.report.wind,
          timestamp: FB.timestamp()
        }
      ).then(function(a){
        $scope.isLoading = false;

        // clear report object
       $scope.report = {};
       $timeout(function(){$location.path('/reports/' + $scope.spotId + '/' + $scope.spotName);}, 1500);

       // Add report success & thanks message
      });

    
    console.log($scope.report);
    }

  }

  

});


