angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $cordovaGeolocation) {

  $scope.SearchSubmit = function () {
    var posOptions = {timeout: 10000, enableHighAccuracy: true};
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        var latLng = new plugin.google.maps.LatLng(lat,long);
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
        alert(lat + "+" + long);

      }, function(err) {
        // error
        console.log(err);
      });
    cordova.plugins.Keyboard.close();
  }

})

.controller('PlacesCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('PlacesDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
