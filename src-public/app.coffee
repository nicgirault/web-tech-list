'use strict'

app = angular.module 'webTechList', [
  'ng'
  'ngResource'
  'ui.router'
  'ui.bootstrap'
  'app.templates'
  'Parse'
  'angulartics'
  'angulartics.google.analytics'
  'ngTagsInput'
]

app.config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
  ParseProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technologyList',
    url: '/technology'
    controller: 'TechnologyListCtrl'
    templateUrl: 'technologyList.html'
  .state 'technology',
    url: '/technology/:id'
    controller: 'TechnologyCtrl'
    templateUrl: 'technology.html'
    resolve:
      technology: (Technology, tagManager, $stateParams) ->
        return unless $stateParams.id
        Technology.find($stateParams.id)
      tagList: (tagManager) ->
        return tagManager.promise

  $urlRouterProvider.otherwise '/technology'

  ParseProvider.initialize(
    "OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", # Application ID
    "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp"  # REST API Key
  )

app.run ($rootScope, $state) ->
  $rootScope.$state = $state
