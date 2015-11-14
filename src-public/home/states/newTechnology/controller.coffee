angular.module('home').controller 'NewTechnologyCtrl', (
  $scope,
  $state,
  technologyList,
  tagList,
  tagManager,
  technologyManager
) ->
  $scope.technology = technologyManager.createTechnology()
  $scope.addTag = ($tag) ->
    tag = tagManager.find $tag.label
    if tag?
      $tag.objectId = tag.objectId
    else
      tagManager.add($tag.label).then (_tag) ->
        _.merge $tag, _tag
    true # true because tag is always valid
  $scope.loadTags = tagManager.loadTags
  $scope.save = ->
    $scope.technology.save()
    technologyList.push $scope.technology
    $state.go 'technologyList'
