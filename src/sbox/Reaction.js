"use strict";
var Reaction = (function () {
    function Reaction() {
    }
    Reaction.prototype.saveOnDisk = function (obj, filePath, buffer) {
        return true;
    };
    return Reaction;
}());
exports.Reaction = Reaction;
