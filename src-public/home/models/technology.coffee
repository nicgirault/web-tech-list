angular.module('home').factory 'Technology', (Parse) ->
  class Technology extends Parse.Model
    @configure "Technology", "title", "tags", "thumbsUp", "thumbsDown", "logoUrl"
