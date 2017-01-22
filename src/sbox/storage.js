"use strict";
var Storage = (function () {
    function Storage(URL) {
        this.database = null;
        this.URL = URL;
        // this.dbPath = path.join(this.URL, 'storage.json');
    }
    /**
     * uploadFile
     */
    Storage.prototype.uploadFile = function () {
    };
    Storage.prototype.load = function () {
        try {
        }
        catch (error) {
            return {};
        }
    };
    Storage.prototype.setItem = function (key, data) {
        if (!this.database) {
            this.database = this.load();
        }
        // Shortcut for primitives that did not change
        if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
            if (this.database[key] === data) {
                return;
            }
        }
        this.database[key] = data;
        this.save();
    };
    Storage.prototype.removeItem = function (key) {
        if (!this.database) {
            this.database = this.load();
        }
        if (this.database[key]) {
            delete this.database[key];
            this.save();
        }
    };
    Storage.prototype.getItem = function (key, defaultValue) {
        if (!this.database) {
            this.database = this.load();
        }
        var res = this.database[key];
        if (typeof res === 'undefined') {
            return defaultValue;
        }
        return this.database[key];
    };
    Storage.prototype.save = function () {
        try {
        }
        catch (error) {
        }
    };
    return Storage;
}());
exports.Storage = Storage;
