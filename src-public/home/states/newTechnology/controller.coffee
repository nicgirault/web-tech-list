angular.module('home').controller 'NewTechnologyCtrl', (
  $scope,
  $state,
  tagList,
  TagManager,
  technologyManager
) ->
  $scope.technology = technologyManager.createTechnology()

  $scope.addTag = ($tag) ->
    tag = TagManager.find $tag.label
    if tag?
      $tag.objectId = tag.objectId
    else
      TagManager.add($tag.label).then (_tag) ->
        _.merge $tag, _tag
    true # true because tag is always valid

  $scope.autocomplete = TagManager.autocomplete

  $scope.save = ->
    $scope.technology.save()
    $state.go 'technologies'
