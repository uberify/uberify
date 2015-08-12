angular.module('app')
  .factory('nav', function($state){
    var nav = {};

    nav.addresses = function() {
      $state.transitionTo('addresses');
    };

    nav.logout = function() {
      $state.transitionTo('login');
    };
    return nav;
  })
