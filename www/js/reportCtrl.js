angular.module('starter', ['ionic', 'firebase'])

.controller('ReportCtrl', function($scope, $firebaseArray){
	$scope.userAuth = false;

	var FBURL = "https://waveshout.firebaseio.com/";
	$scope.reports = $firebaseArray(new Firebase(FBURL + 'reports'));

	$scope.report = {
		'spotId': '',
		'userId': '',
		'waveHeight': '',
		'comment': '',
		'timestamp': ''
	}

	$scope.addReport = function(){
		$scope.reports.$add(
				{
					spotId: $scope.report.spotId,
					userId: $scope.report.userId,
					waveHeight: $scope.report.waveHeight,
					description: $scope.report.comment,
					timestamp: $scope.reeport.timestamp
				}
			);
		console.log($scope.report);
	}

});