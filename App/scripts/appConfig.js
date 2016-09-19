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

    $httpProvider.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyMDEyNjRhZmI0NTdmMjg4YjkyYTgzNzBjYjUxOWM4ZjlkMGY1N2YxMTc4OWQ3NzkyMDk5OWM4Mzc0MTk0NGY1ZDNhYTZlZTk4ODNkM2M2In0.eyJhdWQiOiI0IiwianRpIjoiNTIwMTI2NGFmYjQ1N2YyODhiOTJhODM3MGNiNTE5YzhmOWQwZjU3ZjExNzg5ZDc3OTIwOTk5YzgzNzQxOTQ0ZjVkM2FhNmVlOTg4M2QzYzYiLCJpYXQiOjE0NzQyNzc3MjgsIm5iZiI6MTQ3NDI3NzcyOCwiZXhwIjo0NjI5OTUxMzI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.h1f2tviCUfRsrdyHDJAzcU2B2iHhre5TidVXr68yfonDduLTpqktuVcBc58Tc4M0W0ChIH795jlUYY5CpwbOWAD8zRwrIJ6Sc2qfqcJRRiKf7k19xbJwSHLO4tod1Pd0qcirkLF7WlX9xrWDVsTVV4s1DYI_cstVFNWCWgsqhpdfTuBMNSOtiq5XCO7agfAfygBIQqJda3pz15eowRMRH6Y77i4JopKII-c4L7drn9jEyGFC6hEivlNMLU_0jZH1pP9lDBJg7YxhG31gWBeYelMk6u16OsOHn2FskI9DUeK6Hnf84uiWxKsqG0VmMrc_p_f-uQwKht8zoQ1NCg9e26iNHIO3LTXgFHtylISAHjCH23twm7QnIHxNzJhY7tj12pcJt_FBat9-kd4FsN-Afj13aU3SFXrb-mr-ODx8vc8hyK3VEI53Z3B3EScqDuPJqY_SfVGl0RkaFReQhQS-bLP9x3LE4tb-yHLzUi-_AVfnN99NJ_j7PSqRYZhTwEDXriBrWu12wlrvW045OSP0Yi91t9-cnPUx633ExsafDGwPskO_iZK9Nm_bnFc2MnPDVAwdlhy9LfAPBDrOwalA60QMsE92JZwvKsbENMeQOBYDLHwZTjApQUSZKbNNJpQsB_oPe-H15ZmemALA0jg7JZqGD_AgYaDUP-uVjQs63nA';


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
