"use strict";
var config_1 = require("./config");
var uploadLocalFileToOnline_1 = require('./uploadLocalFileToOnline');
var storage_1 = require('./storage');
var chokidar = require('chokidar');
var os = require('os');
var MaxFolderName = (function () {
    function MaxFolderName() {
        this.maxLenght = 100;
    }
    return MaxFolderName;
}());
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
                //TODO check if there is a failed add to queue reprocess it after
                var folderName = path.slice(19, new MaxFolderName().maxLenght);
                new uploadLocalFileToOnline_1.uploadLocalFileToOnline().createFolder(folderName, function (r) {
                    if (JSON.parse(r.response.toString()).status === 200) {
                        var data = JSON.parse(r.response.toString()).data;
                        new storage_1.Storage().setItem({
                            id: data.id,
                            name: data.name,
                            type: data.type,
                            size: data.size,
                            has_copy: data.has_copy,
                            user_id: data.user_id
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
    if (online) {
        redis.subscribe('files-channel');
        redis.on('message', function (channel, message) {
            var serialized = JSON.parse(message);
            //TODO understanding how to fetch file online and save on Disk using fs.createWriteStream :: new Buffer("utf-8") is faked don't know what i am doing!
            // new Reaction().saveOnDisk(serialized, os.homedir+'/Sbox',new Buffer("utf-8"));
        });
    }
});
//init a wather
new Watcher().watch();
