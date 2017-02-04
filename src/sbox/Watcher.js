"use strict";
var storage_1 = require('./storage');
var chokidar = require('chokidar');
var os = require('os');
var Watcher = (function () {
    function Watcher() {
    }
    Watcher.prototype.watch = function () {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path) {
                if (event === "unlink") {
                    console.log("unlinked element..");
                }
                else if (event === "add") {
                    console.log(path.toString());
                    var storage = new storage_1.Storage();
                    storage.setItem({ file_path: path.toString() });
                    console.log("folder created..:" + path);
                }
            });
        }
        catch (error) {
        }
    };
    return Watcher;
}());
exports.Watcher = Watcher;
