angular.module('sync').service('Folder', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {


  this.folderrestore =function(id) {
        var differed = $q.defer();
        //down endpoint return all files I own
        $http.get($rootScope.endPoint + '/api/folderrestore/' + id)
            .success(function (response) {
                differed.resolve(response);
            })
            .error(function (error) {
                differed.reject(error);
            });
        return differed.promise;
    };
      this.deleteonbins_folders =function(id) {
        var differed = $q.defer();
        //down endpoint return all files I own
        $http.delete($rootScope.endPoint +'/api/deleteonbins_folders/'+id)
        .success(function(response){
            differed.resolve(response);
        })
        .error(function(error) {
            differed.reject(error);
        });
        return differed.promise;
    };

    this.createFolder = function (name) {

        var promiss = $q.defer();
        $http.post($rootScope.endPoint + '/api/createFolder', name)
            .success(function (response) {
                $rootScope.$broadcast('folder:list');
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };

       this.renamefolder = function (name) {

        var promiss = $q.defer();
        $http.post($rootScope.endPoint + '/api/renamefolder', name)
            .success(function (response) {
                $rootScope.$broadcast('folder:list');
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };


    this.getFolders = function (Foldernames) {

        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/folders/list/' + Foldernames)
            .success(function (response) {
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };

     

this.getfolderInbins = function () {
    var Id = "Folders";
        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/bins/list/' + Id)

.success(function (response) {
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };

     this.sendSharedFolder = function (Foldernames){
        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/sharedsend/list/' + Foldernames)
            .success(function (response) {
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };
       this.receiveSharedFolder = function (Foldernames){
        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/sharedreceived/list/' + Foldernames)
           
                .success(function (response) {
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };

    this.deleteFolders = function (folder_id) {

        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/keepfoldersonbin/' + folder_id)
            .success(function (response) {
                $rootScope.$broadcast('folder:list');
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });


        return promiss.promise;
    };

    

    this.path = function (child_id) {

        var promiss = $q.defer();
        $http.get($rootScope.endPoint + '/api/gmePath/' + child_id)
            .success(function (response) {
               

                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });
        return promiss.promise;
    };

    this.countfolders  = function(id){
    var differ = $q.defer();
    $http.get($rootScope.endPoint + '/api/countfolders/' +id)
    .success(function(response){
      differ.resolve(response);
    },function(err){
      differ.reject(err);
    });
    return differ.promise;
  };
    return this;

}]);