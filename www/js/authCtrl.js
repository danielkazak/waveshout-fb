// Authentication page controller
angular.module('starter')
.controller('AuthCtrl', function($scope, $firebaseArray, $location, $timeout, $ionicPopup, $stateParams, MessageService, $rootScope, Auth){
  $scope.isLoading = false;
  $scope.userObject = {
    'email': '',
    'password': '',
  }


  // Create new user on Firebase
  $scope.createUser = function(){
    // VALIDATIONS //
    
    // Show loader
    $scope.isLoading = true;
    
    Auth.register($scope.userObject).then(function(regData){
      console.log(regData);
      MessageService.show(MessageService.success, 'Welcome!');
      $scope.isLoading = false;
     $timeout(function(){$location.path('/');}, 2000);
    }).catch(function(error){
      console.log(error);
      MessageService.show(MessageService.error, error.message);
      $scope.isLoading = false;
    });
    
  };
    
    // User Login
    $scope.userLogin = function(){
      
      // Show loader
      $scope.isLoading = true;
      
      Auth.login($scope.userObject).then(function(authData){
        if(authData){
          $rootScope.currentUser = authData;
        }
        console.log(authData);
        MessageService.show(MessageService.success, "Logged in!");
        $scope.isLoading = false;
        $timeout(function(){$location.path('/');}, 2000);
      }).catch(function(error){
        console.log(error);
        MessageService.show(MessageService.error, error.message);
        $scope.isLoading = false;
      });
      
    }

});
