 var os = require('os'),
 fs     = require('fs'),
 
//  notification = require('./notifier'),
 osAppPath;
function track() {
    //get user dir to track
    osAppPath = os.homedir() +'/Sbox';
        
        /**Algorithm: use sftp to upload a file on server based on user path read from config json file that is created after user signup or sign "ion-android-checkbox-outline icon"; 
         * if no connection add added file into queue json file that is modified after a file is synced online
         * 1) detected if we have a connection 
         * 2) add a file to queue json file for syncing when network is available
         * 3) modify queue json file after uploading to server
        */

       
        // require('chokidar').watch(osAppPath, {ignored: /[\/\\]\./}).on('all', function(event, path) {
        //     if(event === "unlink"){
        //         console.log('removed a file')
        //         // notification.send('removed files');
        //     }else if(event === "add"){
        //         console.log('added a file');
        //         //  notification.send('added new file');
        //     }else if(event ==="change"){
        //         console.log('changed a file');
        //         //  notification.send('changes');

        //     }
        //     // console.log(event, path);
        // });
  
    

};
module.exports ={
    track: track
};