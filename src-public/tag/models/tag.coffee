angular.module('tag').factory 'Tag', (Parse) ->
  class Tag extends Parse.Model
    @configure "Tag", "label"
