angular.module('sync')
.controller('RegisterController', ['$scope','$rootScope','$http',function ($scope,$rootScope,$http) {
    var options = {
        'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
        'btn-success': '<i class="fa fa-check"></i>',
        'btn-error': '<i class="fa fa-remove"></i>',
        'msg-success': 'All Good! Redirecting...',
        'msg-username-available': 'good username available!',
        'msg-username-taken'    : 'oops username taken',
        'msg-email-taken'       : 'email taken',
        'msg-email-available'   : 'email available',
        'msg-your-phone-suck'   : 'your phone is not valid',
        'useAJAX': true,
    };

    $scope.doSignUp=function(user){
      $('.register-form-main-message').addClass('show success').html(options['SignUpInProgress']);
        if(jQuery('#password').val() !== jQuery('#password-confirm').val()){
          $('.register-form-main-message').addClass('show error').html(options['password-notMatch']);
          setTimeout(messageRemove, 3000);
          function messageRemove(){
              jQuery('.register-form-main-message').removeClass('show error');
          }
          return;
        };
        var username=$('#username').val();
        var email=$('#email').val();
        var params ={
            name:username,
            email:email,
            phone:'',
            password:user.password
        };
        
        $http.post($rootScope.endPoint + '/api/register', params)
        .success(function(data) {
            
            if(data.status === 200){
                
            }else if(data.status ===500){
                
            };
        }).error(function(e) {
            console.log(e);
        });
        function Redirecting(){
            window.location = '#EmailConfirmation';
        };
    };
}]);
angular.module('sync').factory('isUsernameAvailable', ['$q','$http','$rootScope',function($q, $http,$rootScope) {
    var options = {
        'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
        'msg-username-available':'User name available',
        'msg-username-taken':'User name taken',
        'useAJAX': true,
    };
    return function(username) {
        var deferred = $q.defer();
        $http.get($rootScope.endPoint + '/api/users?username=' + username + '&access_token=').success(function(data){
            if(data === 'available'){
                jQuery('.register-form-main-message').addClass('show success').html(options['msg-username-available']);
                setTimeout(messageRemove, 3000);
                function messageRemove(){
                    jQuery('.register-form-main-message').removeClass('show success');
                }
            }else if(data === 'taken'){
                jQuery('.register-form-main-message').addClass('show error').html(options['msg-username-taken']);
                setTimeout(usernameTaken, 3000);
                function usernameTaken(){
                    jQuery('.register-form-main-message').removeClass('show error');
                };
            };
            deferred.reject();
        }).error(function(err) {
           deferred.resolve();
        });
        return deferred.promise;
    };
}]);
angular.module('sync').directive('uniqueEmail', ['isEmailAvailable',function(isEmailAvailable) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.uniqueEmail = isEmailAvailable;
        }
    };
}]);
angular.module('sync').directive('uniqueUsername', ['isUsernameAvailable',function(isUsernameAvailable) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.uniqueUsername = isUsernameAvailable;
        }
    };
}]);
angular.module('sync').factory('isEmailAvailable', ['$q','$http','$rootScope',function ($q, $http, $rootScope) {
    var options = {
        'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
        'btn-success': '<i class="fa fa-check"></i>',
        'btn-error': '<i class="fa fa-remove"></i>',
        'msg-success': 'All Good! Redirecting...',
        'msg-username-available': 'good username available!',
        'msg-username-taken'    : 'oops username taken',
        'msg-email-taken'       : 'email taken',
        'msg-email-available'   : 'email available',
        'msg-your-phone-suck'   : 'your phone is not valid',
        'useAJAX': true,
    };

    return function(email) {
         var deferred = $q.defer();
         //access token left empty because it is defined in appConfig headers!
        $http.get($rootScope.endPoint + '/api/users?email=' + email + '&access_token=').success(function(data){

            if(data==='email-available'){
                jQuery('.register-form-main-message').addClass('show success').html(options['msg-email-available']);
                setTimeout(messageRemove, 3000);
                function messageRemove(){
                    jQuery('.register-form-main-message').removeClass('show success');
                };

            }else if(data==='email-taken'){
                jQuery('.register-form-main-message').addClass('show error').html(options['msg-email-taken']);
                setTimeout(messageEmailTaken, 3000);
                function messageEmailTaken(){
                    jQuery('.register-form-main-message').removeClass('show error');
                };
            };
             deferred.reject();
         }).error(function() {
            deferred.resolve();
         });
         return deferred.promise;
    };
}]);
