// --Author Muragijimana Richard <beastar457@gmail.com>
$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	options.async = true;
});

// angular.module("sync", ["ngRoute", "angularFileUpload", "ngMaterial", "material.svgAssetsCache", "pascalprecht.translate", "ngSanitize", "pdf", "ui.router", "ui.bootstrap", "ui.select"])
angular.module("sync", ["ui.router", "ui.bootstrap"])
	// .config(['$sceProvider', '$httpProvider', function ($sceProvider, $httpProvider) {
	// 	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	// 	$httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
	// 	$httpProvider.defaults.headers.post.Accept = 'application/json, text/javascript';
	// 	$httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name="csrf-token"]').attr('content');
	// 	$httpProvider.defaults.useXDomain = true;
	// 	$sceProvider.enabled(false);
	// }])
	// .constant('DEBUG', true)
	// .run(['$rootScope', '$log', '$location', '$stateParams', function ($rootScope, $log, $location, $stateParams) {

	// 	$rootScope.endPoint = 'https://streamupbox.com';

	// 	var cashed_folders = [],
	// 		folder_ids = [];
	// 	$rootScope.$on('$locationChangeSuccess', function () {

	// 		if ($rootScope.actualLocation !== undefined) {

	// 			var currentFolderId = $rootScope.actualLocation.replace('/', '');
	// 			if (currentFolderId !== 'Files') {
	// 				$rootScope.$emit('folder:id', currentFolderId);
	// 			}

	// 		}
	// 		$rootScope.actualLocation = $location.path();
	// 	});

	// 	$rootScope.$watch(function () {
	// 		return $location.path();
	// 	}, function (newLocation, oldLocation) {

	// 		if ($rootScope.actualLocation !== newLocation) {
	// 			cashed_folders.push(newLocation);
	// 			folder_ids.push($stateParams.folderId);
	// 		}
	// 		if (newLocation === "/Files") {
	// 			$rootScope.LeftMenuneeded = true;
	// 			cashed_folders = [];
	// 		}
	// 		if ($rootScope.actualLocation === newLocation) {
	// 			var index = cashed_folders.indexOf(oldLocation);
	// 			cashed_folders.pop(index);
	// 			var indexerOfFolder = folder_ids.pop();
	// 			indexerOfFolder = folder_ids.pop();
	// 			$rootScope.$emit('app:on:browser:back', indexerOfFolder);

	// 		}

	// 	});
	// }])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('Home', {
				url: "/Files",
				templateUrl: './main.html',
				controller: 'FilesController'
			});

		$urlRouterProvider.when('/home', '/home').otherwise('/Files');

	}]);

//-----------------------done with Muragijimana Richard <beastar457@gmail.com>---------------//
//-----------------------deal with user's actions and interaction with other users---------------//