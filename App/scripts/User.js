angular.module('sync').service('User', ['$http','$q','$rootScope',function Files ($http,$q,$rootScope) {
	this.get = function(){
		var promise = $q.defer();
		$http.get($rootScope.endPoint +"/api/user")
		.success(function(res){
			
			promise.resolve(res);
		})
		.error(function() {
			promise.reject();
		});
		return promise.promise;
	};
  this.followerEmails = function() {
    var differed = $q.defer();
      $http.get($rootScope.endPoint + '/api/emailOfmyFollowers')
      .success(function(response){
        differed.resolve(response);
      })
      .error(function(err){
        differed.reject(err);
      });
      return differed.promise;
  };

	this.report = function(error) {
    var differed = $q.defer();
      $http.post($rootScope.endPoint + '/api/bugs', error)
      .success(function(response){
        differed.resolve(response);
      })
      .error(function(err){
        differed.reject(err);
      });
      return differed.promise;
  };
	this.groups = function(user){
      var differed = $q.defer();
      $http.get($rootScope.endPoint + '/api/me/groups')
      .success(function(response){
        differed.resolve(response);
      })
      .error(function(err){
        differed.reject(err);
      });
      return differed.promise;
    };
		this.diskUsage = function(user){
      var differed = $q.defer();
      $http.get($rootScope.endPoint + '/api/diskUsage')
      .success(function(response){
        differed.resolve(response);
      })
      .error(function(err){
        differed.reject(err);
      });
      return differed.promise;
    };
    this.notificationList = function() {
      var differed = $q.defer();
      $http.get($rootScope.endPoint + '/api/notificationLists')

      .success(function(response){
        differed.resolve(response);
      })
      .error(function(err){
        differed.reject(err);
      });
      return differed.promise;
    }
	return this;
}]);
