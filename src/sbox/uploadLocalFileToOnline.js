"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var storage_1 = require('./storage');
var os = require('os'), request = require('request'), network = require('./netWorkManager'), fs = require('fs');
var config_1 = require("./config");
var uploadLocalFileToOnline = (function (_super) {
    __extends(uploadLocalFileToOnline, _super);
    function uploadLocalFileToOnline(osPath, URL) {
        if (URL === void 0) { URL = process.env.URL; }
        _super.call(this);
        this.osPath = os.homedir() + '/Sbox';
    }
    uploadLocalFileToOnline.prototype.post = function () {
        //   return this.osPath;
        var formData = {
            authorized_app: 'true',
            folderId: 'undefined',
            file: fs.createReadStream(this.osPath + '/myfile.txt'),
        };
        try {
        }
        catch (error) {
            console.log(error);
        }
    };
    ;
    uploadLocalFileToOnline.prototype.get = function () {
        var formData = {
            authorized_app: 'true',
            folderId: 'undefined',
            file: fs.createReadStream(this.osPath + '/myfile.txt'),
        };
        request.get({ url: this.onLineURL(), formData: formData }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            if (httpResponse) {
                //copy file from online to Disk
                new storage_1.Storage(this.osPath);
            }
        }).auth(null, null, true, this.getTokenKey);
    };
    return uploadLocalFileToOnline;
}(config_1.Config));
exports.uploadLocalFileToOnline = uploadLocalFileToOnline;
