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
]

app.config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
  ParseProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technology',
    url: '/:locale'
    controller: 'TechnologyCtrl'
    templateUrl: 'technology.html'

  $urlRouterProvider.otherwise '/fr'

  ParseProvider.initialize(
    "OhtVXqe3mdDgUi5ugPK7uyQLekZCeZnXQQagb8dY", # Application ID
    "G20uNaG0lAvRZ84PLdDB9gnTmtFCTEfwztixPmwp"  # REST API Key
  )

app.run ($rootScope, $state) ->
  $rootScope.$state = $state
