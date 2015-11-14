angular.module('home').config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technologyList',
    url: '/technology'
    controller: 'TechnologyListCtrl'
    templateUrl: 'home/states/technologyList/view.html'
    resolve:
      technologyList: (technologyManager) ->
        technologyManager.promise
  .state 'technology',
    url: '/technology/:id'
    controller: 'TechnologyCtrl'
    templateUrl: 'home/states/technology/view.html'
    resolve:
      technology: (Technology, tagManager, $stateParams) ->
        return unless $stateParams.id
        Technology.find $stateParams.id
      tagList: (tagManager) ->
        tagManager.promise
  .state 'newTechnology',
    url: '/new'
    controller: 'NewTechnologyCtrl'
    templateUrl: 'home/states/newTechnology/view.html'
    resolve:
      technologyList: (technologyManager) ->
        technologyManager.promise
      tagList: (tagManager) ->
        tagManager.promise

  $urlRouterProvider.otherwise '/technology'
