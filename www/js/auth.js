// Auth service
angular.module('starter')
.factory('Auth', function($rootScope, $firebaseAuth){
  var FBURL = "https://waveshout.firebaseio.com/";
  var fb = new Firebase(FBURL);
  var auth = $firebaseAuth(fb);
  
  
  var service = {
    register: function (user) {
      return auth.$createUser(user);
    },
    login: function(user) {
      return auth.$authWithPassword(user);
    },
    logout: function(){
      return auth.$unAuth();
    },
    auth: function(){
      return auth;
    }
  }
  
  return service;
  
});