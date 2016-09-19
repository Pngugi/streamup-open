/* global $window */
/* global Logger */
var mongoose = require('mongoose'),
 bcrypt   = require('bcrypt-nodejs');
 var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});
angular.module('sync')
.controller('loginController',['$scope','$http','$rootScope','$window','User', function ($scope,$http,$rootScope,$window,User) {
    var init = function() {
        
        getData();
    };
    var getData =function(){
        User.getUsername()
        .then(function(user){
            $scope.user = user;
            console.log(user);
        },function(err){
            console.log(err);
        });
    };
    init();
    var options = {
        'crededential-not-found'       : 'Credentials not found!',
        'success'                      : 'logging in...'
    };
  $scope.doLogin = function (info)
  {
      User.getUserId()
      .then(function(response){
          console.log(response);
      },function(err){
          console.log(err);
      });
  }
}]);
