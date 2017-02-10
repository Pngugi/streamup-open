"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectComparator_1 = require('./ObjectComparator');
var fs = require('fs');
var low = require('lowdb');
var fileAsync = require('lowdb/lib/file-async');
var CryptoJS = require("cryptr");
var os = require('os');
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(encryptKey) {
        _super.call(this);
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
        catch (e) { }
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
            var permissionTosave = false;
            console.log(actualLenght);
            for (var i = 0; i < actualLenght; i++) {
                if (this.isEquivalent(actualData[i], data)) {
                    console.log("we are luck02");
                    permissionTosave = false;
                }
                else {
                    console.log("we are luck01");
                    permissionTosave = true;
                }
                permissionTosave = true;
            }
            if (!permissionTosave)
                return callback({
                    response: 300,
                    message: 'synced no need to do it again'
                });
            if (permissionTosave) {
                this.response = this.db.get("posts").push(data).cloneDeep()
                    .value();
                return callback({
                    response: 200,
                    data: this.response
                });
            }
        }
        catch (e) { }
    };
    Storage.prototype.saveOnDisk = function (data, filPath, buffer) {
        if (typeof (data) === "object")
            if (typeof (filPath) || typeof (buffer) !== "undefined")
                fs.createWriteStream(filPath, buffer);
        try {
            this.db.get("posts").push(data).cloneDeep()
                .value();
        }
        catch (e) { }
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
}(ObjectComparator_1.ObjectComparator));
exports.Storage = Storage;
