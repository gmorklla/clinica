'use strict';

/**
 * @ngdoc overview
 * @name clinicaApp
 * @description
 * # clinicaApp
 *
 * Main module of the application.
 */
angular
  .module('clinicaApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/ubicacion', {
        templateUrl: 'views/ubicacion.html',
        controller: 'UbicacionCtrl',
        controllerAs: 'ubicacion'
      })
      .otherwise({
        redirectTo: '/'
      });
    // uiGmapGoogleMapApiProvider.configure({
    //     key: 'AIzaSyBNNBFJSvhW6EDFFcTydFC7ywgFR3x3DgQ',
    //     v: '3.20',
    //     libraries: 'places'
    // });
  });
