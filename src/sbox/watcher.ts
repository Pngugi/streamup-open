import { Notification } from './../../notification';
import { Reaction } from './Reaction';
import { Config } from "./config";
import { setInterval } from './common/platform';
import { uploadLocalFileToOnline as Uploader } from './uploadLocalFileToOnline';
import { Storage } from './storage';
import fs = require('fs');
import chokidar = require('chokidar');
import os = require('os');

class  MaxFolderName{
  public  maxLenght:number = 100;
}
interface Fresponse{
    id:number,
    name:string,
    drop_box_name:string
}
export class Watcher {

    public watch() {

        try {

            new Config();
            var watcher = chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./, persistent: true });

            watcher
                .on('add', function (path: string) {
                    

                })
                .on('addDir', function (path: string, stat) {

                    //TODO check if there is a failed add to queue reprocess it after
                    var folderName= path.slice(19,new MaxFolderName().maxLenght);
                    console.log(folderName);
                    new Uploader().createFolder(folderName, function (response:Fresponse) {
                        // new Notification('folder Created','message'); 
                    });
                    new Storage().setItem({
                        name: path.toString(),
                        birthtime: stat.birthtime.toString()
                    }, function (object) {
                        
                    });

                })
                .on('change', function (path) {
                    console.log("something changed");
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
import  Redis = require('ioredis');
let redis = new Redis();
import isOnline = require('is-online');
isOnline().then(online => {
    if (online) {
        redis.subscribe('files-channel');
        redis.on('message', function (channel, message) {

            let serialized = JSON.parse(message);
            //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
            // new Reaction().saveOnDisk(serialized, os.homedir+'/Sbox',new Buffer("utf-8"));

        });
    }
});

//init a wather
new Watcher().watch();

