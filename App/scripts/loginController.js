// var mongoose = require('mongoose'),
//  bcrypt   = require('bcrypt-nodejs'),
//  MongoClient = require('mongodb').MongoClient,
//  assert = require('assert');
// var url = 'mongodb://localhost:27017/sbox';
// // Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   db.close();
// });

//  var userSchema = mongoose.Schema({

//     local            : {
//         email        : String,
//         password     : String,
//     },
//     facebook         : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     },
//     twitter          : {
//         id           : String,
//         token        : String,
//         displayName  : String,
//         username     : String
//     },
//     google           : {
//         id           : String,
//         token        : String,
//         email        : String,
//         name         : String
//     }

// });
// angular.module('sync')
// .controller('loginController',['$scope','$http','$rootScope','$window','User', function ($scope,$http,$rootScope,$window,User) {
//     var init = function() {
        
//         getData();
//     };
//     var getData =function(){
//         User.getUsername()
//         .then(function(user){
           
//             var insertDocuments = function(db, callback) {
//                 // Get the documents collection
//                 var collection = db.collection('documents');
//                 // Insert some documents
//                 collection.insertMany([
//                     {credentials : user.name}
//                 ], function(err, result) {
//                     assert.equal(err, null);
//                     assert.equal(1, result.result.n);
//                     console.log("Inserted 1 documents into the collection");
//                     callback(result);
//                 });
//             }
//             // $scope.user = user;
            
//         },function(err){
//             console.log(err);
//         });
//     };
//     init();
//     var options = {
//         'crededential-not-found'       : 'Credentials not found!',
//         'success'                      : 'logging in...'
//     };
//   $scope.doLogin = function (info)
//   {
//       User.getUserId()
//       .then(function(response){
//         //   console.log(response);
        
//       },function(err){
//           console.log(err);
//       });
//   }
// }]);


angular.module('sync').controller('loginController', ['$scope', '$http', '$rootScope', '$window', function ($scope, $http, $rootScope, $window) {
    var options = {
        'crededential-not-found': 'Credentials not found!',
        'success': 'logging in...'
    };
    $scope.doLogin = function (info) {
        
         var options = {
            'Login-Success': 'We are redirecting you..',
            'SignUpInProgress' : 'Wait we are setting up your account.'
        };
        function messageRemove(){
                $('.register-form-main-message').removeClass('show error');
        }
        
        
        $http.post($rootScope.endPoint + '/api/login', info)
            .success(function (response) {

                console.log(response);

                $('.login-form-main-message').addClass('show error').html(options['Login-Success']);
                setTimeout(messageRemove, 2000);
               
            })
            .error(function (error) {
                console.log(error);
            });

    };
}]);
