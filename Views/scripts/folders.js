angular.module("sync")
    .controller('FolderController', ['$scope', 'Folder', 'User', 'DEBUG', '$stateParams', '$rootScope', 'Files', '$uibModal', '$mdDialog', '$mdMedia', function ($scope, Folder, User, DEBUG, $stateParams, $rootScope, Files, $uibModal, $mdDialog, $mdMedia) {


        $scope.folders = [];
        $scope.s_folder = [];
        $scope.share_enabled = true;
        $scope.paste_enabled = false;

        $scope.type = function (type) {
            var cases = {
                'folder': 'img/sbox-folder.png',
                'zip': 'img/sbox-folder.png'
            };
            if (cases[type]) {
                return cases[type];
            }
        };
        var getuser = function () {
            User.get()
                .then(function (response) {
                    $scope.user_id = response;
                }).catch();
        };
        $scope.callMe = function(){
            console.log("we got a call man");
        }
        $scope.structure = '';
        var getFolders = function () {

            Folder.getFolders($stateParams.folderId)
                .then(function (folders) {
                    var tmp =[];
                    var thead=[];
                    
                    angular.forEach(folders,function(single) {
                        
                        var str = single.name;
                        tmp.push({'mName':str.replace('-','  '),'name':single.name,'id':single.id,'size':single.size,'type':single.type,'created_at':single.created_at,'copy_count':single.copy_count});
                        thead.push([{'mName':str.replace('-','  '),'name':single.name,'id':single.id,'size':single.size,'type':single.type,'created_at':single.created_at,'copy_count':single.copy_count}]);
                       
                    });
                    $scope.folders = tmp;

                    $scope.thead = true;
                    
                    if(thead.length ===0){

                        $scope.thead = false;

                    }
                    
                        

                }, function (err) {
                    if (DEBUG === true)
                        console.log(err);
                });
        };
        var getfolderInbins = function () {

            Folder.getfolderInbins($stateParams.folderId)
                .then(function (folders) {

                    $scope.bins_folders = folders;

                }, function (err) {
                    if (DEBUG === true)
                        console.log(err);
                });
        };

        var sendSharedFolder = function () {

            Folder.sendSharedFolder($stateParams.folderId)
                .then(function (sd_folder) {

                    $scope.sd_folder = sd_folder;

                }, function (err) {
                    if (DEBUG === true)
                        console.log(err);
                });
        };

        var receiveSharedFolder = function () {

            Folder.receiveSharedFolder($stateParams.folderId)
                .then(function (rc_folder) {

                    $scope.rc_folder = rc_folder;

                }, function (err) {
                    if (DEBUG === true)
                        console.log(err);
                });
        };

        $scope.folderrestore = function (files_id) {

            Folder.folderrestore(files_id)

            .then(function (response) {
                if (response.Deletefolder === false) {
                   
                } else {
                    
                    getfolderInbins($stateParams.files_id);
                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };
        $scope.deleteonbins_folders = function (files_id) {

            Folder.deleteonbins_folders(files_id)

            .then(function (response) {
                if (response.Deletefolder === false) {
                    return;
                } else {
                    
                    
                    getfolderInbins($stateParams.files_id);
                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };
        $scope.$on('folder:list', function (event, args) {
            getFolders();

        });

        $scope.$on('sharedsend:list', function (event, args) {

            sendSharedFolder();
        });
        $scope.$on('sharedreceived:list', function (event, args) {
            receiveSharedFolder();
        });
        $scope.$on('binsfolder:list', function (event, args) {
            getfolderInbins();
        });

        $rootScope.$on('folder:structure', 'sharedsend:structure', 'sharedreceived:structure', 'binsfolder:structure', function (r, structure) {

            $scope.structure = structure;

        });

        $scope.showFilesIn = function (folder_id) {
            if (localStorage.getItem("folderId") === null) {
                   
                    localStorage.setItem('folderId', folder_id);
                } else {
                    
                    localStorage.removeItem('folderId');

                    localStorage.setItem('folderId', folder_id);

                }
                
            $rootScope.$emit('folder:id', folder_id);
        };

        $scope.showsendshared = function (folder_id) {
            $rootScope.$emit('sharedsend:id', folder_id);
        };

        $scope.showreceivedshared = function (folder_id) {
            $rootScope.$emit('sharedreceived:id', folder_id);
        };

        $scope.delete_Folder = function (folder_id) {

            Folder.deleteFolders(folder_id)

            .then(function (response) {
                if (response.Deletefolders === false) {
                    $.notify("Folder not deleted.", "error");
                } else {

                    $rootScope.$emit('folder:list');

                    $.notify("Folder saved in recycle bin.", "success");
                    getFolders();
                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };

        $scope.create = function (folder) {

                var creatingFolder = function (params) {
                    Folder.createFolder(params)
                        .then(function (response) {

                            if (response.folderCreated === false) {
                                
                                $.notify("A  Folder Exist", "error");

                            } else {

                                $.notify("A Folder Created", "success");


                            }

                        }, function (err) {

                            if (DEBUG === true)
                                console.log(err);
                        });
                };
                var params = {
                    "parent_folder": $stateParams.folderId,
                    "nested_name": folder,

                };
                creatingFolder(params);
        };


        $scope.renamefolder = function (folder) {

            Folder.renamefolder(folder)

            .then(function (response) {
                if (response.folderchange === false) {
                    $.notify("A  Not renamed", "error");
                } else {

                    $.notify("A Folder renamed", "success");
                    getFolders();
                }
            }, function (err) {

                if (DEBUG === true)
                    console.log(err);
            });
        };

        var init = function () {
            getuser();
            getFolders();
            receiveSharedFolder();
            sendSharedFolder();
            getfolderInbins();
        };
        init();

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
            }
            $scope.getFolderId = function (id) {
                if (localStorage.getItem("file_handle") === null) {
                    localStorage.setItem('file_handle', id);
                } else {
                    localStorage.removeItem('file_handle');
                    localStorage.setItem('file_handle', id);
                }
            };
            $.contextMenu({
                selector: '.context-menu-folder',
                callback: function (key, options) {

                    if (key === "copy")

                        $mdDialog.show({
                        parent: angular.element(document.body),
                        controller: DialogController,
                        templateUrl: '/views/copy-file.tpl.html',
                        clickOutsideToClose: false
                    }).catch();
                    if (key === "delete")

                        Files.delete(localStorage.getItem('file_handle'))
                        .then(function (response) {
                            if (response.status === 200)
                                $rootScope.$emit('file:list');
                            notie.alert(3, 'File deleted!', 2);

                        }).catch();

                },
                items: {
                    "edit": {
                        name: "Edit",
                        icon: "edit"
                    },
                    "cut": {
                        name: "Cut",
                        icon: "cut"
                    },
                    "copy": {
                        name: "Copy",
                        icon: "copy"
                    },
                    "paste": {
                        name: "Paste",
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

            $('.context-menu-folder').on('click', function (e) {
                console.log('clicked', this);
            })
        });


    }]).factory("cacheFactory", function ($cacheFactory) {
       
        return $cacheFactory("userData");

    });