"use strict";
var storage_1 = require('./storage');
var Reaction = (function () {
    function Reaction() {
    }
    Reaction.prototype.saveOnDisk = function (obj, filePath, buffer) {
        //TODO understand the meaning of buffer...and usability here
        new storage_1.Storage().setItem(obj, filePath, buffer);
        return true;
    };
    return Reaction;
}());
exports.Reaction = Reaction;
