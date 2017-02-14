var gulp = require('gulp');
var deb = require('gulp-deb');
var fs = require("fs");

gulp.task('default', function () {

//   var preinstContent = fs.readFileSync("scripts/preinst", "utf8");
//   var postrmContent = fs.readFileSync("scripts/postrm", "utf8");

  return gulp
    .src([
      'src/**.js',
      'node_modules/**',
      '!**/.git/**'
    ], { base: process.cwd() })
    .pipe(deb('Sbox.deb', {
      name: 'StreamUpBox.DeskTop',
      version: '1.0.0-1',
      maintainer: {
        name: 'Muragijimana Richard',
        email: 'beastar457@gmail.com'
      },
      short_description: 'OpenAp',
      long_description: 'OpenAp'
	//   ,
    //   //...
    //   scripts: {
    //     preinst: preinstContent,
    //     postrm: postrmContent
    //   }
    }))
    .pipe(gulp.dest('build/linux'));
});



var path = require('path');

var sass = require('gulp-sass');
var process = require('process');
var gutil = require('gulp-util');
var webpack = require('webpack');
var clean = require('gulp-clean');
var packager = require('electron-packager');
var childProcess = require('child_process');

var packageInfo = require('./package.json');
var webpackConfig = require('./webpack.config.js');

var APP_NAME = packageInfo.name;

gulp.task('clean', function (callback) {
    gulp.src(['./app', './build'], {read: false})
        .pipe(clean());
    callback();
});

gulp.task('copy', function () {
    gulp.src(['./src/browser.js', './src/app.config.js', './src/*.html'])
        .pipe(gulp.dest('./app'));
    gulp.src(['./src/assets/*', './src/assets/*/**'])
        .pipe(gulp.dest('./app/assets'));
    gulp.src(['./package.json']).pipe(gulp.dest('./app'));
    gulp.src(['./node_modules/electron-sudo/*', './node_modules/electron-sudo/*/**'])
        .pipe(gulp.dest('./app/node_modules/electron-sudo'));
});

gulp.task('webpack', function (callback) {
    webpack(webpackConfig, function (err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack', err);
        }
        gutil.log('[webpack]', stats.toString({ modules: false, colors: true }));
        callback();
    });
});

gulp.task('sass', function () {
    gulp.src('./src/sass/main.scss')
        .pipe(
            sass({
                includePaths: [path.join(__dirname, './src/sass')],
                outputStyle: 'compressed'
            })
            .on('error', sass.logError))
        .pipe(gulp.dest('./app'));
});

gulp.task('build', ['copy', 'sass', 'webpack']);

var deleteUselessFiles = function (platform, distPath) {
    var filesToBeRemoved = [];
    switch (platform) {
        case 'win32':
            filesToBeRemoved = [
                '*.html',
                'LICENSE',
                'version',
                'pdf.dll',
                'locales/*.*',
                'xinput1_3.dll',
                'd3dcompiler.dll',
                'vccorlib120.dll',
                'snapshot_blob.bin',
                'd3dcompiler_47.dll',
                './resources/default_app',
                'ui_resources_200_percent.pak',
                'content_resources_200_percent.pak',
            ];
            break;
        case 'darwin':
            filesToBeRemoved = [
                '*.html',
                'LICENSE',
                'version',
                '/' + APP_NAME + '.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Resources/snapshot_blob.bin',
            ];
            break;
        case 'linux':
            filesToBeRemoved = [
                '*.html',
                'LICENSE',
                'version',
                'locales/*.*',
                'snapshot_blob.bin',
                './resources/default_app',
            ];
            break;
    }
    filesToBeRemoved = filesToBeRemoved.map((file) => {
        return path.join(distPath, file);
    });
    console.log('Removed unnecessary files.');
    return gulp.src(filesToBeRemoved).pipe(clean());
}

var compressFiles = function (platform, distPath, callback) {
    var upx = '';
    var filesToBeCompressed = [];
    switch (platform) {
        case 'win32':
            upx = path.join(__dirname, 'tools/upx.exe')
            filesToBeCompressed = [
                'node.dll',
                'libEGL.dll',
                'msvcr120.dll',
                'msvcp120.dll',
                'libGLESv2.dll',
                APP_NAME + '.exe',
            ];
            break;
        case 'darwin':
            upx = path.join(__dirname, 'tools/upx');
            break;
        case 'linux':
            upx = path.join(__dirname, 'tools/upx-' + process.arch);
            filesToBeCompressed = [
                APP_NAME,
                'libnode.so',
            ];
            break;
    }
    console.log('Compressing executables...');
    filesToBeCompressed.forEach((file) => {
        var fullPath = path.join(distPath, file);
        childProcess.exec(upx + ' -9 ' + fullPath, function (error, stdout, stderr) {
            if (error) {
                gutil.log(error);
            }
            gutil.log(stdout, stderr);
        });
    });
}

var buildPackage = function (platform, arch, callback) {
    var icon;
    switch (platform) {
        case 'win32':
            icon = './app/assets/images/icon.ico';
            break;
        case 'darwin':
            icon = './app/assets/images/icon.icns';
            break;
        default:
            icon = './app/assets/images/icon.png';
            break;
    }
    packager({
        arch: arch,
        icon: icon,
        dir: './app',
        out: './build',
        name: APP_NAME,
        version: '0.36.2',
        platform: platform,
    }, function (err, appPath) {
        if (appPath) {
            var distPath = appPath[0];
            console.log(distPath)
            callback && callback(platform, arch, distPath);
        }
    });
}

var afterPackage = function (platform, arch, distPath) {
    deleteUselessFiles(platform, distPath);
    compressFiles(platform, distPath);
}

gulp.task('package', ['build'], function (callback) {
    gulp.src('./app/*.map').pipe(clean());
    if (process.arch !== 'ia32') {
        buildPackage(process.platform, process.arch, afterPackage);
    }
    if (process.platform !== 'darwin') {
        buildPackage(process.platform, 'ia32', afterPackage);
    }
});

gulp.task('package-uncompressed', ['build'], function (callback) {
    gulp.src('./app/*.map').pipe(clean());
    if (process.arch !== 'ia32') {
        buildPackage(process.platform, process.arch);
    }
    if (process.platform !== 'darwin') {
        buildPackage(process.platform, 'ia32');
    }
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
    gulp.watch(['./src/js/**/*.*',
                './src/app.config.js'], ['webpack']);
    gulp.watch(['./src/*.html',
                './package.json',
                './src/browser.js',
                './src/assets/**/*.*',
                './src/app.config.js',
                './node_modules/electron-sudo/**'], ['copy']);
});

gulp.task('default', ['build']);


//last but not least
   

    // Create an electron-connect server to enable reloading
    const electron = require('electron-connect').server.create();

    gulp.task('start', ()=>{
      electron.start();
      //Watch js files and restart Electron if they change
      gulp.watch(['./app/js/*.js'], electron.restart);
      //watch css files, but only reload (no restart necessary)
      gulp.watch(['./app/css/*.css'], electron.reload);
      //watch html
      gulp.watch(['./index.html'], electron.reload);
    });
