"use strict";
var Watcher_1 = require('./src/sbox/Watcher');
var config_1 = require("./src/sbox/config");
var electron = require('electron');
var ipcMain = electron.ipcMain;
var req = require('request');
var dir_1 = require("./src/sbox/dir");
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
var iconPath = __dirname + '/dist/img/app-icon.png';
var isOnline = require('is-online');
/**start by creating application basic folder */
var creator = new dir_1.Mkdir('Sbox');
creator.create();
/**end of creating a folder */
/**initiate storage for the first time call this first! */
var CryptoJS = require("cryptr");
CryptoJS = new CryptoJS("key");
var low = require('lowdb');
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
db.defaults({ posts: [] })
    .value();
/**end of adapting storage to application */
/**watching for folder changes */
new Watcher_1.Watcher().watch();
var windowToShow = function () {
    isOnline().then(function (online) {
        if (online) {
            mainWindow.loadURL("file://" + __dirname + "/Views/index.html");
        }
        else {
            mainWindow.loadURL("file://" + __dirname + "/Views/NetworkStatus.html");
        }
    });
};
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1202, height: 690, icon: iconPath, kiosk: true,
        title: "StreamUpBox Desktop",
        transparent: true,
        resizable: false
    });
    windowToShow();
    // mainWindow.webContents.openDevTools()
    //hide menus
    mainWindow.setMenu(null);
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('ready', createWindow);
ipcMain.on('emmitter', function (event, arg) {
    mainWindow.webContents.send("tokenKey", new config_1.Config().getTokenKey());
});
// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});
