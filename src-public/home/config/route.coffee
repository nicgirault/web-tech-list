angular.module('home').config (
  $locationProvider
  $stateProvider
  $urlRouterProvider
) ->

  $locationProvider.hashPrefix '!'

  $stateProvider
  .state 'technologies',
    url: '/technology'
    templateUrl: 'technologies.html'
    controller: 'TechnologyListCtrl'
    templateUrl: 'home/states/technologyList/view.html'
    resolve:
      technologyList: (technologyManager) ->
        technologyManager.getTechnologyList()
  .state 'technology',
    url: '/technology/:id'
    controller: 'TechnologyCtrl'
    templateUrl: 'home/states/technology/view.html'
    resolve:
      technology: (Technology, TagManager, $stateParams) ->
        return unless $stateParams.id
        Technology.find $stateParams.id
      tagList: (TagManager) ->
        TagManager.getTagList()
  .state 'newTechnology',
    url: '/new'
    controller: 'NewTechnologyCtrl'
    templateUrl: 'home/states/newTechnology/view.html'
    resolve:
      tagList: (TagManager) ->
        TagManager.getTagList()

  $urlRouterProvider.otherwise '/technology'
