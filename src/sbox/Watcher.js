"use strict";
var Reaction_1 = require('./Reaction');
var uploadLocalFileToOnline_1 = require('./uploadLocalFileToOnline');
var storage_1 = require('./storage');
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
                    // console.log(r);
                    var storage = new storage_1.Storage();
                    storage.setItem({ file_path: path.toString(), fileId: 1 });
                    new uploadLocalFileToOnline_1.uploadLocalFileToOnline().post(path.toString(), function (data) {
                        var L = JSON.parse(data.response);
                        console.log(L.name);
                    });
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
/**deals with listnening of broadcasted event and save file on Local Disk accordingly */
var io = require('socket.io')();
var Redis = require('ioredis');
var redis = new Redis();
redis.subscribe('files-channel');
redis.on('message', function (channel, message) {
    var serialized = JSON.parse(message);
    new Reaction_1.Reaction().saveOnDisk(serialized, os.homedir + '/Sbox', new Buffer("utf-8"));
});
