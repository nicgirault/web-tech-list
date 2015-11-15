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
    $q (resolve, reject) ->
      resolve _.filter tagList, (tag) ->
        tag.label.substr(0, query.length).toLowerCase() == query.toLowerCase()

  filterByTags: (requiredTags, technologyList) ->
    requiredTags = [requiredTags] unless _.isArray requiredTags
    _.filter technologyList, (technology) ->
      _.every requiredTags, (requiredTag) ->
        requiredTag in (tag.label for tag in technology.tags)
