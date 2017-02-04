import { Storage } from './storage';

let chokidar = require('chokidar');
let os = require('os');

export class Watcher {

    public watch() {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path) {
                if (event === "unlink") {
                    console.log("unlinked element..");
                } else if (event === "add") {
                    console.log(path.toString());
                    let storage = new Storage();
                    storage.setItem({ file_path: path.toString() });
                    console.log("folder created..:" + path);
                }

            });
        } catch (error) {

        }
    }
}