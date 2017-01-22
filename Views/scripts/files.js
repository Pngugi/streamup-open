angular.module('sync').controller('FilesController', ['$scope', 'Files', '$log', '$window', 'User', '$timeout', '$stateParams', '$rootScope', '$exceptionHandler', '$cacheFactory', 'DEBUG', '$uibModal', '$mdDialog', '$mdMedia',
    function ($scope, Files, $log, $window, User, $timeout, $stateParams, $rootScope, $exceptionHandler, $cacheFactory, DEBUG, $uibModal, $mdDialog, $mdMedia) {
        $scope.files = [];
    
        var _loadFiles = function (folderId) {
                
                $scope.dataLoading = true;
                Files.getBoxFiles(folderId)
                    .then(function (res) {
                        
                        $scope.files = res;
                        
                    }, function (error) {

                    })
                    .finally(function () {

                        $scope.dataLoading = false;

                    });

            },
            _loadreceivedFiles = function (folderId) {

                $scope.dataLoading = true;
                Files.receiveSharedFiles(folderId)
                    .then(function (res) {
                        $scope.sharedfiles = res;
                    }, function (error) {

                    })
                    .finally(function () {

                        $scope.dataLoading = false;
                    });
            },
            _sendSharedboxFiles = function (folderId) {

            $scope.dataLoading = true;
            Files.sendSharedboxFiles(folderId)
                .then(function (res) {
                    $scope.sendfiles = res;
                }, function (error) {

                })
                .finally(function () {

                    $scope.dataLoading = false;
                });
            },
            _getfilesInbins = function (folderId) {

            $scope.dataLoading = true;
            Files.getfilesInbins(folderId)
                .then(function (res) {
                    $scope.bins_files = res;
                }, function (err) {

                    if (DEBUG === true)
                        console.log(err);
                });
            };
            $scope.filerestore = function (files_id) {

            Files.filerestore(files_id)

            .then(function (response) {
                if (response.Deletefolder === false) {
                    notie.alert(3, 'Not Restored!', 2);
                } else {

                    $.notify("File Restored.", "success");

                    _getfilesInbins($stateParams.files_id);

                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };
        $scope.deleteonbins_files = function (files_id) {

            Files.deleteonbins_files(files_id)

            .then(function (response) {
                if (response.Deletefolder === false) {
                    notie.alert(3, 'Not Deleted!', 2);
                } else {

                    $.notify("File Deleted.", "error");

                    _getfilesInbins($stateParams.files_id);

                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };

        $rootScope.$on('app:on:browser:back', function (e, id) {

        });
        $rootScope.$on('folder:id', function (r, folderId) {

            if (typeof (folderId) === 'number') {

                _loadFiles(folderId);
                _loadreceivedFiles(folderId);
                _sendSharedboxFiles($stateParams.folderId);
            }

        });

        $rootScope.$on('file:list', function () {
            _loadFiles($stateParams.folderId);

            _loadreceivedFiles($stateParams.folderId);

            _getfilesInbins($stateParams.folderId);

            _sendSharedboxFiles($stateParams.folderId);

        });

        $scope.fileType = function (type) {
            var cases = {
                'pdf': 'img/pdf.png',
                'png': 'images/icon5.png',
                'jpg': 'images/icon5.png',
                'docx': 'img/word.png',
                'Jpg': 'img/icon5.png'
            };
            if (cases[type]) {
                return cases[type];

            } else {
                return cases.docx;
            }
        };
        $scope.init = function () {
            _loadFiles($stateParams.folderId);
            _loadreceivedFiles($stateParams.folderId);
            _getfilesInbins($stateParams.folderId);
            _sendSharedboxFiles($stateParams.folderId);

        };

        function prepare(url) {
            localStorage.removeItem("folderId");
            localStorage.setItem("folderId",0);
            return;
        }

        function success(url) {
            //clear any localStorage Id that is being sent before
            localStorage.removeItem("folderId");
            localStorage.setItem("folderId",0);
            return;
            // $rootScope.$broadcast('dialogs.wait.complete');
        }

        function error(response, url) {
            return;
        }

        $scope.init();

        $scope.pasteFileInFolder = function (id) {

            Files.fileCopy(localStorage.getItem('file_handle'), id)
                .then(function (response) {
                    if (response.status === 200) {
                        $rootScope.$emit("file:list");
                        $.notify("A File copied into Folder", "success");
                    } else if (response.status === 300) {
                        $.notify('A file Exist in Folder', "error");
                    }

                }).catch();

        };
        $(function () {

            $scope.share_enabled = false;
            $scope.paste_enabled = true;

            function DialogController($scope, $mdDialog) {
                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.fileId = localStorage.getItem("file_handle");
            }
            $scope.onRightClick = function (id,userId,folderId) {

                if (localStorage.getItem("file_handle") === null &&  localStorage.getItem("userId") === null  && localStorage.getItem("folderId") === null || localStorage.getItem("folderId") !==0 ) {
                    localStorage.setItem('file_handle', id);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('folderId', localStorage.getItem("folderId"));
                } else {
                    localStorage.removeItem('file_handle');

                    localStorage.setItem('file_handle', id);

                    localStorage.removeItem('userId');

                    localStorage.setItem('userId', userId);

                    localStorage.removeItem('folderId');

                    localStorage.setItem('folderId', folderId);
                }
            };
            $.contextMenu({
                selector: '.context-menu-file',
                callback: function (key, options) {


                    if (key === "copy")

                        $mdDialog.show({

                        parent: angular.element(document.body),

                        controller: DialogController,

                        templateUrl: '/views/copy-file.tpl.html',

                        clickOutsideToClose: false

                    }).catch();
                    if (key === "download") {
                         
                        $.fileDownload($rootScope.endPoint + '/downloads/file/' +localStorage.getItem("file_handle") + '/' +localStorage.getItem("folderId")+'/'+null+'/' + localStorage.getItem("userId"), {

                            prepareCallback: prepare,

                            successCallback: success,
                            
                            failCallback: error
                        });

                    }
                    if(key === "public"){

                         $mdDialog.show({

                            parent: angular.element(document.body),

                            controller: DialogController,

                            templateUrl: '/views/public-file.tpl.html',

                            clickOutsideToClose: false

                        }).catch();
                    }
                    if(key === "downloadZip"){

                         $.fileDownload($rootScope.endPoint + '/downloads/file/' +localStorage.getItem("file_handle") + '/' +localStorage.getItem("folderId")+'/'+null+'/' + localStorage.getItem("userId")+'/zip', {

                            prepareCallback: prepare,

                            successCallback: success,
                            
                            failCallback: error
                        });
                    }
                    if (key === "delete")

                        Files.delete(localStorage.getItem('file_handle'))
                        .then(function (response) {
                            if (response.status === 200)
                                $rootScope.$emit('file:list');

                            $.notify("A File saved in Recycle Bin.", "success");
                        }).catch();

                },
                items: {
                    "edit": {
                        name: "Edit",
                        icon: "edit"
                    },
                    "cut": {
                        name: "Move",
                        icon: "cut"
                    },
                    "copy": {
                        name: "Copy",
                        icon: "copy"
                    },
                    "download": {
                        name: "download",
                        icon: "fa-cloud-download"
                    },
                    "downloadZip": {
                        name: "downloadZip",
                        icon: "fa-cloud-download"
                    },
                    "public": {
                        name: "make file public",
                        icon: "paste"
                    },
                    "delete": {
                        name: "Delete",
                        icon: "delete"
                    },
                    "sep1": "---------",
                    "quit": {
                        name: "Quit",
                        icon: function () {
                            return 'context-menu-icon context-menu-icon-quit';
                        }
                    }
                }
            });

            $('.context-menu-file').on('click', function (e) {
                console.log('clicked', this);
            })
        });
    }
]);