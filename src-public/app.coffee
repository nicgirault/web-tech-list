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

  # app modules
  'tag'
]

app.run ($rootScope, $state) ->
  $rootScope.$state = $state
