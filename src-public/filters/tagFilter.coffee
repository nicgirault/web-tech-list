app.filter 'filterByTags', ->
  # search in case insensitive
  # query is splited in string. Separator is " "
  # keep technology if all substring in query are the beginning of a tag of this technology
  (technologies, query) ->
    return technologies unless query
    tags = query.toLowerCase().split(" ")
    filtered = []
    technologies ?= []
    technologies.forEach (technology) ->
      technologyTags = (tag.label for tag in technology.tags or [])
      matches = tags.every (tag) ->
        _.findIndex(technologyTags, (technologyTag) ->
            technologyTag.substr(0, tag.length).toLowerCase() == tag
        ) > -1 or technology.title.substr(0, tag.length).toLowerCase() == tag
      if matches
        filtered.push technology
    filtered
