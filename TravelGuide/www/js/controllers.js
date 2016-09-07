angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation, Placeswiki) {

  $scope.SearchSubmit = function () {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var lon = position.coords.longitude;
        Placeswiki.getPlaces(lat,lon).then(function (places) {
          $scope.nearby = places;
        });
        var latLng = new plugin.google.maps.LatLng(lat,lon);
        var div = document.getElementById("map_canvas");
        var map = plugin.google.maps.Map.getMap(div);
        map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

          map.addMarker({
            'position': latLng,
            'title': "Current location"
          }, function(marker) {

            marker.showInfoWindow();

          });
          map.moveCamera({
            'target': latLng,
            'zoom': 17,
            'tilt': 30
          });

        });
      }, function(err) {
        // error
        console.log(err);
      });
    cordova.plugins.Keyboard.close();
  }

})

.controller('PlacesCtrl', function($scope, Places) {
  
 $scope.places = Places.all();
  $scope.remove = function(place) {
    Places.remove(place);
  };
  
})

.controller('PlacesDetailCtrl', function($scope, $stateParams, Places) {
  $scope.place = Places.get($stateParams.placeId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
