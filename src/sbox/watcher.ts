import { Notification } from './../../notification';
import { Reaction } from './Reaction';
import { Config } from "./config";
import { setInterval } from './common/platform';
import { uploadLocalFileToOnline as Uploader } from './uploadLocalFileToOnline';
import { Storage } from './storage';
import fs = require('fs');
import chokidar = require('chokidar');
import os = require('os');

class MaxFolderName {
    public maxLenght: number = 100;
}
interface Fresponse {
    response: {
        status: number,
        data: {
            id: number,
            name: string,
            type: string,
            size: string,
            has_copy: boolean,
            user_id: number
        }
    }
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
                    var folderName = path.slice(19, new MaxFolderName().maxLenght);

                    new Uploader().createFolder(folderName, function (r: Fresponse) {

                        if (JSON.parse(r.response.toString()).status === 200) {

                            let data = JSON.parse(r.response.toString()).data;

                            new Storage().setItem({
                                   id:data.id,
                                   name:data.name,
                                   type:data.type,
                                   size:data.size,
                                   has_copy:data.has_copy,
                                   user_id:data.user_id
                               }, function (resp) {
                                // console.log(resp);
                            });
                        }
                        // new Notification('folder Created','message'); 
                    });


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
import Redis = require('ioredis');
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

