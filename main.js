'use strict';
const electron = require('electron')
const dir = require('./app_modules/dir');
const uploadLocalFileToOnline = require('./app_modules/uploadLocalFileToOnline');
const os = require('os');
const app = electron.app
const chokidar = require('chokidar')
const BrowserWindow = electron.BrowserWindow
let mainWindow
let  iconPath =__dirname + '/dist/img/app-icon.png';

dir.mkdir('Sbox');
 

uploadLocalFileToOnline.async();


let osAppPath = os.homedir() +'/Sbox';



function createWindow () {
  
  mainWindow = new BrowserWindow({width: 320, height: 540,icon: iconPath,kiosk: false,

        title:"StreamUpBox Desktop",
        transparent:true,
        resizable: false,})
  
  mainWindow.loadURL(`file://${__dirname}/App/index.html`)
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  //hide menus
   mainWindow.setMenu(null)
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
  
}

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
});

// function watchFileAndFolderChanges(){    
//             try {
//                   chokidar.watch(osAppPath, {ignored: /[\/\\]\./}).on('all', function(event, path) {
//                 if(event === "unlink"){
                  
//                 }else if(event === "add"){
//                     console.log("folder created..:"+path);
//                 }
                
//             });
//             } catch (error) {
                  
//           }
            
//     };
// watchFileAndFolderChanges();

