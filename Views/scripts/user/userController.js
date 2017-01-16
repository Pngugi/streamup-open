angular.module('sync').controller('userController',['User','$scope',function(User,$scope){

  $scope.options =[{logout:'logout'}];
  User.getUsername()
  .then(function(user){
    $scope.user = user;
  }).catch();
  // $scope.user = 'StrimUp';

}]);
