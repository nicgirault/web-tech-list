'use strict';
var app;

app = angular.module('webTechList', ['ng', 'ngResource', 'ui.router', 'ui.bootstrap', 'app.templates', 'Parse', 'angulartics', 'angulartics.google.analytics', 'ngTagsInput']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider, ParseProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('technologyList', {
    url: '/technology',
    controller: 'TechnologyListCtrl',
    templateUrl: 'technologyList.html'
  }).state('technology', {
    url: '/technology/:id',
    controller: 'TechnologyCtrl',
    templateUrl: 'technology.html',
    resolve: {
      technology: function(Technology, $stateParams) {
        if (!$stateParams.id) {
          return;
        }
        return Technology.find($stateParams.id);
      }
    }
  });
  $urlRouterProvider.otherwise('/technology');
  return ParseProvider.initialize("OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp");
});

app.run(function($rootScope, $state) {
  return $rootScope.$state = $state;
});

app.controller('TechnologyCtrl', function($scope, technology) {
  $scope.technology = technology;
  return $scope.tags = [
    {
      text: 'just'
    }, {
      text: 'some'
    }, {
      text: 'cool'
    }, {
      text: 'tags'
    }
  ];
});

app.controller('TechnologyListCtrl', function($scope, Technology) {
  $scope.addTechnology = function() {
    $scope.newTechnology.save().then(function(technology) {
      return $scope.fetchTechnologies();
    });
    $scope.newTechnology = new Technology;
    return console.log(new Technology);
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

app.factory('Tag', function(Parse) {
  var Tag;
  return Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag() {
      return Tag.__super__.constructor.apply(this, arguments);
    }

    Tag.configure("Tag", "name");

    return Tag;

  })(Parse.Model);
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
