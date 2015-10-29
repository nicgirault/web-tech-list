describe 'technologyManager', ->

  Technology = null
  technology = null
  technologyManager = null
  save = null

  beforeEach module 'webTechList'

  beforeEach inject (_technologyManager_, _Technology_) ->
    Technology = _Technology_
    technology = new Technology
    save = sinon.stub technology, 'save'
    technologyManager = _technologyManager_

  describe 'thumbsUp', ->
    it 'should call technology.save', ->
      technologyManager.thumbsUp technology
      expect(save).to.have.been.calledOnce

    it 'should create thumbsUp attribute if it does not exists', ->
      technologyManager.thumbsUp technology
      expect(technology.thumbsUp).to.equals 1

    it 'should increment thumbsUp attribute', ->
      technology.thumbsUp = 3
      technologyManager.thumbsUp technology
      expect(technology.thumbsUp).to.equals 4

  describe 'thumbsDown', ->
    it 'should call technology.save', ->
      technologyManager.thumbsDown technology
      expect(save).to.have.been.calledOnce

    it 'should create thumbsDown attribute if it does not exists', ->
      technologyManager.thumbsDown technology
      expect(technology.thumbsDown).to.equals 1

    it 'should increment thumbsDown attribute', ->
      technology.thumbsDown = 3
      technologyManager.thumbsDown technology
      expect(technology.thumbsDown).to.equals 4

  describe 'createTechnology', ->
    it 'should return a Technology instance', ->
      instance = technologyManager.createTechnology()
      expect(instance).to.be.an.instanceof Technology
