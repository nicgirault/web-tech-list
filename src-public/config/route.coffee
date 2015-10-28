app.config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technologyList',
    url: '/technology'
    controller: 'TechnologyListCtrl'
    templateUrl: 'technologyList.html'
    resolve:
      technologyList: (technologyManager) ->
        return technologyManager.promise
  .state 'technology',
    url: '/technology/:id'
    controller: 'TechnologyCtrl'
    templateUrl: 'technology.html'
    resolve:
      technology: (Technology, tagManager, $stateParams) ->
        return unless $stateParams.id
        Technology.find $stateParams.id
      tagList: (tagManager) ->
        return tagManager.promise

  $urlRouterProvider.otherwise '/technology'
