angular.module('starter', ['ionic','firebase'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('report', {
      url: "/report",
      templateUrl: "../views/report.html",
      controller:"ReportCtrl"
    })
    .state('home', {
      url: "/",
      templateUrl: "../views/status.html",
      controller:"StatusCtrl"
    })

  $urlRouterProvider.otherwise("/");
});
