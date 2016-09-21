angular.module('starter.controllers', [])

  .controller('MapCtrl', function ($scope, $cordovaGeolocation, Placeswiki, LocalPlaces, $ionicListDelegate, PlacesApi) {

    $scope.SearchSubmit = function () {

      cordova.plugins.Keyboard.close();
    }

    $scope.savePlace = function (place) {
      Placeswiki.getPlaceInfo(place.pageid, place.title).then(function (details) {
        place.description = details;
        place.images = [];
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

  .controller('PlacesDetailCtrl', function ($scope, $stateParams, LocalPlaces, $cordovaInAppBrowser, $cordovaImagePicker, $cordovaFileTransfer, $cordovaCamera) {
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

    $scope.pickImage = function () {
      var options = {
        maximumImagesCount: 10,
        width: 800,
        quality: 80
      };

      $cordovaImagePicker.getPictures(options)
        .then(function (results) {
          for (var i = 0; i < results.length; i++) {
            var options = new FileUploadOptions();
            var params = {};
            params.placeid = $scope.place.pageid;
            options.params = params;
            console.log('Image URI: ' + results[i]);
            //$scope.place.images.push(results[i]);
            $cordovaFileTransfer.upload("http://145.93.35.119:8000/api/places/photos/add", results[i], options).then(function (result) {
              console.log(result);
              LocalPlaces.addPhoto($scope.place.pageid, JSON.parse(result.response).url);
            }, function (err) {
              console.log(err);
            }, function (progress) {
              console.log(progress);
            });
          }
        }, function (error) {
          // error getting photos
        });
    }

    $scope.takePicture1 = function () {
      var options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        correctOrientation:true,
      };

      $cordovaCamera.getPicture(options).then(function(imageURI) {
        var options = new FileUploadOptions();
        var params = {};
        params.placeid = $scope.place.pageid;
        options.params = params;

        $cordovaFileTransfer.upload("http://145.93.35.119:8000/api/places/photos/add", imageURI, options).then(function (result) {
          console.log(result);
          LocalPlaces.addPhoto($scope.place.pageid, JSON.parse(result.response).url);
        }, function (err) {
          console.log(err);
        }, function (progress) {
          console.log(progress);
        });
      }, function(err) {
        // error
      });
    }
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
