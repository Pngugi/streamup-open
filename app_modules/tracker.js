var os = require('os'),
fs     = require('fs'),
mongoose = require('mongoose'),
chokidar = require('chokidar'),
request    =   require('request'),
url        =   'http://localhost:8000/api/upload',
osAppPath;

mongoose.connect('mongodb://localhost:27017/test');

function track() {
    //get user dir to track
    osAppPath = os.homedir() +'/Sbox';
    request('https://streamupbox.com', function (error, response, body) {
        if (!error && response.statusCode === 200) {
                // console.log(body) // Show the HTML for the Google homepage.
        }else{
            // console.log(error);
        }
    });
    // sftp.upload(options, osAppPath, osAppPath);
    /**Algorithm: use sftp to upload a file on server based on user path read from config json file that is created after user signup or sign "ion-android-checkbox-outline icon"; 
     * if no connection add added file into queue json file that is modified after a file is synced online
     * 1) detected if we have a connection 
     * 2) add a file to queue kue file for syncing when network is available
     * 3) modify queue kue file after uploading to server
    */ 
    function makeSboxRequest(){

        require('dns').resolve('https://streamupbox.com', function(err) {
        if (err) {
                //if fine being added with no connection please add it to queue
                console.log("No connection");
            } else {
                console.log("Connected We have connection");
            }
        });
   
        var formData = {
            authorized_app:'true', 
            folderId:'undefined',
            file: fs.createReadStream(osAppPath + '/myfile.txt'),
        };
        request.post({url:url, formData: formData}, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
            // console.log('Upload successful!  Server responded with:', body);
        }).auth(null, null, true, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4MDIyMWY1OTU4YTU3MDJkMDMzYjZhY2U0MDZmOWExZTIzNTlkYTcwZGE0YzRiZjFiMGUyOWJmY2UxOTIzNjVkZTIwZThiMDRlYWQxMzI3In0.eyJhdWQiOiIxIiwianRpIjoiYTgwMjIxZjU5NThhNTcwMmQwMzNiNmFjZTQwNmY5YTFlMjM1OWRhNzBkYTRjNGJmMWIwZTI5YmZjZTE5MjM2NWRlMjBlOGIwNGVhZDEzMjciLCJpYXQiOjE0NzQzNTU5NDIsIm5iZiI6MTQ3NDM1NTk0MiwiZXhwIjo0NjMwMDI5NTQyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.YXgy9RE9_iX6I6MYvtHvtYUg54d7weM-vXz12QKKuWWKf09QGY-C4TmfMelIQmxSS-8Rb8hn0Wi33EWdlJpSGgrsoJcYtyNIewuCA06py8j5f1M7msAGTBZmYbusNKeRChzuneOuLHXUCjjSJPVS-3I6iTQeS8HyHdnk1i3nyVg885EW37KbLXW8o6-oEeApUAcnV_fSB_eZCKXIeXZh6KCd8U0vz2ggRetb-xhwshqn43WndIEoFWyb5ZwI0j9_HugNEVUjToxif3TIOUtD_Xj1WTnm_GmzQZVFsYEcKpwucgAfkZdduIbfe8QPALhcYMql-I2Zhz_E1rBN48b7vY513WszR6VHqVOFhHN0qhYpoQWFuYzyxsdoSXqltB-_EN_GgOnTjWVzNEEviyAk2WcS3814UZY47G7PnZ1M47IW1BPYSE7sL6qaHNCY6E81mWyG0m1uzrqwM2vjKnSA-XZjTCRC9KLlvqBem5Pjo1AE4shtK2WfYz4nBVLDZVR36knVXMMH5WQHr3OlVZtTUzid0NRwxh0ogsIEiygeoOLXph6u3irgl8n6FwKdmzgH8qC4lasLqreVP3W775h5HBvHJilhgrrRtZ7hov3xfyerl7G6_m4P3CZz-TSitZjatq9Kv6NPm8CE2K7I_jEfIv163_UHHBHfb4E0okEUSok');

        // try {
        //     chokidar.watch(osAppPath, {ignored: /[\/\\]\./}).on('all', function(event, path) {
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
        // } catch (e) {
        //     console.log(e);
        // }
    };
    // setInterval(makeSboxRequest,500);
};
module.exports ={
    track: track
};