// --Author Muragijimana Richard <beastar457@gmail.com>

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  options.async = true;
});
var Logger = angular.module("Logger", [])

.config(['$sceProvider', '$httpProvider', function ($sceProvider, $httpProvider) {
  
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
    // $httpProvider.defaults.headers.common.authorization = 'Bearer WiFBDwFHxWQy2HEK6ZGpXB8cOfkYw4ORnIOVrBMZ';
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    $httpProvider.defaults.useXDomain = true;
    $sceProvider.enabled(false);

  }])
  .run(['$rootScope', function ($rootScope) {

    // $rootScope.endPoint='https://streamupbox.com';
    $rootScope.endPoint = 'http://localhost:8000';


  }])
  .directive('socialite', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/socialite.html',
      link: function (scope, el, attr) {

      }
    };
  }])
  .controller('socialite', ['$rootScope', '$http', function ($rootScope, $http) {
    var googleUser = {};
    var startApp = function () {
      gapi.load('auth2', function () {

        //Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({

          client_id: '543558933111-jem87i5i8aspa247qqgr900a5lfhs6st.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',

        });
        attachSignin(document.getElementById('customBtn'));
      });
    };


    function attachSignin(element) {

      auth2.attachClickHandler(element, {},
        function (googleUser) {
          var params = {
            username: googleUser.getBasicProfile().getName(),
            email: googleUser.getBasicProfile().getEmail(),
            loginType: 'socialite-login'
          }
          $http.post($rootScope.endPoint + '/login', params)
            .success(function (response) {
              console.log(response);
            }).error(function (e) {

            })

          googleUser.getBasicProfile().getEmail();
        },
        function (error) {
          alert(JSON.stringify(error, undefined, 2));
        });
    }


    // startApp();


  }])
.constant('DEBUG', true);
Logger.directive('signup', [function () {
    return {
      restrict: 'AE',
      templateUrl: 'views/signup.html'

    };
  }])
  .directive('login', [function () {
    return {
      restrict: 'AE',
      templateUrl: 'views/login.html'
    };
  }])
  .directive('shortcut', [function () {
    return {
      restrict: 'AE',
      templateUrl: 'views/shortcut.html'
    };
  }]);


angular.module("sync", ["ngRoute", "angularFileUpload", "ngMaterial", "material.svgAssetsCache", "pascalprecht.translate", "ngSanitize", "pdf", "ui.router", "ui.bootstrap", "ui.select"])
  .config(['$sceProvider', '$httpProvider', '$locationProvider', function ($sceProvider, $httpProvider, $locationProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
    $httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
    // $httpProvider.defaults.headers.common.authorization = 'Bearer WiFBDwFHxWQy2HEK6ZGpXB8cOfkYw4ORnIOVrBMZ';
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
    $httpProvider.defaults.useXDomain = true;
    $sceProvider.enabled(false);

    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: true
    // });
    // $locationProvider.html5Mode(true);
 
  }])
  .constant('DEBUG', true)

  .run(['$rootScope', '$log', '$location', '$stateParams', 'User', 'Share','DEBUG', function ($rootScope, $log, $location, $stateParams, User, Share,DEBUG) {
    localStorage.setItem('folderId', 0);
    $rootScope.endPoint = 'http://localhost:8000';
    // $rootScope.endPoint='https://streamupbox.com';

    $rootScope.notificationList = 0;
    User.get()
      .then(function (user) {
        $rootScope.user = user;
        if(DEBUG=== true)
          console.log(user);
      }).catch();

    Share.allssharedFiles()
      .then(function (allfile) {
        $rootScope.countall = allfile;

      }).catch();

    User.notificationList()
      .then(function (counter) {
        $rootScope.notificationList = counter;

      }).catch();

    $rootScope.LeftMenuneeded = true;
    $rootScope.color = 'blue';
    var cashed_folders = [],
    folder_ids = [];
    $rootScope.$on('$locationChangeSuccess', function () {
      
      //start broadcasting current navigated folderId
      if($rootScope.actualLocation !== undefined){

        var currentFolderId = $rootScope.actualLocation.replace('/', '');
        if(currentFolderId !=='Files'){
          $rootScope.$emit('folder:id', currentFolderId);
        }
         
      }
      
      
      $rootScope.actualLocation = $location.path();
        
        
    });

    $rootScope.$watch(function () {
      return $location.path();
    }, function (newLocation, oldLocation) {

      if ($rootScope.actualLocation !== newLocation) {
        cashed_folders.push(newLocation);
        folder_ids.push($stateParams.folderId);
      }
      if (newLocation === "/Files") {
        $rootScope.LeftMenuneeded = true;
        cashed_folders = [];
      }
      if ($rootScope.actualLocation === newLocation) {
        var index = cashed_folders.indexOf(oldLocation);
        cashed_folders.pop(index);
        var indexerOfFolder = folder_ids.pop();
        indexerOfFolder = folder_ids.pop();
        $rootScope.$emit('app:on:browser:back', indexerOfFolder);

      }

    });
  }])
  .filter('propsFilter', function () {
    return function (items, props) {
      var out = [];

      if (angular.isArray(items)) {
        items.forEach(function (item) {
          var itemMatches = false;
          var keys = Object.keys(props);
          for (var i = 0; i < keys.length; i++) {
            var prop = keys[i];
            var text = props[prop].toLowerCase();
            if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
              itemMatches = true;
              break;
            }
          }

          if (itemMatches) {
            out.push(item);
          }
        });
      } else {
        out = items;
      }
      this.enable = function () {
        this.disabled = false;
      };

      this.disable = function () {
        this.disabled = true;
      };

      this.enableSearch = function () {
        this.searchEnabled = true;
      };

      this.disableSearch = function () {
        this.searchEnabled = false;
      };
      this.counter = 0;
      this.onSelectCallback = function (item, model) {
        this.counter++;
        this.eventResult = {
          item: item,
          model: model
        };
      };

      this.removed = function (item, model) {
        this.lastRemoved = {
          item: item,
          model: model
        };
      };

      this.firstLetterGroupFn = function (item) {
        return item.name[0];
      };
      return out;
    };
  })
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('Home', {
        url: "/Files",
        templateUrl: '/views/main.html',
        controller: 'FilesController'
      })
      .state('Settings', {
        url: "/Settings",
        templateUrl: '/views/settings.html'
      })

    .state('Messages', {
      url: "/Messages",
      templateUrl: '/views/message.html',
      controller: 'TweetingWayMessage',
    })

    .state('Upgrade', {
        url: "/Upgrade",
        templateUrl: '/views/upgrade.html',
        controller: 'FilesController'
      })
      .state('preview', {
        url: '/!/:preview/:extension/:of/:user/:folder',
        templateUrl: '/views/filePreview.html',
        controller: 'previewController'

      }).state('bins', {
        url: "/bins/",
        templateUrl: '/views/docs_InBin.html',
        controller: 'FolderController',
        requireLogin: true
      }).state('Filesbins', {
        url: "/bins/",
        templateUrl: '/views/docs_InBin.html',
        controller: 'FilesController',
        requireLogin: true
      })
      .state('sharedreceived', {
        url: '/sharedreceived/{folderName:[a-zA-Z0-9/]*}',
        params: {
          folderId: null,
          VisibleName: null
        },
        templateUrl: '/views/sharedFolders.html',
        controller: 'FolderController'
      })

    .state('sharedsend', {
      url: '/sharedsend/{folderName:[a-zA-Z0-9/]*}',
      params: {
        folderId: null,
        VisibleName: null
      },
      templateUrl: '/views/shared_send_Files.html',
      controller: 'FilesController'
    })


    .state('folder', {

        url: '/{folderId:[a-zA-Z0-9_@./#&+-/]*}',
        params: {
          folderId: null,
          VisibleName: null
        },
        templateUrl: '/views/files.html',
        controller: 'FolderController'
      })
      .state('Groups', {
        url: "/Groups",
        templateUrl: '/views/groups.html',
        controller: 'GroupController',
        requireLogin: true
      });

    $urlRouterProvider.when('/home', '/home').otherwise('/Files');
    
  }])
  //application components
  .directive('files', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/files.html',
      link: function (scope, el, attr) {
        // console.log(el[0].querySelector('#shareBtn_file'));
      }
    };

  }])
  .directive('ngRightClick', ['$parse', function ($parse) {
    return function (scope, element, attrs) {
      var fn = $parse(attrs.ngRightClick);
      element.bind('contextmenu', function (event) {
        scope.$apply(function () {
          event.preventDefault();
          fn(scope, {
            $event: event

          });
        });
      });
    };
  }])
  .directive('folders', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/folders.html',
      link: function (scope, el, iAttrs) {
       
$("tr").not(':first').mouseover(
  function () {
    $(this).css("background","yellow");
    var value=$("input[type=text].selectorid").val();
    var str = 'sharebtns'+value;
       document.getElementById(str).style.display = 'block';
  },
  function () {
    $(this).css("background","");
    var value=$("input[type=text].selectorid").val();
    var str = 'sharebtns'+value;
       document.getElementById(str).style.display = 'none';
  }
);
      }
    };
  }])
  .directive('freceivedShared', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/sharedFiles.html',
      link: function (scope, el, fAttrss) {

      }
    };
  }])

.directive('receivedShared', [function () {
  return {
    restrict: 'E',
    templateUrl: '/views/components/sharedFolders.html',
    link: function (scope, el, fdAttrs) {

    }
  };
}])


.directive('sendfilesShared', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/sendFileshared.html',
      link: function (scope, el, fdAttrs) {

      }
    };
  }])
  .directive('sendShared', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/shared_send_Files.html',
      link: function (scope, el, fdAttrs) {

      }
    };
  }])
  .directive('folderBins', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/folderRcylebin.html',
      link: function (scope, el, RcyfdAttrs) {

      }
    };
  }])
  .directive('filesBins', [function () {
    return {
      restrict: 'E',
      templateUrl: '/views/components/fileRecyclebin.html',
      link: function (scope, el, rcylflsAttrs) {

      }
    };
  }]); 



//-----------------------done with Muragijimana Richard <beastar457@gmail.com>---------------//
//-----------------------deal with user's actions and interaction with other users---------------//