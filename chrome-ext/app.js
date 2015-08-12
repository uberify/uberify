angular.module('app', ['ui.router', 'app.login', 'app.addresses'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');

  var login = {
    name: 'login',
    url: '/login',
    templateUrl: './templates/login.html'
  };

  var addresses = {
    name: 'addresses',
    url: '/addresses',
    templateUrl: './templates/addresses.html'
  };

  $stateProvider
    .state(login)
    .state(addresses)
}])

.run(['$state', function($state){
  $state.transitionTo('login');
}])



