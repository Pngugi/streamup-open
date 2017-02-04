import { Reaction } from './Reaction';
import { Config } from "./config";
import { setInterval } from './common/platform';
import { uploadLocalFileToOnline } from './uploadLocalFileToOnline';
import { Storage } from './storage';
let notifier = require('node-notifier');
let chokidar = require('chokidar');
let os = require('os');
export class Watcher {

    public watch() {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path, r) {
                if (event === "unlink") {

                } else if (event === "add") {
                    //TODO remove duplicate while listening add event or any other event.
                    let storage = new Storage();
                    storage.setItem({ file_path: path.toString(), fileId: 1 });
                    new uploadLocalFileToOnline().post(path.toString(), function (data) {
                        let L = JSON.parse(data.response);
                        console.log(L.name);
                    });
                    //TODO make this notification work and in its own class 
                    let nc = new notifier.NotificationCenter();
                    nc.notify({
                        'title': 'Phil Coulson',
                        'subtitle': 'Agent of S.H.I.E.L.D.',
                        'message': 'If I come out, will you shoot me? \'Cause then I won\'t come out.',

                    });
                }

            });
        } catch (error) {

        }
    }

}
/**deals with listnening of broadcasted event and save file on Local Disk accordingly */

let Redis = require('ioredis');
let redis = new Redis();
redis.subscribe('files-channel');
redis.on('message', function (channel, message) {
    
    let serialized = JSON.parse(message);
    //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
    new Reaction().saveOnDisk(serialized, os.homedir+'/Sbox',new Buffer("utf-8"));

});


