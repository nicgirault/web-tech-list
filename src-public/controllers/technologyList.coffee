app.controller 'TechnologyListCtrl', ($scope, Technology) ->

  $scope.addTechnology = ->
    $scope.newTechnology.save().then (technology) ->
      $scope.fetchTechnologies()
    $scope.newTechnology = new Technology
    console.log new Technology

  $scope.removeTechnology = (technology) ->
    technology.destroy().then () ->
      _.remove $scope.technologies, (technology) ->
        technology.objectId is null

  $scope.editingTechnology = (technology) ->
    technology.editing = true

  $scope.editTechnology = (technology) ->
    technology.save()
    technology.editing = false

  $scope.cancelEditing = (technology) ->
    technology.title = technology._cache.title
    technology.editing = false

  $scope.fetchTechnologies = ->
    Technology.query()
    .then (technologies) ->
      $scope.technologies = technologies

  $scope.fetchTechnologies()
  $scope.newTechnology = new Technology
