"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ObjectComparator_1 = require('./ObjectComparator');
var low = require('lowdb');
var db = require('../../../../models/index.js');
var Storage = (function (_super) {
    __extends(Storage, _super);
    function Storage(encryptKey) {
        _super.call(this);
    }
    Storage.prototype.saveFolder = function (data, callback) {
        // db.Folder.sync({ force: true }).then(function () {
        // 	return User.create({
        // 		id: '1',
        // 		folderName: 'FolderName'
        // 	});
        // });
    };
    Storage.prototype.getFolder = function () {
        var findUserDevice = function (id) {
            return db.Folder.find({
                where: {
                    id: id
                }
            }).then(function (device) {
                if (!device) {
                    return 'not find';
                }
                return device.dataValues;
            });
        };
        findUserDevice(1).then(function (UserDevice) {
            console.log(UserDevice);
        });
    };
    return Storage;
}(ObjectComparator_1.ObjectComparator));
exports.Storage = Storage;
new Storage().saveFolder();
new Storage().getFolder();
