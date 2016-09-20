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
        }).auth(null, null, true, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlMzU1ZGM4ZTVmYzBhYjkxYjZmNmY5MjBiM2ZkODRjN2QyMDFmNzM0YTE3MDg4NjZmMTdmYjg1MTgyN2U2ZDQ3YWMwMjU5MjA0ZDJmMjcxIn0.eyJhdWQiOiIxIiwianRpIjoiNWUzNTVkYzhlNWZjMGFiOTFiNmY2ZjkyMGIzZmQ4NGM3ZDIwMWY3MzRhMTcwODg2NmYxN2ZiODUxODI3ZTZkNDdhYzAyNTkyMDRkMmYyNzEiLCJpYXQiOjE0NzQzNDk5NjUsIm5iZiI6MTQ3NDM0OTk2NSwiZXhwIjo0NjMwMDIzNTY1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.Un6QgauXi3wehntq8lSfrvZ6IECXxScjxzy6bt-Dhf1N_ri_EjaM3wZdBSHkA3UQzacNHolxGieIhRN87WdGepW-4qHUiNCTmkmTbDPRh0_Rqbgp2qumRhpO64SPvUqrIAJ2yfnZfQqKGeBhJb1ZeVAan6FN-0LNHa40zSh6mihpgaAwObpin-0bGFBx0eGgXoMc8Fh8cA445c0cKii6Fodg1IgSHrGmW1Js2982n2e7shKT8iwJEoMEm__5sN4dKeRMFzY5tWK-t-qeP6HgHhE3ZWbqkQjQ3HFilnsbjv4GYI9tz3PQ8TFhRs9F3KQMd2KaNwYZsiDdr0QAIZtGB_imDAYhaxPINdHIqTuXsrVg0K2GYZOIIUxQlt6oBMtKKfKzxmll9l4dqlqo0S0OIWi1yEUzG_0sLqxk2OpmJwNiyFQcxQ3HxgOVkNkPfrxQMFOQ6rNBy2IEA9RxIoCmB9WiQdV0kc3nUSTlraE30KgsgGFJ1ypj2KY-8Pko4iyVG_Gohmt5C2BH-2HSdiUyFD5gtCtcSexN8pVN3CvrnvDqCUsNEmPa-4pPyWaTHod9f0WbkucWowu_nUtOVdbG4BxQPXSNg2sYywTQhHj9tkEeIOJBjMW9ZkJ2HuNZaPWFiEtG8FS8jWwTV8v_JyvcpeDBf5r9DnLmWGwMJqcBesQ');

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