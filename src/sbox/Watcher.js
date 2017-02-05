"use strict";
var Reaction_1 = require('./Reaction');
var notifier = require('node-notifier');
var chokidar = require('chokidar');
var os = require('os');
var Watcher = (function () {
    function Watcher() {
    }
    Watcher.prototype.watch = function () {
        try {
            // chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./ }).on('all', function (event, path, r) {
            //     if (event === "unlink") {
            //     } else if (event === "add") {
            //         //TODO remove duplicate while listening add event or any other event.
            //         let storage = new Storage();
            //         storage.setItem({ file_path: path.toString(), fileId: 1 });
            //         new uploadLocalFileToOnline().post(path.toString(), function (data) {
            //             let L = JSON.parse(data.response);
            //             console.log(L.name);
            //         });
            //         //TODO make this notification work and in its own class 
            //         let nc = new notifier.NotificationCenter();
            //         nc.notify({
            //             'title': 'Phil Coulson',
            //             'subtitle': 'Agent of S.H.I.E.L.D.',
            //             'message': 'If I come out, will you shoot me? \'Cause then I won\'t come out.',
            //         });
            //     }
            // });
            var watcher = chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./, persistent: true });
            watcher
                .on('add', function (path) { console.log('File', path, 'has been added'); })
                .on('addDir', function (path) { console.log('Directory', path, 'has been added'); })
                .on('change', function (path) { console.log('File', path, 'has been changed'); })
                .on('unlink', function (path) { console.log('File', path, 'has been removed'); })
                .on('unlinkDir', function (path) { console.log('Directory', path, 'has been removed'); })
                .on('error', function (error) { console.error('Error happened', error); });
            // 'add', 'addDir' and 'change' events also receive stat() results as second argument. 
            // http://nodejs.org/api/fs.html#fs_class_fs_stats 
            watcher.on('change', function (path, stats) {
                console.log('File', path, 'changed size to', stats.size);
            });
        }
        catch (error) {
        }
    };
    return Watcher;
}());
exports.Watcher = Watcher;
/**deals with listnening of broadcasted event and save file on Local Disk accordingly */
var Redis = require('ioredis');
var redis = new Redis();
redis.subscribe('files-channel');
redis.on('message', function (channel, message) {
    var serialized = JSON.parse(message);
    //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
    new Reaction_1.Reaction().saveOnDisk(serialized, os.homedir + '/Sbox', new Buffer("utf-8"));
});
