'use strict';
const electron = require('electron')
const Tray = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
// let  iconPath =__dirname + '/dist/img/app-icon.png';
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/App/index.html`)
  
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// 'use strict';

// var app = require('app');
// var Tray = require('electron');
// var BrowserWindow = require('browser-window');
// var path = require('path');
// var mainWindow = null;
// var globalShortcut = require('global-shortcut');

// var notification = require('./app_modules/notifier');
// var child_process = require('child_process');


// var fs = require('fs');

// var configuration = require('./app_modules/configuration');
// var  configureApp =require('./app_modules/windowManager');
// var options = {
// 	"debug": true,
// 	"version": "1.0.0",
// 	"views_dir": "App",
// 	"root_view": "index.html"
// };


// configureApp.defaultWindow(app);
// require('crash-reporter').start();
// app.on('ready', function() {
//     if (!configuration.readSettings('shortcutKeys')) {
//         configuration.saveSettings('shortcutKeys', ['ctrl', 'shift']);
//         //TODO on SignUp complete with success please use the above code to save user credential for future use also encrypt it on local!
//     };
//     var  iconPath =__dirname + '/dist/img/app-icon.png';
//     mainWindow = new BrowserWindow({
//         frame: true,
//         kiosk: true,
//         height: 500,   
//         title:"StreamUpBox Setup",
//         resizable: false,
//         width: 310,
//         icon: iconPath,
//         transparent:true
//     });
//     mainWindow.setMenu(null);
    
//     mainWindow.loadUrl(path.join('file://', __dirname, options.views_dir, options.root_view));

//     new Tray(iconPath);

//     var os = require('os'),
//      userInfo = require('user-info');
//     var dir = os.homedir() +'/StreamUpBox';
    
//     fs.exists(dir,function (params,status) {
//        if(status !== true){
//            fs.mkdir(dir,function(_,t){});
//            fs.chmod(dir, '777',function(_,t){
                
//             });
//             console.log("Folder created Successfully!");
//         }else{
//              fs.chmod(dir, '777',function(_,t){

//              });
//             console.log("Folder already exist!");
//         };
//     });

    
    
//     var folderWatcher = function(object) {
       
//         require('chokidar').watch(os.homedir()+'/StreamUpBox', {ignored: /[\/\\]\./}).on('all', function(event, path) {
//             if(event === "unlink"){
//                 notification.send('removed files');
//             }else if(event === "add"){
                
//                  notification.send('add new file');
//             }else if(event ==="change"){
//                  notification.send('changes');

//             }
//             console.log(event, path);
//         });
//     };
    
    
// });

// function setGlobalShortcuts() {
//     globalShortcut.unregisterAll();

//     var shortcutKeysSetting = configuration.readSettings('shortcutKeys');
//     var shortcutPrefix = shortcutKeysSetting.length === 0 ? '' : shortcutKeysSetting.join('+') + '+';

//     globalShortcut.register(shortcutPrefix + '1', function () {
//         mainWindow.webContents.send('global-shortcut', 0);
//     });
//     globalShortcut.register(shortcutPrefix + '2', function () {
//         mainWindow.webContents.send('global-shortcut', 1);
//     });
// };

// var ipc = require('ipc');

// ipc.on('close-main-window', function () {
//     app.quit();
// });


