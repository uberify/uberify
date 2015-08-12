angular.module('app.addresses', [])
  .controller('addressesController', function($scope, nav){
    $scope.logout = function(){
      nav.logout();
    }
  })


