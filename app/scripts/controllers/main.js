'use strict';

/**
 * @ngdoc function
 * @name clinicaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clinicaApp
 */
angular.module('clinicaApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
	$('.carousel').carousel({
		interval: 10000
	});
	function initMap(){
	  var map = new google.maps.Map(document.getElementById('map2'), {
	    center: {lat: 19.469075, lng: -99.1208254},
	    zoom: 12
	  });
	}
	initMap();
}]);
