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