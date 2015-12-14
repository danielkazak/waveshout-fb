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
  .state('Map', {
    url: '/map',
    templateUrl: 'views/map.html',
    controller: 'MapCtrl'
  })
});



app.controller('StatusCtrl', function($scope, $firebaseArray, $ionicLoading, $stateParams, $compile){
  $scope.userAuth = false;
  $scope.isLoading = false;

  var FBURL = "https://waveshout.firebaseio.com/";
  
  $scope.spots = $firebaseArray(new Firebase(FBURL + 'spots'));

         

});

app.controller('ReportsCtrl', function($scope, $firebaseArray, $stateParams){
  $scope.userAuth = false;

  var FBURL = "https://waveshout.firebaseio.com/";
  $scope.spotId = $stateParams.spotId;
  $scope.spotName = $stateParams.spotName;

  $scope.reports = $firebaseArray(new Firebase(FBURL + 'spots/' + $scope.spotId + '/reports'));
  console.log(FBURL + 'spots/' + $scope.spotId + 'reports');
  console.log($scope.reports);
});



app.controller('MapCtrl', function($scope, $firebaseArray, $stateParams, $compile, $ionicLoading){
  console.log('mapctrl');
  google.maps.event.addDomListener(window, 'load', function() {
        console.log('fire');
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
    });
});




app.controller('ReportCtrl', function($scope, $firebaseArray, $stateParams){
  $scope.userAuth = false;

  var FBURL = "https://waveshout.firebaseio.com/";
  $scope.spotId = $stateParams.spotId;
  $scope.spotName = $stateParams.spotName;

  $scope.reports = $firebaseArray(new Firebase(FBURL + 'spots/' + $scope.spotId + '/reports'));
  $scope.spots = $firebaseArray(new Firebase(FBURL + 'spots'));

  $scope.report = {
    'user': 'kazak',
    'waveHeight': '',
    'comment': '',
    'wind': '',
    'timestamp':  ''
  }


  $scope.addReport = function(){
    $scope.isLoading = true;
    $scope.reports.$add(
        {
          user: $scope.report.user,
          waveHeight: $scope.report.waveHeight,
          comment: $scope.report.comment,
          wind: $scope.report.wind,
          timestamp: timeStamp()
        }
      ).then(function(a){
        $scope.isLoading = false;

        // clear report object
       
      });

    
    console.log($scope.report);
  }

  function timeStamp() {
    // Create a date object with the current time
      var now = new Date();

    // Create an array with the current month, day and time
      var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];

    // Create an array with the current hour, minute and second
      var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];

    // Determine AM or PM suffix based on the hour
      var suffix = ( time[0] < 12 ) ? "AM" : "PM";

    // Convert hour from military time
      time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;

    // If hour is 0, set it to 12
      time[0] = time[0] || 12;

    // If seconds and minutes are less than 10, add a zero
      for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
          time[i] = "0" + time[i];
        }
      }

    // Return the formatted string
      return date.join("/") + " " + time.join(":") + " " + suffix;
    }

});
