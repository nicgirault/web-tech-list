describe 'TechnologyController', ->

  beforeEach module 'webTechList'
  controller = null
  tagManager = null
  technology =
    save: -> null
  save = sinon.spy technology, 'save'
  $scope = {}
  $tag =
    label: 'js'

  beforeEach inject ($controller, _tagManager_) ->
    tagManager = _tagManager_

    $scope = {}
    controller = $controller 'TechnologyCtrl', {
      $scope: $scope
      technology: technology
      tagManager: tagManager
    }

  describe '$scope.save', ->
    it 'should call technology.save', ->
      save.reset()

      $scope.save()
      expect(save).to.have.been.calledOnce

  describe '$scope.addTag', ->
    it 'should call tagManager.find', ->
      find = sinon.spy tagManager, 'find'

      $tag = {}
      $scope.addTag $tag
      expect(find).to.have.been.calledOnce

    it 'should set tag.objectId if tag exists', ->
      tagManagerMock = sinon.mock tagManager
      $tag =
        label: 'js'
      tagManagerMock.restore()
      tagManagerMock.expects('find').once().withExactArgs('js').returns({objectId: 'abcdef'})

      $scope.addTag $tag
      expect($tag.objectId).to.equals('abcdef')
      tagManagerMock.verify()

    it 'should create a new tag if tag is not found', ->
      tagManagerMock = sinon.mock tagManager
      tagManagerMock.restore()
      $tag =
        label: 'js'
      tagManagerMock.expects('find').once().withExactArgs('js').returns(undefined)
      tagManagerMock.expects('add').once().withExactArgs('js').returns( then: (f) -> f({objectId: '12345', tag: 'js'})) # je n'arrive pas à utiliser sinon-as-promised
      save.reset()

      $scope.addTag $tag
      expect($tag.objectId).to.equals('12345')
      tagManagerMock.verify()
      expect(save).to.have.been.calledOnce
