app.controller 'TechnologyCtrl', ($scope, technology) ->
  $scope.technology = technology
  $scope.tags = [
    { text: 'just' },
    { text: 'some' },
    { text: 'cool' },
    { text: 'tags' },
  ]
