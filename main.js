"use strict";
var config_1 = require("./src/sbox/config");
var electron = require('electron');
var ipcMain = electron.ipcMain;
var req = require('request');
var dir_1 = require("./src/sbox/dir");
var uploadLocalFileToOnline_1 = require('./src/sbox/uploadLocalFileToOnline');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;
var mainWindow;
var iconPath = __dirname + '/dist/img/app-icon.png';
var creator = new dir_1.Mkdir('Sbox');
creator.create();
setInterval(function (ev) {
    var up = new uploadLocalFileToOnline_1.uploadLocalFileToOnline().post();
    // console.log(up);
}, 500);
var windowToShow = function () {
    req('http://localhost:8000', function (error) {
        if (!error) {
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
        resizable: false,
    });
    windowToShow();
    // mainWindow.webContents.openDevTools()
    //hide menus
    mainWindow.setMenu(null);
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
    // menu();
    // badge();
}
app.on('ready', createWindow);
ipcMain.on('emmitter', function (event, arg) {
    // console.log(new Config().getTokenKey());
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
