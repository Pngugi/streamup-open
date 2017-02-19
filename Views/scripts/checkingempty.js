angular.module("sync")
	.controller('CheckingemptyController', ['$scope', 'Checkingempty', 'User', 'DEBUG', '$stateParams', '$rootScope', '$uibModal', '$mdDialog', '$mdMedia', function ($scope, Checkingempty, User, DEBUG, $stateParams, $rootScope, $uibModal, $mdDialog, $mdMedia) {
		var getuser = function () {
			User.get()
				.then(function (response) {
					$scope.user_id = response;
				}).catch();
		};
		var checkallFolderFile = function () {

			Checkingempty.checkallFolderFile($stateParams.folderId)
				.then(function (folders) {

					$scope.checkalls = folders;


				}, function (err) {
					if (DEBUG === true)
						console.log(err);
				});
		};
		$scope.$on('folder:list', function (event, args) {
			checkallFolderFile();

		});
		var init = function () {
			getuser();
			checkallFolderFile();

		};
		init();

	}]).factory("cacheFactory", function ($cacheFactory) {

		return $cacheFactory("userData");
	});