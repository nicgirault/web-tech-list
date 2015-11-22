angular.module('tag').service 'TagManager', (Tag, $q) ->
  tagList = []
  promise = Tag.query().then (_tags) ->
    tagList = _tags

  promise: promise

  getTagList: ->
    return tagList

  find: (label) ->
    return _.find tagList, label: label

  add: (label) ->
    tag = new Tag label: label
    tag.save().then (_tag) ->
      tagList.push _tag
      return _tag

  autocomplete: (query) ->
    _.filter tagList, (tag) ->
      _.contains tag.label.toLowerCase(), query.toLowerCase()
