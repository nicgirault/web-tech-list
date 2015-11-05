'use strict';
var app;

app = angular.module('webTechList', ['ng', 'ngResource', 'ui.router', 'ui.bootstrap', 'app.templates', 'Parse', 'angulartics', 'angulartics.google.analytics', 'ngTagsInput', 'satellizer', 'authentication', 'technology', 'tag']);

app.run(function($rootScope, $state) {
  return $rootScope.$state = $state;
});

app.config(function(ParseProvider) {
  return ParseProvider.initialize("OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp");
});

angular.module('authentication', ['satellizer', 'ui.router']);

angular.module('tag', []);

angular.module('technology', ['tag']);

angular.module('authentication').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'authentication/view/login.html'
  });
  return $urlRouterProvider.otherwise('/');
});

angular.module('authentication').config(function($authProvider) {
  return $authProvider.google({
    clientId: '695884866426-0ntfpjb19n3ptvibncl8fnn92g8f56qr.apps.googleusercontent.com'
  });
});

angular.module('authentication').controller('LoginCtrl', function($scope, $auth) {
  return $scope.authenticate = function(provider) {
    return $auth.authenticate(provider).then(function(response) {
      return console.log(response.data);
    });
  };
});

angular.module('authentication').controller('NavbarCtrl', function($scope, $auth) {
  return $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('tag').factory('Tag', function(Parse) {
  var Tag;
  return Tag = (function(_super) {
    __extends(Tag, _super);

    function Tag() {
      return Tag.__super__.constructor.apply(this, arguments);
    }

    Tag.configure("Tag", "label");

    return Tag;

  })(Parse.Model);
});

angular.module('tag').service('tagManager', function(Tag) {
  var promise, tagList;
  tagList = [];
  promise = Tag.query().then(function(_tags) {
    return tagList = _tags;
  });
  return {
    promise: promise,
    getTagList: function() {
      return tagList;
    },
    find: function(label) {
      return _.find(tagList, {
        label: label
      });
    },
    add: function(label) {
      var tag;
      tag = new Tag({
        label: label
      });
      return tag.save().then(function(_tag) {
        tagList.push(_tag);
        return _tag;
      });
    }
  };
});

angular.module('technology').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('technologyList', {
    url: '/technology',
    controller: 'TechnologyListCtrl',
    templateUrl: 'technology/view/technologyList.html'
  }).state('technology', {
    url: '/technology/:id',
    controller: 'TechnologyCtrl',
    templateUrl: 'technology/view/technology.html',
    resolve: {
      technology: function(Technology, tagManager, $stateParams) {
        if (!$stateParams.id) {
          return;
        }
        return Technology.find($stateParams.id);
      },
      tagList: function(tagManager) {
        return tagManager.promise;
      }
    }
  });
  return $urlRouterProvider.otherwise('/technology');
});

angular.module('technology').controller('TechnologyCtrl', function($scope, technology, tagManager) {
  $scope.technology = technology;
  if (technology.tags == null) {
    technology.tags = [];
  }
  $scope.addTag = function($tag) {
    var tag;
    tag = tagManager.find($tag.label);
    if (tag != null) {
      $tag.objectId = tag.objectId;
    } else {
      tagManager.add($tag.label).then(function(_tag) {
        return _.merge($tag, _tag);
      });
    }
    technology.save();
    return true;
  };
  return $scope.save = function() {
    return technology.save();
  };
});

angular.module('technology').controller('TechnologyListCtrl', function($scope, Technology) {
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

angular.module('technology').factory('Technology', function(Parse) {
  var Technology;
  return Technology = (function(_super) {
    __extends(Technology, _super);

    function Technology() {
      return Technology.__super__.constructor.apply(this, arguments);
    }

    Technology.configure("Technology", "title", "tags");

    return Technology;

  })(Parse.Model);
});
