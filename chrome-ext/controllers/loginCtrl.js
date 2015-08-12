angular.module('app.login', [])
  .controller('loginController', function($scope, nav){
    $scope.login = function(){
      nav.addresses();
    }
  })


