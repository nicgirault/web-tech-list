describe 'TechnologyController', ->

  beforeEach module 'home'
  controller = null
  TagManager = null
  technology =
    save: -> null
  save = sinon.spy technology, 'save'
  $scope = {}
  $tag =
    label: 'js'

  beforeEach inject ($controller, _TagManager_) ->
    TagManager = _TagManager_

    $scope = {}
    controller = $controller 'TechnologyCtrl', {
      $scope: $scope
      technology: technology
      TagManager: TagManager
    }

  describe '$scope.save', ->
    it 'should call technology.save', ->
      save.reset()

      $scope.save()
      expect(save).to.have.been.calledOnce

  describe '$scope.addTag', ->
    it 'should call TagManager.find', ->
      find = sinon.spy TagManager, 'find'

      $tag = {}
      $scope.addTag $tag
      expect(find).to.have.been.calledOnce

    it 'should set tag.objectId if tag exists', ->
      TagManagerMock = sinon.mock TagManager
      $tag =
        label: 'js'
      TagManagerMock.restore()
      TagManagerMock.expects('find').once().withExactArgs('js').returns({objectId: 'abcdef'})

      $scope.addTag $tag
      expect($tag.objectId).to.equals('abcdef')
      TagManagerMock.verify()

    it 'should create a new tag if tag is not found', ->
      TagManagerMock = sinon.mock TagManager
      TagManagerMock.restore()
      $tag =
        label: 'js'
      TagManagerMock.expects('find').once().withExactArgs('js').returns(undefined)
      TagManagerMock.expects('add').once().withExactArgs('js').returns( then: (f) -> f({objectId: '12345', tag: 'js'})) # je n'arrive pas à utiliser sinon-as-promised
      save.reset()

      $scope.addTag $tag
      expect($tag.objectId).to.equals('12345')
      TagManagerMock.verify()
      expect(save).to.have.been.calledOnce
