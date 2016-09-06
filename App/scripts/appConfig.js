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

    $httpProvider.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjE1NzI1MWI5MDc0YTNkNjA1NDgxY2RmZTQ3ZjFhNjJkZjg0NTY3MDZkMDc1YjdiYjc2MjRlZmQ2OTZhMDZjOTBjNTdiMTllNWU2Njk4N2ViIn0.eyJhdWQiOiIxIiwianRpIjoiMTU3MjUxYjkwNzRhM2Q2MDU0ODFjZGZlNDdmMWE2MmRmODQ1NjcwNmQwNzViN2JiNzYyNGVmZDY5NmEwNmM5MGM1N2IxOWU1ZTY2OTg3ZWIiLCJpYXQiOjE0NzMxODg1MDEsIm5iZiI6MTQ3MzE4ODUwMSwiZXhwIjo0NjI4ODYyMTAxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.KLJGEWB1RiAu--7tITWS4vlfkNM7FsGBFUe8Ve7fzWx8-S1_s76TXPRDbR8UaocEUsxh1tqFbl0_RIApqK2wR11hDOyt9peuUEXGHDM9qHOC-Dk0nQ5BDo_z4TwaIuzbiHjrf85OBI07qQzeg1Q13JtoMdn7aeCaReiouD1-KMTvpWVY2ibo0u1ZwblDBKIqZ8xfiVOng2SGLKoGnvB0mvhTUytw3RCRVH0qgzyGIe5FDg8aiFgzKiCQeepmnxlyTbmP-qPiKiWzAEeVDAaz2CzSHBc33eg6nL98-iUsHmCnIugTVNHlNomPMZX_falUCG-tDjtMEWQXN0p4pwY6ldLYtPBuxqXuEQPVUKauSPU5BL3AmOKG--ETNnitVXFudMs-ti6YgvvXTX-ch0iy7xcWayNqd5UoqA-9FkKXPv-MBxCF9sJhSnmZwoATLGhryD4KECQ1YvL87iEGVmkLG6OqzdYsDTRPxi_cTg6JppZ7j4jWJdGNzyUULuhut29usN9XTLf1Z_I-4Z2tQj1GEejlPnqkTmXxBTbnNDNeDpRFiKFhJiUpYoQOaZDgKdmdSdHu9AKy5VWnXu2RnZKKVNgpTrrUAOAfh-HTIW7YLxchwJIANFfujYsl8JBh1aTDUPeL4Xi9pR5s8tEiiEmcc4n3HtU3gW-AWWG3R47m8No';


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
