angular.module('home').controller 'TechnologyListCtrl', ($scope, TechnologyManager; $stateParams) ->
  $scope.addTechnology = ->
    $scope.newTechnology.save().then (technology) ->
      $scope.technologies.push technology
    $scope.newTechnology = TechnologyManager.createTechnology()

  $scope.removeTechnology = (technology) ->
    technology.destroy().then () ->
      _.remove $scope.technologies, (technology) ->
        technology.objectId is null

  $scope.editingTechnology = (technology) ->
    technology.editing = true

  $scope.editTechnology = (technology) ->
    technology.save()
    technology.editing = false

  $scope.vote = TechnologyManager.vote

  $scope.selectedTags = if _.isArray $stateParams.tag then $stateParams.tag else [$stateParams.tag]

  $scope.technologies = TechnologyManager.getTechnologyList $stateParams

  $scope.newTechnology = TechnologyManager.createTechnology()
