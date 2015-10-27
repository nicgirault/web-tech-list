app.controller 'TechnologyCtrl', ($scope, technology, tagManager) ->
  $scope.technology = technology
  technology.tags = [] unless technology.tags?

  $scope.addTag = ($tag) ->
    tag = tagManager.find $tag.label
    if tag?
      $tag.objectId = tag.objectId
    else
      tagManager.add($tag.label).then (_tag) ->
        _.merge $tag, _tag
    technology.save()
    true # true because tag is always valid

  $scope.save = ->
    technology.save()
