import { Reaction } from './Reaction';
import { Config } from "./config";
import { setInterval } from './common/platform';
import { uploadLocalFileToOnline as Uploader } from './uploadLocalFileToOnline';
import { Storage } from './storage';
let notifier = require('node-notifier');
let fs = require('fs');
let chokidar = require('chokidar');
let os = require('os');
export class Watcher {

    public watch() {
        try {

            new Config();
            var watcher = chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./, persistent: true });

            watcher
                .on('add', function (path) {

                })
                .on('addDir', function (path, stat) {
                     
                     
                     let folderObj = {
                         name:path.toString(),
                         birthtime:stat.birthtime
                     }
                     new Storage().setItem(folderObj,function(object){
                        console.log(object);
                     });
                    
                    //TODO make a folder name to not be a fullPath here take the real name
                    // path = path.toString().split("-");
                    // new Uploader().createFolder(path, function (response) {
                    //     notifier.notify({
                    //         'title': 'A folder is Created',
                    //         'message': 'Folder synced!'
                    //     });
                    // });


                    // function readFiles(path, onFileContent, onError) {
                    //     fs.readdir(path, function (err, filenames) {
                    //         if (err) {
                    //             onError(err);
                    //             return;
                    //         }
                    //         filenames.forEach(function (filename) {       
                    //             fs.readFile(path + filename, 'utf-8', function (err, content) {
                    //                 if (err) {
                    //                     onError(err);
                    //                     return;
                    //                 }
                    //                 onFileContent(filename, content);
                    //             });
                    //         });
                    //     });
                    // }

                })
                .on('change', function (path) {

                })
                .on('unlink', function (path) {

                })
                .on('unlinkDir', function (path) {

                })
                .on('error', function (error) {

                })
                .on('change', function (path, stats) {

                });
        } catch (error) {

        }
    }

}

/**deals with listnening of broadcasted event and save file on Local Disk accordingly */
let Redis = require('ioredis');
let redis = new Redis();
let isOnline = require('is-online');
isOnline().then(online => {
    if (online)
        redis.subscribe('files-channel');
    redis.on('message', function (channel, message) {

        let serialized = JSON.parse(message);
        //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
        // new Reaction().saveOnDisk(serialized, os.homedir+'/Sbox',new Buffer("utf-8"));

    });

});

