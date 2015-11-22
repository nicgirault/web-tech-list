angular.module 'home'
.controller 'TechnologyListCtrl', (
  $rootScope
  $scope
  technologyManager
  technologyList
) ->
  $scope.vote = technologyManager.vote

  $scope.technologies = technologyList
