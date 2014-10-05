'use strict';

// Declare app level module which depends on filters, and services
angular.module('App', [
  'App.filters',
  'App.services',
  'App.directives',
  'App.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
  /*
  $routeProvider.when('/info', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/tools', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/blog', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  
  $routeProvider.otherwise({redirectTo: '/view1'});
  */
}]);

/* Controllers */

angular.module('App.controllers', [])
  .controller('App', ['$scope', function($scope) {

  }])
  .controller('Nav', ['$scope', function($scope) {

  }])
  .controller('Info', ['$scope', function($scope) {

  }])
  .controller('Tools', [
  '$scope', 
  '$location', 
  'searchObj',
  function($scope, $location, searchObj) {
  }])
  .controller('ToolsEpoch', [
  '$scope', 
  'searchObj',
  function($scope, searchObj) {
    var search = location.search;
    var search = searchObj();
    if(search.epoch){
      $scope.epoch = search.epoch;
    }else{
      $scope.epoch = new Date().getTime();
    }
  }])
  .controller('ToolsJSONLint', [
  '$scope', 
  'searchObj',
  function($scope, searchObj) {
    $scope.$watch('json', function(json){
      if(json){
        try{
          $scope.error = '';
          var obj = JSON.parse(json);
        } catch(e){
          console.log(e);
          $scope.error = e.message;
          obj = null;
        }
        if(obj){
          $scope.prettyJSON = JSON.stringify(obj, undefined, 2);
        }else{
          $scope.prettyJSON = null;
        }
      }
    });
  }])
  .controller('Blog', ['$scope', function($scope) {

  }]);

/* Directives */

angular.module('App.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]);

/* Filters */

angular.module('App.filters', []).
  filter('milliToDateString', function() {
    return function(text) {
      return new Date(parseInt(text)).toString();
    };
  })
  .filter('epochToDateString', function() {
    return function(text) {
      return new Date(Math.floor(parseInt(text) * 1000)).toString();
    };
  });

/* Services */

angular.module('App.services', []).
  factory('searchObj', function(){
    return function(){
      var search = location.search.slice(1);
      if(search == '') return {};
      var pairs = search.split('&');
      var obj = {};
      pairs.forEach(function(pair){
        var keyVal = pair.split('=');
        obj[keyVal[0]] = keyVal[1];
      });
      return obj;
    }
  })
  .factory('epoch_to_date', function(){
    return function(epoch){
      return new Date(epoch);
    }
  });
