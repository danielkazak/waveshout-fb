angular.module('starter', ['ionic', 'firebase'])

.controller('StatusCtrl', function($scope, $firebaseArray){
	$scope.userAuth = false;

	var FBURL = "https://waveshout.firebaseio.com/";
	$scope.reports = $firebaseArray(new Firebase(FBURL + 'reports'));

});