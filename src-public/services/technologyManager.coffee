app.service 'technologyManager', (Technology) ->
  technologyList = []
  promise = Technology.query().then (_technologies) ->
    technologyList = _technologies

  promise: promise

  getTechnologyList: ->
    return technologyList

  thumbsUp: (technology) ->
    if technology.thumbsUp?
      technology.thumbsUp = technology.thumbsUp + 1
    else
      technology.thumbsUp = 1
    technology.save()

  thumbsDown: (technology) ->
    if technology.thumbsDown?
      technology.thumbsDown = technology.thumbsDown + 1
    else
      technology.thumbsDown = 1
    technology.save()
