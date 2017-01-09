angular.module('sync').
service('Files', ['$http','$q','$rootScope',function Files ($http,$q,$rootScope) {
    this.getGroupFiles =function(groupId) {
        var differed = $q.defer();
        
        $http.get($rootScope.endPoint +'/api/groups/'+groupId+'/groupfiles')
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };
    this.delete =function(id) {
        var differed = $q.defer();
       
        $http.get($rootScope.endPoint +'/api/fileDelete/'+id)

        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };

  this.filerestore =function(id) {
        var differed = $q.defer();
        
        $http.get($rootScope.endPoint +'/api/filerestore/'+id)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };
      this.deleteonbins_files =function(id) {
        var differed = $q.defer();
        
        $http.delete($rootScope.endPoint +'/api/deleteonbins_files/'+id)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };

    this.fileCopy =function(folder_id,file_id) {
        var differed = $q.defer();
        
        $http.post($rootScope.endPoint +'/api/fileCopy/'+folder_id+'/'+file_id)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };
    this.getSharebleName = function(id) {
        var differed = $q.defer();
       
        $http.get($rootScope.endPoint +'/api/sharebleLink/'+id)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };
    this.creazy = function(object){
        var differed = $q.defer();
       
        $http.get($rootScope.endPoint +'/api/?+query='+'query+FetchUsers'+object)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };
    this.single = function(file){
      var promise = $q.defer();
      $http.get($rootScope.endPoint+ '/preview/'+ file)
      .success(function(response){
        promise.resolve(response);
      })
      .error(function(err){
        promise.reject(err);
      });
      return promise.promise;
    };
    this.getBoxFiles = function(folderId){
        var groupId = 1;
        var differed = $q.defer();
        
        $http.get($rootScope.endPoint + '/api/files/'+groupId+'/boxfiles/' +folderId)
        .success(function(response){
        
          differed.resolve(response);
        })
        .error(function(err){
          differed.reject(err);
        });
        return differed.promise;
    };

       this.getfilesInbins = function () {
        var Id = "Files";
        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/Filesbins/list/' + Id)


            .success(function (response) {
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };

       this.receiveSharedFiles = function(folderId){
         
        var groupId = 1;
        var differed = $q.defer();
        $http.get($rootScope.endPoint + '/api/sharedreceivedf/'+groupId+'/sharedboxfiles/' +folderId)

        .success(function(response){
        
          differed.resolve(response);
        })
        .error(function(err){
          differed.reject(err);
        });
        return differed.promise;
    };

      this.sendSharedboxFiles = function(folderId){
         
        var groupId = 1;
        var differed = $q.defer();
        
        $http.get($rootScope.endPoint + '/api/sharedsend/'+groupId+'/sharedboxfiles/' +folderId)
        .success(function(response){
        
          differed.resolve(response);
        })
        .error(function(err){
          differed.reject(err);
        });
        return differed.promise;
    };
    


    this.getMimeType = function(file_name){
      var promise = $q.defer();
      $http.get($rootScope.endPoint + '/api/files/mimeType/'+ file_name)
      .success(function(response){
          promise.resolve(response);
      })
      .error(function(err){
          promise.reject(err);
      });
      return promise.promise;
    };
    this.downloadFile = function(file_name){

      var promise = $q.defer();
      //hard coded a user StrimUp! need to inject him dyamically
      $http.get($rootScope.endPoint+ '/api/files/download/'+file_name+'/of/'+ 'StrimUp')
      .success(function(response){
        promise.resolve(response);
      })
      .error(function(err){
        promise.reject(err);
      });
      return promise.promise;
    };

        this.countfiles  = function(id){
    var differ = $q.defer();
    $http.get($rootScope.endPoint + '/api/countfiles/' +id)
    .success(function(response){
      differ.resolve(response);
    },function(err){
      differ.reject(err);
    });
    return differ.promise;
  };
    return this;
}]);
