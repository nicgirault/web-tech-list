describe 'TechnologyManager', ->
  beforeEach module 'home'

  TagManagerMock =
    filterByTags: -> return
  filterByTagsStub = sinon.stub TagManagerMock, 'filterByTags'

  beforeEach ->
    TechnologyMock = (label) -> return
    TechnologyMock.query = ->
      then: (callback) ->
        callback technologyListFixtures
    TechnologyMock.prototype.save = ->
      then: (callback) ->
        callback {}

    module ($provide) ->
      $provide.value 'Technology', TechnologyMock
      $provide.value 'TagManager', TagManagerMock
      null # https://gist.github.com/jbrowning/9527280

  beforeEach inject (TechnologyManager, Technology) ->
    @Technology = Technology
    @technology = new @Technology
    @save = sinon.stub @technology, 'save'
    @TechnologyManager = TechnologyManager

  describe 'vote', ->
    it 'should call technology.save', ->
      @TechnologyManager.vote @technology, true
      expect(@save).to.have.been.calledOnce

    it 'should create thumbsUp attribute if it does not exists', ->
      @TechnologyManager.vote @technology, true
      expect(@technology.thumbsUp).to.equals 1

    it 'should increment thumbsUp attribute', ->
      @technology.thumbsUp = 3
      @TechnologyManager.vote @technology, true
      expect(@technology.thumbsUp).to.equals 4

    it 'should create thumbsDown attribute if it does not exists', ->
      @TechnologyManager.vote @technology, false
      expect(@technology.thumbsDown).to.equals 1

    it 'should increment thumbsDown attribute', ->
      @technology.thumbsDown = 3
      @TechnologyManager.vote @technology, false
      expect(@technology.thumbsDown).to.equals 4

  describe 'createTechnology', ->
    it 'should return a Technology instance', ->
      instance = @TechnologyManager.createTechnology()
      expect(instance).to.be.an.instanceof @Technology

  describe 'getTechnologyList', ->
    it 'should return the technology list', ->
      assert.deepEqual @TechnologyManager.getTechnologyList(), technologyListFixtures

    it 'should call TagManager.filterByTags is tags are provided', ->
      @TechnologyManager.getTechnologyList({tag: 'SAAS'}, technologyListFixtures)
      expect(filterByTagsStub).to.have.been.calledWith('SAAS', technologyListFixtures)
