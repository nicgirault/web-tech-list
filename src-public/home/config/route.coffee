angular.module('home').config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technologyList',
    url: '/technology?tag'
    controller: 'TechnologyListCtrl'
    templateUrl: 'home/states/technologyList/view.html'
    resolve:
      technologyList: (TechnologyManager) ->
        TechnologyManager.promise
  .state 'technology',
    url: '/technology/:id'
    controller: 'TechnologyCtrl'
    templateUrl: 'home/states/technology/view.html'
    resolve:
      technology: (Technology, TagManager, $stateParams) ->
        return unless $stateParams.id
        Technology.find $stateParams.id
      tagList: (TagManager) ->
        TagManager.promise
  .state 'newTechnology',
    url: '/new'
    controller: 'NewTechnologyCtrl'
    templateUrl: 'home/states/newTechnology/view.html'
    resolve:
      technologyList: (TechnologyManager) ->
        TechnologyManager.promise
      tagList: (TagManager) ->
        TagManager.promise

  $urlRouterProvider.otherwise '/technology'
