var gulp = require('gulp');

var config = require('../../config');

gulp.task('copy', ['copy:templates']);

gulp.task('copy:templates', function() {
  gulp.src(config.templates.src)
    .pipe(gulp.dest(config.markup.dest));
});

gulp.task('copy:css', function() {
	gulp.src('build/css/*')
		.pipe(gulp.dest('build/guide/css'));
});
