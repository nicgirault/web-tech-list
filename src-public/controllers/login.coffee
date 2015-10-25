app.controller 'LoginCtrl', ($scope, $auth) ->

  $scope.authenticate = (provider) ->
    $auth.authenticate provider
