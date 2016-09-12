angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation, Placeswiki, LocalPlaces, $ionicListDelegate) {

  $scope.SearchSubmit = function () {

    cordova.plugins.Keyboard.close();
  }

  $scope.savePlace = function (place) {
    LocalPlaces.add(place);
    $ionicListDelegate.closeOptionButtons();
  }

  ionic.Platform.ready(function(){
  var posOptions = {timeout: 10000, enableHighAccuracy: true};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var lon = position.coords.longitude;
      Placeswiki.getPlaces(lat,lon).then(function (places) {
        $scope.nearby = places;
      }, function (err) {
        $scope.nearbyerror = true;
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
  })

})

.controller('PlacesCtrl', function($scope, LocalPlaces) {

 $scope.places = LocalPlaces.all();



  $scope.remove = function(place) {
    LocalPlaces.remove(place);
  };

})

.controller('PlacesDetailCtrl', function($scope, $stateParams, LocalPlaces, $cordovaInAppBrowser) {
  $scope.openURL = function(url) {
    var options = {
      location: 'no',
      clearcache: 'yes',
      presentationstyle: 'formsheet',
      closebuttoncaption: 'Close',
      toolbarposition: 'top'
    };

    document.addEventListener("deviceready", function () {
      $cordovaInAppBrowser.open(url, '_blank', options)
        .then(function(event) {
          // success
        })
        .catch(function(event) {
          Console.log(event);
        });

    }, false);
  }
  $scope.place = LocalPlaces.get($stateParams.placeId);
})

.controller('SettingsCtrl', function($scope, LocalPlaces, $cordovaDialogs) {
 $scope.syncPlaces = function () {

 }

  $scope.emptyLocalPlaces = function () {
    $cordovaDialogs.confirm('Are you sure you want to delete all your saved places?', 'Delete My Places', ['Ok','Cancel'])
      .then(function(buttonIndex) {
        if (buttonIndex == 1){
          LocalPlaces.empty();
        }
      });
  }
});
