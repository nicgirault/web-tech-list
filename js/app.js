'use strict';
var app;

app = angular.module('webTechList', ['ng', 'ngResource', 'ui.router', 'ui.bootstrap', 'app.templates', 'Parse', 'angulartics', 'angulartics.google.analytics', 'ngTagsInput', 'ngAnimate', 'ngMessages', 'home', 'tag']);

app.run(function($rootScope, $state) {
  return $rootScope.$state = $state;
});

app.config(function(ParseProvider) {
  return ParseProvider.initialize("OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp");
});

app.filter('filterByTags', function() {
  return function(technologies, query) {
    var tags;
    if (!query) {
      return technologies;
    }
    tags = query.toLowerCase().split(" ");
    if (technologies == null) {
      technologies = [];
    }
    return _.filter(technologies, function(technology) {
      var tag, technologyTags;
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
      technologyTags = technologyTags.join(',').toLowerCase();
      return _.any(tags, function(tag) {
        var _ref;
        return _.contains(technologyTags, tag) || _.contains(technology != null ? (_ref = technology.title) != null ? _ref.toLowerCase() : void 0 : void 0, tag);
      });
    });
  };
});

angular.module('home', ['ng', 'ui.router', 'Parse', 'tag', 'ngMessages']);

angular.module('tag', ['ng', 'Parse']);

angular.module('home').config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.hashPrefix('!');
  $stateProvider.state('technologies', {
    url: '/technology',
    templateUrl: 'technologies.html',
    controller: 'TechnologyListCtrl',
    templateUrl: 'home/states/technologyList/view.html',
    resolve: {
      technologyList: function(technologyManager) {
        return technologyManager.getTechnologyList();
      }
    }
  }).state('technology', {
    url: '/technology/:id',
    controller: 'TechnologyCtrl',
    templateUrl: 'home/states/technology/view.html',
    resolve: {
      technology: function(Technology, TagManager, $stateParams) {
        if (!$stateParams.id) {
          return;
        }
        return Technology.find($stateParams.id);
      },
      tagList: function(TagManager) {
        return TagManager.getTagList();
      }
    }
  }).state('newTechnology', {
    url: '/new',
    controller: 'NewTechnologyCtrl',
    templateUrl: 'home/states/newTechnology/view.html',
    resolve: {
      tagList: function(TagManager) {
        return TagManager.getTagList();
      }
    }
  });
  return $urlRouterProvider.otherwise('/technology');
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

angular.module('home').factory('Technology', function(Parse) {
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

angular.module('home').service('technologyManager', function(Technology) {
  return {
    createTechnology: function() {
      var technology;
      return technology = new Technology({
        thumbsUp: 0,
        thumbsDown: 0
      });
    },
    getTechnologyList: function() {
      return Technology.query();
    },
    vote: function(technology, up) {
      if (technology.thumbsUp == null) {
        technology.thumbsUp = 0;
      }
      if (technology.thumbsDown == null) {
        technology.thumbsDown = 0;
      }
      if (up) {
        ++technology.thumbsUp;
      } else {
        ++technology.thumbsDown;
      }
      return technology.save();
    }
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

angular.module('tag').service('TagManager', function(Tag, $q) {
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
    },
    autocomplete: function(query) {
      return _.filter(tagList, function(tag) {
        return _.contains(tag.label.toLowerCase(), query.toLowerCase());
      });
    }
  };
});

angular.module('home').directive('expandingBox', function($timeout, $state) {
  return {
    restrict: 'E',
    templateUrl: 'home/directives/expanding-box/expanding-box.html',
    scope: {
      technology: '='
    },
    link: function(scope, element, attrs) {
      var box;
      box = element.children();
      return element.on('click', function(event) {
        var body, bodyHeight, bodyWidth, boxHeight, boxLeftOffset, boxTopOffset, boxWidth, leftTranslation, margin, newBox, parent, parentOffsetLeft, parentOffsetTop, topTranslation;
        box = element.children();
        newBox = box.clone();
        boxWidth = box.prop('offsetWidth');
        boxHeight = box.prop('offsetHeight');
        boxLeftOffset = box.prop('offsetLeft');
        boxTopOffset = box.prop('offsetTop');
        margin = 5;
        parent = element.parent();
        parent.append(newBox);
        body = angular.element(document).find('body');
        bodyWidth = body.prop('offsetWidth');
        bodyHeight = body.prop('offsetHeight');
        parentOffsetLeft = parent.prop('offsetLeft');
        parentOffsetTop = parent.prop('offsetTop');
        leftTranslation = boxLeftOffset;
        topTranslation = boxTopOffset;
        box.css("border", "none");
        box.css("box-shadow", "none");
        newBox.empty();
        newBox.removeClass('col-xs-2');
        newBox.css("background", "#fff");
        newBox.css("border", "none");
        newBox.css("box-shadow", "none");
        newBox.css("z-index", "100");
        newBox.css("position", "absolute");
        newBox.css("left", "" + (boxLeftOffset - margin) + "px");
        newBox.css("top", "" + (boxTopOffset - margin) + "px");
        newBox.css("width", "" + bodyWidth + "px");
        newBox.css("height", "" + bodyHeight + "px");
        newBox.css("transform", "translate(" + (-leftTranslation) + "px," + (-topTranslation) + "px)");
        newBox.css("transition", "width 0.5s, height 0.5s, position 0.5s, transform 0.5s");
        return newBox.one('transitionend', function() {
          return $state.go('technology', {
            id: scope.technology.objectId
          });
        });
      });
    }
  };
});

angular.module('home').directive('technologyBlacklist', function(technologyManager) {
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      var technologyList;
      technologyList = [];
      technologyManager.getTechnologyList().then(function(_technologies) {
        return technologyList = _technologies;
      });
      ngModel.$parsers.unshift(function(value) {
        var valid;
        valid = _.findIndex(technologyList, {
          title: value
        }) === -1;
        ngModel.$setValidity('technology-blacklist', valid);
        if (valid) {
          return value;
        } else {
          return void 0;
        }
      });
      ngModel.$formatters.unshift(function(value) {
        ngModel.$setValidity('technology-blacklist', _.findIndex(technologyList, {
          title: value
        }) === -1);
        return value;
      });
    }
  };
});

angular.module('home').controller('NewTechnologyCtrl', function($scope, $state, tagList, TagManager, technologyManager) {
  $scope.technology = technologyManager.createTechnology();
  $scope.addTag = function($tag) {
    var tag;
    tag = TagManager.find($tag.label);
    if (tag != null) {
      $tag.objectId = tag.objectId;
    } else {
      TagManager.add($tag.label).then(function(_tag) {
        return _.merge($tag, _tag);
      });
    }
    return true;
  };
  $scope.autocomplete = TagManager.autocomplete;
  return $scope.save = function() {
    $scope.technology.save();
    return $state.go('technologies');
  };
});

angular.module('home').controller('TechnologyCtrl', function($scope, $state, technology, TagManager) {
  var _base;
  $scope.technology = technology;
  if ((_base = $scope.technology).tags == null) {
    _base.tags = [];
  }
  $scope.addTag = function($tag) {
    var tag;
    tag = TagManager.find($tag.label);
    if (tag != null) {
      $tag.objectId = tag.objectId;
    } else {
      TagManager.add($tag.label).then(function(_tag) {
        return _.merge($tag, _tag);
      });
    }
    $scope.technology.save();
    return true;
  };
  $scope.autocomplete = TagManager.autocomplete;
  $scope.save = function() {
    return $scope.technology.save();
  };
  return $scope["delete"] = function() {
    return $scope.technology.destroy().then(function() {
      return $state.go('technologies');
    });
  };
});

angular.module('home').controller('TechnologyListCtrl', function($rootScope, $scope, technologyManager, technologyList) {
  $scope.vote = technologyManager.vote;
  return $scope.technologies = technologyList;
});
