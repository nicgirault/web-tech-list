'use strict';
var app;

app = angular.module('webTechList', ['ng', 'ngResource', 'ui.router', 'ui.bootstrap', 'app.templates', 'Parse', 'angulartics', 'angulartics.google.analytics']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider, ParseProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('technology', {
    url: '/:locale',
    controller: 'TechnologyCtrl',
    templateUrl: 'technology.html'
  });
  $urlRouterProvider.otherwise('/fr');
  return ParseProvider.initialize("OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp");
});

app.run(function($rootScope, $state) {
  return $rootScope.$state = $state;
});

app.controller('TechnologyCtrl', function($scope, Technology) {
  $scope.addTechnology = function() {
    $scope.newTechnology.save().then(function(technology) {
      return $scope.fetchTechnologies();
    });
    return $scope.newTechnology = new Technology;
  };
  $scope.removeTechnology = function(technology) {
    return technology.destroy().then(function() {
      return _.remove($scope.technologies, function(technology) {
        return technology.objectId === null;
      });
    });
  };
  $scope.editingTechnology = function(technology) {
    return technology.editing = true;
  };
  $scope.editTechnology = function(technology) {
    technology.save();
    return technology.editing = false;
  };
  $scope.cancelEditing = function(technology) {
    technology.title = technology._cache.title;
    return technology.editing = false;
  };
  $scope.fetchTechnologies = function() {
    return Technology.query().then(function(technologies) {
      return $scope.technologies = technologies;
    });
  };
  $scope.fetchTechnologies();
  return $scope.newTechnology = new Technology;
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

app.factory('Technology', function(Parse) {
  var Technology;
  return Technology = (function(_super) {
    __extends(Technology, _super);

    function Technology() {
      return Technology.__super__.constructor.apply(this, arguments);
    }

    Technology.configure("Technology", "title");

    return Technology;

  })(Parse.Model);
});
