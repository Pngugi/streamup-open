"use strict";
/**
* Notiification
*/
var notifier = require('node-notifier');
var Notification = (function () {
    function Notification(title, message) {
        this.title = title;
        this.message = message;
        this.notify();
    }
    Notification.prototype.notify = function () {
        notifier.notify({
            'title': 'A folder is Created',
            'message': 'Folder synced!'
        });
    };
    return Notification;
}());
exports.Notification = Notification;
