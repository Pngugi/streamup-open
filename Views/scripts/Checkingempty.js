angular.module('sync').service('Checkingempty',['$http','$q','$rootScope',function($http,$q,$rootScope){
  this.checkallFolderFile  = function(id){
    var differ = $q.defer();
    $http.get($rootScope.endPoint + '/api/checkallFolderFile/' +id)
    .success(function(response){
      differ.resolve(response);
    },function(err){
      differ.reject(err);
    });
    return differ.promise;
  };
  return this;
}]);
