describe 'TagManager', ->

  beforeEach module 'tag'

  tagList = [
    label: 'framework'
  ,
    label: 'SAAS'
  ,
    label: 'search'
  ]

  beforeEach ->
    TagMock = (label) -> return
    TagMock.query = ->
      then: (callback) ->
        callback tagList
    TagMock.prototype.save = ->
      then: (callback) ->
        callback {label: 'returned new label'}

    module ($provide) ->
      $provide.value 'Tag', TagMock
      null # https://gist.github.com/jbrowning/9527280

  beforeEach inject ($rootScope, $q, TagManager) ->
    @TagManager = TagManager
    @rootScope =$rootScope
    @$q = $q

  describe 'getTagList', ->
    it 'should return the tagList', ->
      assert.deepEqual @TagManager.getTagList(), tagList

  describe 'find', ->
    it 'should return the tag if the label is in tag list', ->
      assert.deepEqual @TagManager.find('SAAS'), label: 'SAAS'

    it 'should return undefined if the label is not in tag list', ->
      assert.deepEqual @TagManager.find('unknown label'), undefined

  describe 'add', ->
    it 'should add an element to the tag list', ->
      assert.equal tagList.length, 3
      @TagManager.add 'new label'
      newTagList = @TagManager.getTagList()
      assert.equal newTagList.length, 4
      expect(newTagList).to.include label: 'returned new label'

  describe 'autocomplete', ->
    it 'should return a promise eventually resolving an array', (done) ->
      promise = @TagManager.autocomplete 's'

      promise.then (returnedTags) ->
        expect(returnedTags).to.be.an.instanceof(Array)
        done()
      @rootScope.$apply()

    it 'should filter tags as expected 1', (done) ->
      promise = @TagManager.autocomplete 's'

      promise.then (returnedTags) ->
        expect(returnedTags).to.include label: 'SAAS'
        expect(returnedTags).to.include label: 'search'
        done()
      @rootScope.$apply()

    it 'should filter tags as expected 2', (done) ->
      promise = @TagManager.autocomplete 'se'

      promise.then (returnedTags) ->
        expect(returnedTags).to.not.include label: 'SAAS'
        expect(returnedTags).to.include label: 'search'
        done()
      @rootScope.$apply()

  describe 'filterByTags', ->
    it 'should remove all technologies without the defined tag', ->
      filteredTechnologyList = @TagManager.filterByTags 'SAAS', technologyListFixtures
      expect(filteredTechnologyList.length).to.be.equal 3
      titles = (technology.title for technology in filteredTechnologyList)
      expect(titles).to.include 'Parse'
      expect(titles).to.include 'Intercom'
      expect(titles).to.include 'Algolia'

    it 'should remove all technologies without the defined tags', ->
      filteredTechnologyList = @TagManager.filterByTags ['SAAS', 'API'], technologyListFixtures
      titles = (technology.title for technology in filteredTechnologyList)
      expect(filteredTechnologyList.length).to.be.equal 1
      expect(titles).to.include 'Parse'
