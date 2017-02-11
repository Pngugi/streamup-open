"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectComparator_1 = require('./ObjectComparator');
var low = require('lowdb');
var fileAsync = require('lowdb/lib/file-async');
var CryptoJS = require("cryptr");
var os = require('os');
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(encryptKey) {
        _super.call(this);
        try {
            CryptoJS = new CryptoJS("key");
        }
        catch (e) { }
    }
    Storage.prototype.setItem = function (data, callback) {
        var db = low('db.json', {
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
        //TODO make this return correct bool value
        // if (!this.exist(data.name)) 
        // {
        // 	this.response = db.get("posts").push(data).cloneDeep()
        // 		.value()
        // 	return callback({
        // 		response: 200,
        // 		data: db.get({}).__wrapped__.posts
        // 	});
        // }
    };
    Storage.prototype.exist = function (name) {
        var res = false;
        var db = low('db.json', {
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
        db.get({}).__wrapped__.posts.forEach(function (element) {
            if (JSON.stringify(element.name) == JSON.stringify(name)) {
                return res = true;
            }
        });
        return res;
    };
    return Storage;
}(ObjectComparator_1.ObjectComparator));
exports.Storage = Storage;
