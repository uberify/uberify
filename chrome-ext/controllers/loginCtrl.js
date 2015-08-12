angular.module('app.login', [])
  .controller('loginController', function($scope, nav){
    $scope.login = function(){
      // Testing triggering an icon change
      chrome.browserAction.setIcon({path: 'iconActive.png'});
      nav.addresses();
    }
  })


