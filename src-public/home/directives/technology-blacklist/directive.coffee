angular.module('home').directive 'technologyBlacklist', (technologyManager) ->
  require: 'ngModel'
  link: (scope, elem, attr, ngModel) ->
    technologyList = []

    technologyManager.getTechnologyList()
    .then (_technologies) ->
      technologyList = _technologies

    ngModel.$parsers.unshift (value) ->
      valid = _.findIndex(technologyList, title: value) == -1
      ngModel.$setValidity 'technology-blacklist', valid
      if valid then value else undefined

    #For model -> DOM validation
    ngModel.$formatters.unshift (value) ->
      ngModel.$setValidity 'technology-blacklist', _.findIndex(technologyList, title: value) == -1
      value
    return
