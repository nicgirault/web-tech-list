describe "TechnologyController", () ->
  beforeEach module 'webTechList'

  $controller = null
  technology = {
    save: ->
      return null
  }

  beforeEach inject (_$controller_) ->
    $controller = _$controller_

  describe '$scope.save', ->
    it 'sets the strength to "strong" if the password length is >8 chars', ->
      $scope = {}

      controller = $controller('TechnologyCtrl', { $scope: $scope, technology: technology })
      spyOn(technology, 'save')
      $scope.save()
      expect(technology.save).toHaveBeenCalled()
