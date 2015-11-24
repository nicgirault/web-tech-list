angular.module('home').service 'technologyManager', (Technology) ->
  createTechnology: ->
    technology = new Technology
      thumbsUp: 0
      thumbsDown: 0

  getTechnologyList: ->
    Technology.query()

  vote: (technology, up) ->
    technology.thumbsUp ?= 0
    technology.thumbsDown ?= 0
    if up then ++technology.thumbsUp else ++technology.thumbsDown
    technology.save()
