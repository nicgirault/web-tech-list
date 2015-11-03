describe 'technologyManager', ->
  beforeEach module 'webTechList'

  beforeEach inject (_technologyManager_, _Technology_) ->
    @Technology = _Technology_
    @technology = new @Technology
    @save = sinon.stub @technology, 'save'
    @technologyManager = _technologyManager_

  describe 'vote', ->
    it 'should call technology.save', ->
      @technologyManager.vote @technology, true
      expect(@save).to.have.been.calledOnce

    it 'should create thumbsUp attribute if it does not exists', ->
      @technologyManager.vote @technology, true
      expect(@technology.thumbsUp).to.equals 1

    it 'should increment thumbsUp attribute', ->
      @technology.thumbsUp = 3
      @technologyManager.vote @technology, true
      expect(@technology.thumbsUp).to.equals 4

    it 'should create thumbsDown attribute if it does not exists', ->
      @technologyManager.vote @technology, false
      expect(@technology.thumbsDown).to.equals 1

    it 'should increment thumbsDown attribute', ->
      @technology.thumbsDown = 3
      @technologyManager.vote @technology, false
      expect(@technology.thumbsDown).to.equals 4

  describe 'createTechnology', ->
    it 'should return a Technology instance', ->
      instance = @technologyManager.createTechnology()
      expect(instance).to.be.an.instanceof @Technology
