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
  'ngAnimate'
]

app.run ($rootScope, $state) ->
  $rootScope.$state = $state
