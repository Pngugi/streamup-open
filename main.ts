import { Storage } from "./src/sbox/storage";
import { Config } from "./src/sbox/config";

const electron = require('electron');
const {ipcMain} = electron;
var req = require('request');
import { Mkdir } from "./src/sbox/dir";
import { uploadLocalFileToOnline } from './src/sbox/uploadLocalFileToOnline';
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let iconPath = __dirname + '/dist/img/app-icon.png';

let creator = new Mkdir('Sbox');
creator.create();


setInterval((ev) => {
  var up =new uploadLocalFileToOnline().post();
  // console.log(up);
},500);

let windowToShow = () => {
  req('http://localhost:8000', function (error) {
    if (!error) {

      mainWindow.loadURL(`file://${__dirname}/Views/index.html`);
    } else {
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
  mainWindow.webContents.openDevTools()
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
ipcMain.on('async', (event, arg) => {
  // console.log(new Config().getTokenKey());

  mainWindow.webContents.send("tokenKey", new Config().getTokenKey());
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



