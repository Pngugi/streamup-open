'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showColorWheel = exports.showDesktopSettings = undefined;

var _electron = require('electron');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _autoLaunch = require('auto-launch');

var _autoLaunch2 = _interopRequireDefault(_autoLaunch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appLauncher = new _autoLaunch2.default({
  name: 'StreamUpBoxDesktop'
});

var showDesktopSettings = exports.showDesktopSettings = function showDesktopSettings() {
  if (WindowManager.getAll('settings').length > 0) {
    WindowManager.getAll('settings')[0].show();
    return;
  }
  var desktopSettings = new _electron.BrowserWindow({
    width: 800,
    height: 540,
    autoHideMenuBar: true,
    frame: Settings.get('nativeFrame'),
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: _path2.default.resolve(__dirname + '/../../../assets/img/main.' + (process.platform === 'win32' ? 'ico' : 'png')), // eslint-disable-line
    title: 'Settings'
  });
  desktopSettings.loadURL('file://' + __dirname + '/../../../public_html/desktop_settings.html');

  WindowManager.add(desktopSettings, 'settings');
  WindowManager.forceFocus(desktopSettings);
};

var showColorWheel = exports.showColorWheel = function showColorWheel() {
  if (WindowManager.getAll('color_wheel').length > 0) {
    WindowManager.getAll('color_wheel')[0].show();
    return;
  }
  var colorWheel = new _electron.BrowserWindow({
    width: 400,
    height: 400,
    autoHideMenuBar: true,
    frame: Settings.get('nativeFrame'),
    show: false,
    webPreferences: {
      nodeIntegration: true
    },
    icon: _path2.default.resolve(__dirname + '/../../../assets/img/main.' + (process.platform === 'win32' ? 'ico' : 'png')), // eslint-disable-line
    title: 'Color Wheel'
  });
  colorWheel.loadURL('file://' + __dirname + '/../../../public_html/color_wheel.html');

  WindowManager.add(colorWheel, 'color_wheel');
  WindowManager.forceFocus(colorWheel);
};

Emitter.on('window:settings', function () {
  // const mainWindow = WindowManager.getAll('main')[0];
  showDesktopSettings();
});

Emitter.on('window:color_wheel', function () {
  showColorWheel();
});

Emitter.on('settings:set', function (event, details) {
  Settings.set(details.key, details.value);
  // DEV: React to settings change
  switch (details.key) {
    case 'miniAlwaysShowSongInfo':
      Emitter.sendToGooglePlayMusic('miniAlwaysShowSongInfo', { state: details.value });
      break;
    case 'miniAlwaysOnTop':
      Emitter.sendToGooglePlayMusic('miniAlwaysOnTop', { state: details.value });
      break;
    case 'miniUseScrollVolume':
      Emitter.sendToGooglePlayMusic('miniUseScrollVolume', { state: details.value });
      break;
    case 'speechRecognition':
      Emitter.sendToGooglePlayMusic('speech:toggle', { state: details.value });
      break;
    case 'scrollLyrics':
      Emitter.sendToAll('settings:set:scrollLyrics', details.value);
      break;
    case 'auto-launch':
      if (details.value === true) {
        appLauncher.enable();
      } else {
        appLauncher.disable();
      }
      break;
    default:
      break;
  }
});