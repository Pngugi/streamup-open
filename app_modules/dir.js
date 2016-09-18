var fs = require('fs');
var path = require('path');

function mkdir(dir) {
        var os = require('os'),
        // userInfo = require('user-info');
         newDir =os.homedir() +'/'+dir;
        fs.exists(newDir,function (params,status) {
        if(status !== true){
            fs.mkdir(newDir,function(_,t){});
            fs.chmod(newDir, '777',function(_,t){
                    
                });
                
            }else{
                fs.chmod(newDir, '777',function(_,t){


                });
            };
            
        });
    return true;    
};
module.exports = {
    mkdir: mkdir
};
