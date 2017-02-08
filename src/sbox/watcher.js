"use strict";
var config_1 = require("./config");
var uploadLocalFileToOnline_1 = require('./uploadLocalFileToOnline');
var notifier = require('node-notifier');
var fs = require('fs');
var chokidar = require('chokidar');
var os = require('os');
var Watcher = (function () {
    function Watcher() {
    }
    Watcher.prototype.watch = function () {
        try {
            new config_1.Config();
            var watcher = chokidar.watch(os.homedir() + '/Sbox', { ignored: /[\/\\]\./, persistent: true });
            watcher
                .on('add', function (path) {
            })
                .on('addDir', function (path, stat) {
                //TODO make a folder name to not be a fullPath here take the real name
                path = path.toString().split("-");
                new uploadLocalFileToOnline_1.uploadLocalFileToOnline().createFolder(path, function (response) {
                    notifier.notify({
                        'title': 'A folder is Created',
                        'message': 'Folder synced!'
                    });
                });
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
var isOnline = require('is-online');
isOnline().then(function (online) {
    if (online)
        redis.subscribe('files-channel');
    redis.on('message', function (channel, message) {
        var serialized = JSON.parse(message);
        //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
        // new Reaction().saveOnDisk(serialized, os.homedir+'/Sbox',new Buffer("utf-8"));
    });
});
