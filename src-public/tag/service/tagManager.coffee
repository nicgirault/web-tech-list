app.service 'tagManager', (Tag) ->
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
