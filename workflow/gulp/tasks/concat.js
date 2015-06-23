var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var using = require('gulp-using');
var replace = require('gulp-replace');
var tap = require('gulp-tap');
var header = require('gulp-header');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = require('../../config');

gulp.task('concat', ['concat:polyfill', 'concat:docs:js']);

gulp.task('concat:polyfill', function() {
  return gulp.src(config.polyfill.src)
    .pipe(gulpif(config.args.verbose, using({prefix:'Task [concat:polyfill] using'})))
    .pipe(concat(config.polyfill.name))
    .pipe(gulp.dest(config.polyfill.dest));
});


gulp.task('concat:docs:js', function() {
  return gulp.src(config.docs.js.src)
    .pipe(gulpif(config.args.verbose, using({prefix:'Task [concat:docs:js] using'})))
    .pipe(replace(config.regex.JSHINT, ''))
    .pipe(replace(config.regex.GLOBAL, ''))
    .pipe(tap(function(file) {
      var relativePath = file.path.match(/availity-angular(.*)/)[1];
      file.relativePath = relativePath;
    }))
    .pipe(header('// Source: <%= file.relativePath %>\n'))
    .pipe(concat(config.docs.js.name))
    .pipe(gulp.dest(config.docs.js.dest))
    .pipe(reload({ stream:true }));
});
