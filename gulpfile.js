var eslint = require('gulp-eslint');
var gulp = require('gulp');
var browserSync = require('browser-sync');
var babel = require('babel');

// JavaScript Linter
gulp.task('lint', function() {
  return gulp.src('./js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// ES6 Transpiler
gulp.task('babel', function() {
  return gulp.src('./js/*.js')
    .pipe(babel());
});

// CSS
gulp.task('css', function() {
  return gulp.src('./css/*.css')
    .pipe(browserSync.stream());
})

// JavaScript
gulp.task('js', ['lint'], ['babel'], browserSync.reload);

// Serve
gulp.task('serve', ['lint'], ['babel'], function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./css/*.css', ['css']);
});

// Default
gulp.task('default', ['serve']);
