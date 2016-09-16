angular.module('starter.services', [])

  .factory('LocalPlaces', function ($localStorage) {

    $localStorage = $localStorage.$default({
      localPlaces: []
    });

    var _getAll = function () {
      return $localStorage.localPlaces;
    };
    var _add = function (place) {
      _getAll().push(place);
    }
    var _remove = function (place) {
      _getAll().splice($localStorage.localPlaces.indexOf(place), 1);
    }
    var _empty = function () {
      $localStorage.localPlaces = [];
    }
    var _get = function (placeId) {
      for (var i = 0; i < _getAll().length; i++) {
        if (_getAll()[i].pageid === parseInt(placeId)) {
          return _getAll()[i];
        }
      }
      return null;
    }
    return {
      all: _getAll,
      add: _add,
      remove: _remove,
      empty: _empty,
      get: _get
    };
  })


  .service('Placeswiki', function ($http) {
    // Might use a resource here that returns a JSON array

    this.getPlaceInfo = function(pageId, title) {
      return $http.get('https://nl.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + title).then(function (response) {
        return response.data.query.pages[pageId].extract;
      });
    };

    this.getPlaces = function (lat, lon) {
      return $http.get('https://nl.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + lat + '|' + lon + '&format=json&gslimit=20&gsprop=type|country&gsprimary=all').then(function (response) {
        return response.data.query.geosearch;
      });
    }
  })

  .service('PlacesApi', function ($http) {
    var url = 'http://145.93.32.208:8000/api/places/add';
    var config = {
      headers : {
        'Content-Type': 'application/json'
      }
    };

    this.addPlace = function (place) {
      $http.post(url, place, config)
        .then(
          function(response){
            console.log("add placed api: " +response.data.status);
          },
          function(response){
            console.error("add placed api: " +response.data.error);
          }
        );
    }
  });
