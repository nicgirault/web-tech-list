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
    it 'should return an array of tags', (done) ->
      returnedTags = @TagManager.autocomplete 's'
      expect(returnedTags).to.be.an.instanceof(Array)
      done()
      @rootScope.$apply()

    it 'should filter tags as expected 1', (done) ->
      returnedTags = @TagManager.autocomplete 's'
      expect(returnedTags).to.include label: 'SAAS'
      expect(returnedTags).to.include label: 'search'
      done()
      @rootScope.$apply()

    it 'should filter tags as expected 2', (done) ->
      returnedTags = @TagManager.autocomplete 'se'
      expect(returnedTags).to.not.include label: 'SAAS'
      expect(returnedTags).to.include label: 'search'
      done()
      @rootScope.$apply()
