app.factory 'Tag', (Parse) ->
  class Tag extends Parse.Model
    @configure "Tag", "name"
