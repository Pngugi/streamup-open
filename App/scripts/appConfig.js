angular.module('sync', ["ui.bootstrap","ui.router"])
.run(['$rootScope',function($rootScope){
      // $rootScope.endPoint='https://streamupbox.com';
      $rootScope.endPoint='http://localhost:8000';
}])
.config(['$sceProvider','$httpProvider',function($sceProvider,$httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript';
    //set authorization  oauth2.0 for protection

    $httpProvider.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY3ZjJhMDhkYWMxM2UwYTY0MDgyNGRjMzM3NWJkNWMwOTliMmZlYjU2YzAwN2Y1YzJmM2NhMDZlYjhkN2M2N2E2N2YwMmVhNDk3MDc3MTIxIn0.eyJhdWQiOiIxIiwianRpIjoiZjdmMmEwOGRhYzEzZTBhNjQwODI0ZGMzMzc1YmQ1YzA5OWIyZmViNTZjMDA3ZjVjMmYzY2EwNmViOGQ3YzY3YTY3ZjAyZWE0OTcwNzcxMjEiLCJpYXQiOjE0NzQ1NzU0MzUsIm5iZiI6MTQ3NDU3NTQzNSwiZXhwIjo0NjMwMjQ5MDM1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.R9dKOr1wrWXFZRD0b-nKdfeLgQ4Fy1jqwFx1jcu5PFwseGvIh0S9DKkT-c_Tm6nZB4e_MlLqergJZKNE98euriaJVwyxZf7jHc3Oqm5WDWZioJVF-woTBuo6WQVrWsjrd5UbolgBwqnZQpFD_iQCDYpGL9_qL8OXD0tk3MbQDvR5AJGk3CadU8XGsLJxzCKRhgoSTy5aD2EcCpwQ9xhiqpDDGHft6-OCjMwg56XxQyy3xu6YQM7VMdsbLS22bWLp0J-SxUzDw9eevpOVUFs8-WqkwjAbK_lGH8cXsk3aJkgpBadJzVc3huYM_GPCbuVIOcnTZxykWWn_j3ef43Pc7WtK_xGw3GSr9bx5MQYIePjBPAUSygbJRWWQaKLf8AC8iYFaoUZplNjBRhW7v2uUOXmAYNxYdY5wlktNmrsT4jQS8ueh6_gLcgQ5tFTKmOrdFeRmO2mSghRGOAGghEY1SCLzikWV_eG6T_u43taQXXnFB2iFha-fC8YwN8Z0O0n50is3krZotkFFlTnzgo252Tukw-c93FcKSK0tf4sPHzVieUgCVdCO268eGMp7gP1DiE_melhmoFlGIHI9Eiv3OR9Yt1g3MnE-8AAxapT1FcOiQjQ4S-DbycnQNWbbva4seRgrZGzL-2Xy-P4PVZLg1v2GF0wmGnJdiatrIqOUENo';


    $httpProvider.defaults.useXDomain = true;
    $sceProvider.enabled(false);

    // cfpLoadingBarProvider.includeBar = false;
}])
.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider,$scope){
    $stateProvider
    .state('Home', {
      url: "/Login",
      templateUrl: 'login.html',
      controller: 'loginController',
    })
    .state('EmailConfirmation', {
      url: "/EmailConfirmation",
      templateUrl: 'emailConfirmation.html',
      controller: 'EmailConfirmation',
    })
    .state('SignUp', {
      url: "/signup",
      templateUrl: 'signup.html',
      controller: 'RegisterController',
    });
    $urlRouterProvider.otherwise('/Login');
}]);
