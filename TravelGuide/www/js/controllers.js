angular.module('starter.controllers', [])

  .controller('MapCtrl', function ($scope, $cordovaGeolocation, Placeswiki, LocalPlaces, $ionicListDelegate, PlacesApi) {

    $scope.SearchSubmit = function () {

      cordova.plugins.Keyboard.close();
    }

    $scope.savePlace = function (place) {
      Placeswiki.getPlaceInfo(place.pageid, place.title).then(function(details) {
        place.description = details;
        LocalPlaces.add(place);
        PlacesApi.addPlace(place);
        $ionicListDelegate.closeOptionButtons();
      });
    }

    ionic.Platform.ready(function () {
      var posOptions = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation
        .getCurrentPosition(posOptions)
        .then(function (position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          Placeswiki.getPlaces(lat, lon).then(function (places) {
            $scope.nearby = places;
            var div = document.getElementById("map_canvas");
            var map = plugin.google.maps.Map.getMap(div);
            var latLng = new plugin.google.maps.LatLng(lat, lon);
            map.addEventListener(plugin.google.maps.event.MAP_READY, function () {

              map.addMarker({
                'position': latLng,
                'title': "Current location"
              }, function (marker) {

                marker.showInfoWindow();

              });
              map.moveCamera({
                'target': latLng,
                'zoom': 17,
                'tilt': 30
              });

              for (var i = 0; i < places.length; i++) {
                var latLng2 = new plugin.google.maps.LatLng(places[i].lat, places[i].lon);
                map.addMarker({
                  'position': latLng2,
                  'title': places[i].title
                });
              }
            });
          }, function (err) {
            $scope.nearbyerror = true;
          });
        }, function (err) {
          // error
          console.log(err);
        });
    })

  })

  .controller('PlacesCtrl', function ($scope, LocalPlaces) {

    $scope.places = LocalPlaces.all();


    $scope.remove = function (place) {
      LocalPlaces.remove(place);
    };

  })

  .controller('PlacesDetailCtrl', function ($scope, $stateParams, LocalPlaces, $cordovaInAppBrowser) {
    $scope.openURL = function (url) {
      var options = {
        location: 'no',
        clearcache: 'yes',
        presentationstyle: 'formsheet',
        closebuttoncaption: 'Close'
      };

      document.addEventListener("deviceready", function () {
        $cordovaInAppBrowser.open(url, '_blank', options)
          .then(function (event) {
            // success
          })
          .catch(function (event) {
            Console.log(event);
          });

      }, false);
    }
    $scope.place = LocalPlaces.get($stateParams.placeId);
  })

  .controller('SettingsCtrl', function ($scope, LocalPlaces, $cordovaDialogs) {
    $scope.syncPlaces = function () {

    }

    $scope.emptyLocalPlaces = function () {
      $cordovaDialogs.confirm('Are you sure you want to delete all your saved places?', 'Delete My Places', ['Ok', 'Cancel'])
        .then(function (buttonIndex) {
          if (buttonIndex == 1) {
            LocalPlaces.empty();
          }
        });
    }
  });
