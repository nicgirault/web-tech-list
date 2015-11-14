angular.module('home').controller 'TechnologyListCtrl', ($scope, technologyManager) ->

  $scope.addTechnology = ->
    $scope.newTechnology.save().then (technology) ->
      $scope.technologies.push technology
    $scope.newTechnology = technologyManager.createTechnology()

  $scope.removeTechnology = (technology) ->
    technology.destroy().then () ->
      _.remove $scope.technologies, (technology) ->
        technology.objectId is null

  $scope.editingTechnology = (technology) ->
    technology.editing = true

  $scope.editTechnology = (technology) ->
    technology.save()
    technology.editing = false

  $scope.vote = technologyManager.vote

  $scope.technologies = technologyManager.getTechnologyList()

  $scope.newTechnology = technologyManager.createTechnology()
