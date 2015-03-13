'use strict';

/**
 * @ngdoc overview
 * @name tabularDataTestApp
 * @description
 * # tabularDataTestApp
 *
 * Main module of the application.
 */
angular
  .module('tabularDataTestApp', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMessages', 
    'ngAnimate',
    'ui.bootstrap',
    'simple-table'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
