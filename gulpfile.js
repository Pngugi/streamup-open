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

gulp.task('default', ['compile']);