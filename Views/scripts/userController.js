angular.module('sync')
  .controller('userController', ['User', '$scope', '$rootScope', '$interval', function (User, $scope, $rootScope, $interval) {
    $scope.color = "blue";
    $scope.accountObject = {};
    $scope.accountObject.selectedAccounts = [];
    var user = function () {
      User.get()
        .then(function (user) {

          $scope.user = user;

        }).catch();
    };
    var getDiskUsage = function () {
      $scope.ShowDisk = false;
      User.diskUsage()
        .then(function (res) {
          $scope.usageDisk = res;
          var size = res.size;
          var unit = res.unit;

          if (size === 1 && unit === "KB") {
            
            $scope.color = "#0a9bcf";
            $scope.ShowDisk = true;
          } else if (size === 1 && unit === "GB") {
            $scope.color = "orange";
            $scope.ShowDisk = true;
          } else if (size === 2 && unit === "GB") {
            $scope.color = "red";
            $scope.ShowDisk = true;
          } else {
            
            $scope.color = "#0a9bcf"; //blue
            $scope.ShowDisk = true;
          }

        }).catch();
    };
    $scope.report = function (message) {
      User.report(message).then(function (response) {
        if(response.status === 200)
             $.notify("Your Issue is being processed thank you..", "success");
      }, function (e) {

      })
    };
    getDiskUsage();
    user();
    $rootScope.$on('file:uploaded', function () {
      user();
    });
  }]);