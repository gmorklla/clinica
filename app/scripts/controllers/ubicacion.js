'use strict';

/**
 * @ngdoc function
 * @name clinicaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clinicaApp
 */
angular.module('clinicaApp')
  .controller('UbicacionCtrl', ['$scope', function ($scope) {

	function initMap(){
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: 19.469075, lng: -99.1208254},
	    zoom: 12
	  });

	  var directionsService = new google.maps.DirectionsService;

	  var directionsDisplay = new google.maps.DirectionsRenderer({
	    draggable: true,
	    map: map
	  });

	  var infoWindow = new google.maps.InfoWindow();

	  var casa = {
	        lat: 19.468483,
	        lng: -99.117743
	  };  

	  // Try HTML5 geolocation.
	  if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var pos = {
	        lat: position.coords.latitude,
	        lng: position.coords.longitude
	      };
	      map.setCenter(pos);

	      ruta(pos, casa);

	    }, function() {
	      handleLocationError(true, infoWindow, map.getCenter());
	    });
	  } else {
	    // Browser doesn't support Geolocation
	    handleLocationError(false, infoWindow, map.getCenter());
	  }

	  function ruta(origen, destino){
	    var origen = new google.maps.LatLng(origen.lat, origen.lng);
	    var destino = new google.maps.LatLng(destino.lat, destino.lng);
	    var request = {
	      origin: origen,
	      destination: destino,
	      travelMode: google.maps.TravelMode.DRIVING
	    };
	    directionsService.route(request, function(response, status) {
	    if (status == google.maps.DirectionsStatus.OK) {
	      directionsDisplay.setDirections(response);
	    }
	    });   
	  }

	  // Create the search box and link it to the UI element.
	  var input = document.getElementById('pac-input');
	  var searchBox = new google.maps.places.SearchBox(input);
	  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	  // Bias the SearchBox results towards current map's viewport.
	  map.addListener('bounds_changed', function() {
	    searchBox.setBounds(map.getBounds());
	  });

	  var markers = [];
	  // [START region_getplaces]
	  // Listen for the event fired when the user selects a prediction and retrieve
	  // more details for that place.
	  searchBox.addListener('places_changed', function() {
	    var places = searchBox.getPlaces();

	    if (places.length == 0) {
	      return;
	    }

	    // Clear out the old markers.
	    markers.forEach(function(marker) {
	      marker.setMap(null);
	    });
	    markers = [];

	    // For each place, get the icon, name and location.
	    var bounds = new google.maps.LatLngBounds();
	    places.forEach(function(place) {
	      var icon = {
	        url: place.icon,
	        size: new google.maps.Size(71, 71),
	        origin: new google.maps.Point(0, 0),
	        anchor: new google.maps.Point(17, 34),
	        scaledSize: new google.maps.Size(5, 5)
	      };

	      // Create a marker for each place.
	      // markers.push(new google.maps.Marker({
	      //   map: map,
	      //   icon: icon,
	      //   title: place.name,
	      //   position: place.geometry.location
	      // }));

	      if (place.geometry.viewport) {
	        // Only geocodes have viewport.
	        bounds.union(place.geometry.viewport);
	      } else {
	        bounds.extend(place.geometry.location);
	      }

	      var newLoc = {
	        lat: place.geometry.location.lat(),
	        lng: place.geometry.location.lng()        
	      }

	      ruta(newLoc, casa);

	    });
	    map.fitBounds(bounds);
	  });
	  // [END region_getplaces]


		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		  infoWindow.setPosition(pos);
		  infoWindow.setContent(browserHasGeolocation ?
		                        'Error: The Geolocation service failed.' :
		                        'Error: Your browser doesn\'t support geolocation.');
		}
	}

	initMap();

  }]);
