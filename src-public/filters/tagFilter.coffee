app.filter 'filterByTags', ->
  # search in case insensitive
  # query is splited in string. Separator is " "
  # keep technology if all substring in query are the beginning of a tag of this technology
  (technologies, query) ->
    return technologies unless query
    tags = query.toLowerCase().split(" ")
    technologies ?= []
    _.filter technologies, (technology) ->
      technologyTags = (tag.label for tag in technology.tags or [])
      technologyTags = technologyTags.join(',').toLowerCase()
      _.any tags, (tag) ->
        _.contains(technologyTags, tag) or
        _.contains(technology?.title?.toLowerCase(), tag)
