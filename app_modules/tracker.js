 var os = require('os'),
 fs     = require('fs'),
  mongoose = require('mongoose'),

  request    =   require('request'),
  url        =   'http://localhost:8000/api/upload',
 
//  notification = require('./notifier'),
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
     * 2) add a file to queue json file for syncing when network is available
     * 3) modify queue json file after uploading to server
    */ 
    function makeSboxRequest(){

        require('dns').resolve('www.google.com', function(err) {
        if (err) {
            console.log("No connection");
        } else {
            console.log("Connected We have connection");
        }
        });
        var req = request.post(url, function (err, resp, body) {
            if (err) {
                console.log(err);
            } else {
                console.log('URL: ' + body);
            }
        });
        var form = req.form();
        form.append('file', fs.createReadStream(osAppPath +'/myfile.txt'), {
            headers: {
            'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjUyMDEyNjRhZmI0NTdmMjg4YjkyYTgzNzBjYjUxOWM4ZjlkMGY1N2YxMTc4OWQ3NzkyMDk5OWM4Mzc0MTk0NGY1ZDNhYTZlZTk4ODNkM2M2In0.eyJhdWQiOiI0IiwianRpIjoiNTIwMTI2NGFmYjQ1N2YyODhiOTJhODM3MGNiNTE5YzhmOWQwZjU3ZjExNzg5ZDc3OTIwOTk5YzgzNzQxOTQ0ZjVkM2FhNmVlOTg4M2QzYzYiLCJpYXQiOjE0NzQyNzc3MjgsIm5iZiI6MTQ3NDI3NzcyOCwiZXhwIjo0NjI5OTUxMzI3LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.h1f2tviCUfRsrdyHDJAzcU2B2iHhre5TidVXr68yfonDduLTpqktuVcBc58Tc4M0W0ChIH795jlUYY5CpwbOWAD8zRwrIJ6Sc2qfqcJRRiKf7k19xbJwSHLO4tod1Pd0qcirkLF7WlX9xrWDVsTVV4s1DYI_cstVFNWCWgsqhpdfTuBMNSOtiq5XCO7agfAfygBIQqJda3pz15eowRMRH6Y77i4JopKII-c4L7drn9jEyGFC6hEivlNMLU_0jZH1pP9lDBJg7YxhG31gWBeYelMk6u16OsOHn2FskI9DUeK6Hnf84uiWxKsqG0VmMrc_p_f-uQwKht8zoQ1NCg9e26iNHIO3LTXgFHtylISAHjCH23twm7QnIHxNzJhY7tj12pcJt_FBat9-kd4FsN-Afj13aU3SFXrb-mr-ODx8vc8hyK3VEI53Z3B3EScqDuPJqY_SfVGl0RkaFReQhQS-bLP9x3LE4tb-yHLzUi-_AVfnN99NJ_j7PSqRYZhTwEDXriBrWu12wlrvW045OSP0Yi91t9-cnPUx633ExsafDGwPskO_iZK9Nm_bnFc2MnPDVAwdlhy9LfAPBDrOwalA60QMsE92JZwvKsbENMeQOBYDLHwZTjApQUSZKbNNJpQsB_oPe-H15ZmemALA0jg7JZqGD_AgYaDUP-uVjQs63nA'
            },
            filename: 'myfile.txt',
            contentType: 'text/plain'
        });
        require('chokidar').watch(osAppPath, {ignored: /[\/\\]\./}).on('all', function(event, path) {
            if(event === "unlink"){
                console.log('removed a file')
                // notification.send('removed files');
            }else if(event === "add"){
                console.log('added a file');
                //  notification.send('added new file');
            }else if(event ==="change"){
                console.log('changed a file');
                //  notification.send('changes');
            }
            // console.log(event, path);
        });
    };
    setInterval(makeSboxRequest,200);
};
module.exports ={
    track: track
};