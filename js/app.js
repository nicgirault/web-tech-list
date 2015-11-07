'use strict';
var app;

app = angular.module('webTechList', ['ng', 'ngResource', 'ui.router', 'ui.bootstrap', 'app.templates', 'Parse', 'angulartics', 'angulartics.google.analytics', 'ngTagsInput']);

app.run(function($rootScope, $state) {
  return $rootScope.$state = $state;
});

app.config(function(ParseProvider) {
  return ParseProvider.initialize("OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp");
});

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('technologyList', {
    url: '/technology',
    controller: 'TechnologyListCtrl',
    templateUrl: 'technologyList.html',
    resolve: {
      technologyList: function(technologyManager) {
        return technologyManager.promise;
      }
    }
  }).state('technology', {
    url: '/technology/:id',
    controller: 'TechnologyCtrl',
    templateUrl: 'technology.html',
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

app.controller('TechnologyCtrl', function($scope, technology, tagManager) {
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

app.controller('TechnologyListCtrl', function($scope, technologyManager) {
  $scope.addTechnology = function() {
    $scope.newTechnology.save().then(function(technology) {
      return $scope.technologies.push(technology);
    });
    return $scope.newTechnology = technologyManager.createTechnology();
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
  $scope.vote = technologyManager.vote;
  $scope.technologies = technologyManager.getTechnologyList();
  return $scope.newTechnology = technologyManager.createTechnology();
});

app.filter('filterByTags', function() {
  return function(technologies, query) {
    var filtered, tags;
    if (!query) {
      return technologies;
    }
    tags = query.toLowerCase().split(" ");
    filtered = [];
    if (technologies == null) {
      technologies = [];
    }
    technologies.forEach(function(technology) {
      var matches, tag, technologyTags;
      technologyTags = (function() {
        var _i, _len, _ref, _results;
        _ref = technology.tags || [];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push(tag.label);
        }
        return _results;
      })();
      matches = tags.every(function(tag) {
        return _.findIndex(technologyTags, function(technologyTag) {
          return technologyTag.substr(0, tag.length).toLowerCase() === tag;
        }) > -1 || technology.title.substr(0, tag.length).toLowerCase() === tag;
      });
      if (matches) {
        return filtered.push(technology);
      }
    });
    return filtered;
  };
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

    Tag.configure("Tag", "label");

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

    Technology.configure("Technology", "title", "tags", "thumbsUp", "thumbsDown", "logoUrl");

    return Technology;

  })(Parse.Model);
});

app.service('tagManager', function(Tag) {
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

app.service('technologyManager', function(Technology) {
  var increment, promise, technologyList;
  technologyList = [];
  promise = Technology.query().then(function(_technologies) {
    return technologyList = _technologies;
  });
  increment = function(value) {
    if (value != null) {
      return value + 1;
    } else {
      return 1;
    }
  };
  return {
    promise: promise,
    createTechnology: function() {
      return new Technology;
    },
    getTechnologyList: function() {
      return technologyList;
    },
    vote: function(technology, up) {
      if (up) {
        technology.thumbsUp = increment(technology.thumbsUp);
      } else {
        technology.thumbsDown = increment(technology.thumbsDown);
      }
      return technology.save();
    }
  };
});
