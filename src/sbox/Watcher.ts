import { uploadLocalFileToOnline } from './uploadLocalFileToOnline';
import { Storage } from './storage';
let notifier = require('node-notifier');

let chokidar = require('chokidar');
let os = require('os');
export class Watcher {

    public watch() {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path,r) {
                if (event === "unlink") {

                } else if (event === "add") {
                    
                    console.log(r);
                    // let storage = new Storage();
                    // storage.setItem({ file_path: path.toString() });
                    new uploadLocalFileToOnline().post(path.toString());
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