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

    $httpProvider.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4MDIyMWY1OTU4YTU3MDJkMDMzYjZhY2U0MDZmOWExZTIzNTlkYTcwZGE0YzRiZjFiMGUyOWJmY2UxOTIzNjVkZTIwZThiMDRlYWQxMzI3In0.eyJhdWQiOiIxIiwianRpIjoiYTgwMjIxZjU5NThhNTcwMmQwMzNiNmFjZTQwNmY5YTFlMjM1OWRhNzBkYTRjNGJmMWIwZTI5YmZjZTE5MjM2NWRlMjBlOGIwNGVhZDEzMjciLCJpYXQiOjE0NzQzNTU5NDIsIm5iZiI6MTQ3NDM1NTk0MiwiZXhwIjo0NjMwMDI5NTQyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.YXgy9RE9_iX6I6MYvtHvtYUg54d7weM-vXz12QKKuWWKf09QGY-C4TmfMelIQmxSS-8Rb8hn0Wi33EWdlJpSGgrsoJcYtyNIewuCA06py8j5f1M7msAGTBZmYbusNKeRChzuneOuLHXUCjjSJPVS-3I6iTQeS8HyHdnk1i3nyVg885EW37KbLXW8o6-oEeApUAcnV_fSB_eZCKXIeXZh6KCd8U0vz2ggRetb-xhwshqn43WndIEoFWyb5ZwI0j9_HugNEVUjToxif3TIOUtD_Xj1WTnm_GmzQZVFsYEcKpwucgAfkZdduIbfe8QPALhcYMql-I2Zhz_E1rBN48b7vY513WszR6VHqVOFhHN0qhYpoQWFuYzyxsdoSXqltB-_EN_GgOnTjWVzNEEviyAk2WcS3814UZY47G7PnZ1M47IW1BPYSE7sL6qaHNCY6E81mWyG0m1uzrqwM2vjKnSA-XZjTCRC9KLlvqBem5Pjo1AE4shtK2WfYz4nBVLDZVR36knVXMMH5WQHr3OlVZtTUzid0NRwxh0ogsIEiygeoOLXph6u3irgl8n6FwKdmzgH8qC4lasLqreVP3W775h5HBvHJilhgrrRtZ7hov3xfyerl7G6_m4P3CZz-TSitZjatq9Kv6NPm8CE2K7I_jEfIv163_UHHBHfb4E0okEUSok';


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
