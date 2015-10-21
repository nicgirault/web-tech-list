app.factory 'Technology', (Parse) ->
  class Technology extends Parse.Model
    @configure "Technology", "title"
