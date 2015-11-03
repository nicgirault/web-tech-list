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

  vote: (technology, up) ->
    if up
      technology.thumbsUp = increment technology.thumbsUp
    else
      technology.thumbsDown = increment technology.thumbsDown
    technology.save()
