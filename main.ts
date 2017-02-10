import { Watcher } from './src/sbox/watcher';
import { Storage } from "./src/sbox/storage";
import { Git } from "./src/sbox/sync/git";
import { Config } from "./src/sbox/config";
const electron = require('electron');
const {ipcMain} = electron;
var req = require('request');
import { Mkdir as Dir } from "./src/sbox/dir";
import { uploadLocalFileToOnline } from './src/sbox/uploadLocalFileToOnline';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let iconPath = __dirname + '/dist/img/app-icon.png';
let isOnline = require('is-online');
/**start by creating application basic folder */
let creator = new Dir('Sbox');
creator.create();
/**end of creating a folder */


/**initiate storage for the first time call this first! */
let CryptoJS  = require("cryptr");
CryptoJS      = new CryptoJS("key");
const low     = require('lowdb');
const db      = low('db.json', {
  format: {
    deserialize: (str) => {
      const decrypted = CryptoJS.decrypt(str.toString())
      const obj = JSON.parse(decrypted)
      return obj
    },
    serialize: (obj) => {
      const str = JSON.stringify(obj)
      const encrypted = CryptoJS.encrypt(str)
      return encrypted
    }
  }
});
db.defaults({ posts: [] })
  .value()



/**end of adapting storage to application */


/**watching for folder changes */
new Watcher().watch();



let windowToShow = () => {
  isOnline().then(online => {
    if(online){
      mainWindow.loadURL(`file://${__dirname}/Views/index.html`);
    }
    else{
      // mainWindow.loadURL(`file://${__dirname}/Views/index.html`);
      mainWindow.loadURL(`file://${__dirname}/Views/NetworkStatus.html`);
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

    mainWindow = null;
  });

}


app.on('ready', createWindow);
ipcMain.on('emmitter', (event, arg) => {

  mainWindow.webContents.send("tokenKey", new Config().getTokenKey());
  mainWindow.webContents.on("folder", function(e){
    // console.log(e);
  });
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



