"use strict";
var uploadLocalFileToOnline_1 = require('./uploadLocalFileToOnline');
var notifier = require('node-notifier');
var chokidar = require('chokidar');
var os = require('os');
var Watcher = (function () {
    function Watcher() {
    }
    Watcher.prototype.watch = function () {
        try {
            chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path, r) {
                if (event === "unlink") {
                }
                else if (event === "add") {
                    console.log(r);
                    // let storage = new Storage();
                    // storage.setItem({ file_path: path.toString() });
                    new uploadLocalFileToOnline_1.uploadLocalFileToOnline().post(path.toString());
                    //TODO make this notification work and in its own class 
                    var nc = new notifier.NotificationCenter();
                    nc.notify({
                        'title': 'Phil Coulson',
                        'subtitle': 'Agent of S.H.I.E.L.D.',
                        'message': 'If I come out, will you shoot me? \'Cause then I won\'t come out.'
                    });
                }
            });
        }
        catch (error) {
        }
    };
    return Watcher;
}());
exports.Watcher = Watcher;
