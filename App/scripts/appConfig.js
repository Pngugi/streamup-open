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

    $httpProvider.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlMzU1ZGM4ZTVmYzBhYjkxYjZmNmY5MjBiM2ZkODRjN2QyMDFmNzM0YTE3MDg4NjZmMTdmYjg1MTgyN2U2ZDQ3YWMwMjU5MjA0ZDJmMjcxIn0.eyJhdWQiOiIxIiwianRpIjoiNWUzNTVkYzhlNWZjMGFiOTFiNmY2ZjkyMGIzZmQ4NGM3ZDIwMWY3MzRhMTcwODg2NmYxN2ZiODUxODI3ZTZkNDdhYzAyNTkyMDRkMmYyNzEiLCJpYXQiOjE0NzQzNDk5NjUsIm5iZiI6MTQ3NDM0OTk2NSwiZXhwIjo0NjMwMDIzNTY1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Un6QgauXi3wehntq8lSfrvZ6IECXxScjxzy6bt-Dhf1N_ri_EjaM3wZdBSHkA3UQzacNHolxGieIhRN87WdGepW-4qHUiNCTmkmTbDPRh0_Rqbgp2qumRhpO64SPvUqrIAJ2yfnZfQqKGeBhJb1ZeVAan6FN-0LNHa40zSh6mihpgaAwObpin-0bGFBx0eGgXoMc8Fh8cA445c0cKii6Fodg1IgSHrGmW1Js2982n2e7shKT8iwJEoMEm__5sN4dKeRMFzY5tWK-t-qeP6HgHhE3ZWbqkQjQ3HFilnsbjv4GYI9tz3PQ8TFhRs9F3KQMd2KaNwYZsiDdr0QAIZtGB_imDAYhaxPINdHIqTuXsrVg0K2GYZOIIUxQlt6oBMtKKfKzxmll9l4dqlqo0S0OIWi1yEUzG_0sLqxk2OpmJwNiyFQcxQ3HxgOVkNkPfrxQMFOQ6rNBy2IEA9RxIoCmB9WiQdV0kc3nUSTlraE30KgsgGFJ1ypj2KY-8Pko4iyVG_Gohmt5C2BH-2HSdiUyFD5gtCtcSexN8pVN3CvrnvDqCUsNEmPa-4pPyWaTHod9f0WbkucWowu_nUtOVdbG4BxQPXSNg2sYywTQhHj9tkEeIOJBjMW9ZkJ2HuNZaPWFiEtG8FS8jWwTV8v_JyvcpeDBf5r9DnLmWGwMJqcBesQ';


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
