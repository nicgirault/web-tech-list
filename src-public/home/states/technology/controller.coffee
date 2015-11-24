angular.module('home').controller 'TechnologyCtrl', ($scope, $state, technology, TagManager) ->
  $scope.technology = technology
  $scope.technology.tags ?= []

  $scope.addTag = ($tag) ->
    tag = TagManager.find $tag.label
    if tag?
      $tag.objectId = tag.objectId
    else
      TagManager.add($tag.label).then (_tag) ->
        _.merge $tag, _tag
    $scope.technology.save()
    true # true because tag is always valid

  $scope.autocomplete = TagManager.autocomplete

  $scope.save = ->
    $scope.technology.save()

  $scope.delete = ->
    $scope.technology.destroy()
    .then ->
      $state.go 'technologies'
