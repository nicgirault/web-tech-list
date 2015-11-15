angular.module('home').service 'TechnologyManager', (Technology, TagManager) ->
  technologyList = []
  promise = Technology.query().then (_technologies) ->
    technologyList = _technologies
  increment = (value) ->
    if value? then value + 1 else 1

  promise: promise

  createTechnology: ->
    new Technology

  getTechnologyList: (filters) ->
    filteredTechnologyList = technologyList
    if filters?.tag?
      result = TagManager.filterByTags filters.tag, filteredTechnologyList
    filteredTechnologyList

  vote: (technology, up) ->
    if up
      technology.thumbsUp = increment technology.thumbsUp
    else
      technology.thumbsDown = increment technology.thumbsDown
    technology.save()
