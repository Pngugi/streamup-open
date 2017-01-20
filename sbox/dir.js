// var fs = require('fs');
"use strict";
// function mkdir(dir) {
//         var os = require('os'),
//          newDir =os.homedir() +'/'+dir;
//         fs.exists(newDir,function (params,status) {
//         if(status !== true){
//             fs.mkdir(newDir,function(_,t){});
//             fs.chmod(newDir, '777',function(_,t){
//                 });
//             }else{
//                 fs.chmod(newDir, '777',function(_,t){
//                 });
//             }
//         });
//     return true;    
// }
// module.exports = {
//     mkdir: mkdir
// };
var os = require('os');
var fs = require('fs');
var Mkdir = (function () {
    function Mkdir(dir) {
        this.dir = dir;
    }
    Mkdir.prototype.create = function () {
        var newDir = os.homedir() + '/' + this.dir;
        fs.exists(newDir, function (params, status) {
            if (status !== true) {
                fs.mkdir(newDir, function (_, t) { });
                fs.chmod(newDir, '777', function (_, t) {
                });
            }
            else {
                fs.chmod(newDir, '777', function (_, t) {
                });
            }
        });
        return true;
    };
    return Mkdir;
}());
exports.Mkdir = Mkdir;
//# sourceMappingURL=dir.js.map