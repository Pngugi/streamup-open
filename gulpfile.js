var gulp = require('gulp');
var tsb = require('gulp-tsb');
var util = require('./build/lib/util');
var watcher = require('./build/lib/watch');
var assign = require('object-assign');

var compilation = tsb.create(assign({ verbose: true }, require('./tsconfig.json').compilerOptions));

gulp.task('compile', function() {
	return gulp.src('src/**/*.ts', { base: '.' })
		.pipe(compilation())
		.pipe(gulp.dest(''));
});

gulp.task('watch', function() {
	var src = gulp.src('**/*.ts', { base: '.' });

	return watcher('**/*.ts', { base: '.' })
		.pipe(util.incremental(compilation, src))
		.pipe(gulp.dest(''));
});




//distribution tasks
var run = require('gulp-run'),
	asar = require('asar'),
	clean = require('gulp-clean')
;
gulp.task('clean',function(){
	return gulp.src('package',{read:false})
	.pipe(clean({fodler:true}));
});
gulp.task('copy-app',['clean'],function(){
	return gulp.src(['src/**/*','Views/**/**','package.json'],{base: '.'})
	.pipe(gulp.dest('package'));
});
gulp.task('package',['copy-app'],function(){
	return gulp.src('package/**/*')
	.pipe(asar('app.asar'))
	.pipe(gulp.dest('build'));
});

gulp.task('run',function(){
	return run('electon . --all').exec();
});


//load linux compile structure
require('require-dir')('./build/linux');
gulp.task(['buildRpmPackage'], function () {
  
});
gulp.task('default', ['compile']);