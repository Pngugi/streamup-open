angular.module('sync').
service('Encrypter', ['$http', '$q', '$rootScope', function Encrypter($http, $q, $rootScope) {
    this.key = function (key) {

        var promiss = $q.defer();
        $http.post($rootScope.endPoint + '/encrypt', key)
            .success(function (response) {
                $rootScope.$broadcast('folder:list');
                promiss.resolve(response);
            })
            .error(function (error) {
                promiss.reject(error);
            });

        return promiss.promise;
    };
}]);