"use strict";
var fs = require('fs');
var low = require('lowdb');
var fileAsync = require('lowdb/lib/file-async');
var CryptoJS = require("cryptr");
var os = require('os');
var Storage = (function () {
    function Storage(encryptKey) {
        this.database = null;
        try {
            CryptoJS = new CryptoJS("key");
            this.db = low('db.json', {
                format: {
                    deserialize: function (str) {
                        var decrypted = CryptoJS.decrypt(str.toString());
                        var obj = JSON.parse(decrypted);
                        return obj;
                    },
                    serialize: function (obj) {
                        var str = JSON.stringify(obj);
                        var encrypted = CryptoJS.encrypt(str);
                        return encrypted;
                    }
                }
            });
        }
        catch (e) {
        }
    }
    Storage.prototype.uploadFile = function () {
    };
    Storage.prototype.load = function () {
        return this.db.get('posts').value();
    };
    Storage.prototype.setItem = function (data, callback) {
        try {
            var actualLenght = this.db.find(data).cloneDeep().__wrapped__.posts.length;
            var actualData = this.db.find(data).cloneDeep().__wrapped__.posts;
            var i = void 0;
            var permissionTosave = false;
            for (i = 0; i <= actualLenght; i++) {
                if (actualData[i] === data) {
                    console.log("matching");
                    permissionTosave = false;
                }
                else {
                    permissionTosave = true;
                }
            }
            if (!permissionTosave)
                return callback({
                    response: 300,
                    message: 'synced no need to do it again'
                });
            if (permissionTosave) {
                console.log("one");
            }
            else {
                return callback({
                    response: 200,
                    data: 'no action taken'
                });
            }
        }
        catch (e) {
        }
    };
    Storage.prototype.saveOnDisk = function (data, filPath, buffer) {
        if (typeof (data) === "object")
            if (typeof (filPath) || typeof (buffer) !== "undefined")
                fs.createWriteStream(filPath, buffer);
        try {
            this.db.get("posts").push(data).cloneDeep()
                .value();
        }
        catch (error) {
        }
    };
    Storage.prototype.removeItem = function (key) {
    };
    Storage.prototype.getItem = function (key, defaultValue) {
        return this.db.get('posts').find({ id: key }).value();
    };
    Storage.prototype.save = function (str, data) {
        this.db.get('posts').push(data);
    };
    return Storage;
}());
exports.Storage = Storage;
