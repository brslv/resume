const gulp             = require('gulp');
const sass             = require('gulp-sass');
const livereload       = require('gulp-livereload');
const plumber          = require('gulp-plumber');
const livereloadServer = require('gulp-server-livereload');

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(livereloadServer({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});

gulp.task('sass', function() {
  livereload.listen({
    start: true
  });
  return gulp.src('./css/src/**/*.scss')
      .pipe(plumber())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./css/dist'))
      .pipe(livereload());
});

gulp.task('html', function () {
  return gulp.src('./**/*.html')
    .pipe(livereload());
});

gulp.watch('./css/src/**/*.scss', ['sass']);
gulp.watch('./**/*html', ['sass', 'html']);

gulp.task('default', ['webserver', 'sass', 'html']);