import { uploadLocalFileToOnline } from './uploadLocalFileToOnline';
import { Storage } from './storage';
let notifier = require('node-notifier');

let chokidar = require('chokidar');
let os = require('os');
export class Watcher {

    public watch() {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path) {
                if (event === "unlink") {
                    
                } else if (event === "add") {
                    
                    // let storage = new Storage();
                    // storage.setItem({ file_path: path.toString() });
                    
                    new uploadLocalFileToOnline().post(path.toString());

                    
                    let nc = new notifier.NotificationCenter();
                        
                        nc.notify({
                        'title': 'Phil Coulson',
                        'subtitle': 'Agent of S.H.I.E.L.D.',
                        'message': 'If I come out, will you shoot me? \'Cause then I won\'t come out.',
                        //   'sound': 'Funk', // case sensitive
                        //   'appIcon': __dirname + '/coulson.jpg',
                        //   'contentImage': __dirname + '/coulson.jpg',
                        //   'open': 'file://' + __dirname + '/coulson.jpg'
                        });
                }

            });
        } catch (error) {

        }
    }
}