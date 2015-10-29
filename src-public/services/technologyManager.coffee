app.service 'technologyManager', (Technology) ->
  technologyList = []
  promise = Technology.query().then (_technologies) ->
    technologyList = _technologies
  increment = (value) ->
    if value? then value + 1 else 1

  promise: promise

  createTechnology: ->
    new Technology

  getTechnologyList: ->
    technologyList

  thumbsUp: (technology) ->
    technology.thumbsUp = increment technology.thumbsUp
    technology.save()

  thumbsDown: (technology) ->
    technology.thumbsDown = increment technology.thumbsDown
    technology.save()
