angular.module('sync')
	.controller('dialogController', ['$scope', '$uibModal', '$mdDialog', '$mdMedia', 'User', '$rootScope', 'Files', 'Folder', '$http', 'Encrypter',
		function ($scope, $uibModal, $mdDialog, $mdMedia, User, $rootScope, Files, Folder, $http, Encrypter) {


			function DialogController($scope, $mdDialog) {

				$scope.hide = function () {
					$mdDialog.hide();
				};
				$scope.cancel = function () {
					$mdDialog.cancel();
				};

			}
			$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
			$scope.settings = function (id, type) {
				$rootScope.id = id;
				$rootScope.type = type;
				$mdDialog.show({
					parent: angular.element(document.body),
					controller: DialogController,
					templateUrl: '/views/settings.tpl.html',
					clickOutsideToClose: false
				}).catch();

			};
			$("#neutral").click(function (e) {
				e.preventDefault();
				
			});
			$("#connect").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$("#bugReport").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$("#likes").click(function (e) {

				e.preventDefault();
				e.stopPropagation();

			});
			$("#upload").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$("#properties").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$("#Deletedocs").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});
			$("#Renamedocs").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

			$("#downloadpop").click(function (e) {
				e.preventDefault();
				e.stopPropagation();
			});

			$scope.upload = function (type) {
				//make a type to be accessible on child scope do not delete it!
				$rootScope.fileType = type;
				$mdDialog.show({
					parent: angular.element(document.body),
					controller: DialogController,
					templateUrl: '/views/upload.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

			$scope.properties = function (fid, fname, fsize, ftype, fcreated_at) {


				function propertiesController($scope, $mdDialog) {

					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.fid = fid;
					$scope.fname = fname;
					$scope.fsize = fsize;
					$scope.ftype = ftype;
					$scope.fcreated_at = fcreated_at;


					Folder.countfolders($scope.fid)
						.then(function (nuber_folder) {

							$scope.nuber_folder = nuber_folder;

						}, function (err) {
							if (DEBUG === true)
								console.log(err);
						});

					Files.countfiles($scope.fid)
						.then(function (nuber_files) {

							$scope.nuber_files = nuber_files;

						}, function (err) {
							if (DEBUG === true)
								console.log(err);
						});



				}



				$mdDialog.show({

					parent: angular.element(document.body),
					controller: propertiesController,
					templateUrl: '/views/property.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};
			$scope.downloadpop = function () {


				$mdDialog.show({

					parent: angular.element(document.body),
					controller: DialogController,
					templateUrl: '/views/download.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

			$scope.Deletedocs = function (dir_id, dir_name) {

				function deleteController($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.dir_id = dir_id;
					$scope.dir_name = dir_name;
				}
				$mdDialog.show({

					parent: angular.element(document.body),
					controller: deleteController,
					templateUrl: '/views/deletemsg.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

			$scope.Renamedocs = function (dir_id, dir_name) {

				function renameController($scope, $mdDialog) {
					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};
					$scope.dir_id = dir_id;
					$scope.dir_name = dir_name;
				}
				$mdDialog.show({
					parent: angular.element(document.body),
					controller: renameController,
					templateUrl: '/views/rename.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

			$scope.reportBug = function () {

				$mdDialog.show({
					parent: angular.element(document.body),
					controller: DialogController,
					templateUrl: '/views/bug.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

			$scope.share = function (shareble_id, type) {


				function sharebleLink($scope, $mdDialog) {

					$scope.hide = function () {
						$mdDialog.hide();
					};
					$scope.cancel = function () {
						$mdDialog.cancel();
					};

					User.followerEmails()
						.then(function (emails) {
							var emailsi = [];
							angular.forEach(emails, function (email) {
								emailsi.push(email.email);
							});
							$scope.emailson = JSON.stringify(emailsi);

						}).catch();


					$scope.Newshared = {};

					$scope.Newshared.shared_to = [];

					User.get()
						.then(function (user) {

							$scope.userName = user.name;
						}).catch();


					$scope.share_type = type;

					$scope.folder_id = shareble_id;


					if (type === 'Folder') {
						var params = {
							'folder_id': shareble_id,
							'type': 'Folder',
							'user_id': $rootScope.user.id
						};
						Encrypter.key(params)
							.then(function (preparedUrl) {

								var prep = $rootScope.endPoint + '/home/' + preparedUrl;
								$http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDSn7z7V1f6H3yXrgAlgVGw52dSEmqALIc', {
									longUrl: prep
								}).success(function (data, status, headers, config) {

									$scope.shareble_link = data.id;
									var a = document.getElementById("document_link");
									a.value = data.id;

									$scope.shareble_link = data.id;


								}).
								error(function (data, status, headers, config) {

								});
							}).catch();
					} else if (type === "File") {

						var params_file = {
							'file_id': shareble_id,
							'type': 'File',
							'user_id': $rootScope.user.id
						};
						Encrypter.key(params_file)
							.then(function (preparedUrl) {
								console.log(preparedUrl);
								var prep = $rootScope.endPoint + '/shared/' + preparedUrl;
								$http.post('https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDSn7z7V1f6H3yXrgAlgVGw52dSEmqALIc', {
									longUrl: prep
								}).success(function (data, status, headers, config) {

									$scope.shareble_link = data.id;
									var a = document.getElementById("document_link");
									a.value = data.id;

									$scope.shareble_link = data.id;


								}).
								error(function (data, status, headers, config) {

								});
							}).catch();

					}

				}

				$mdDialog.show({
					parent: angular.element(document.body),
					controller: sharebleLink,
					templateUrl: '/views/share.tpl.html',
					clickOutsideToClose: false
				}).catch();
			};

		}
	]);