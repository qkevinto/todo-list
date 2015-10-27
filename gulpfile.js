var gulp = require('gulp');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var babel = require('gulp-babel');

var paths = {
  base: './',
  js: {
    source: './scripts/*.js',
    dest: './js'
  },
  css: {
    source: './css/*.css',
    dest: './css'
  },
  html: {
    source: './*.html'
  }
}


// JavaScript Linter
gulp.task('lint', function() {
  return gulp.src(paths.js.source)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

// Babel - ES6 Transpiler
gulp.task('babel', function() {
  return gulp.src(paths.js.source)
    .pipe(babel())
    .pipe(gulp.dest(paths.js.dest));
});

// CSS
gulp.task('css', function() {
  return gulp.src(paths.css.source)
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
});

// JavaScript
gulp.task('js', ['lint', 'babel'], browserSync.reload);

// Build
gulp.task('build', ['css', 'js']);

// Serve
gulp.task('serve', ['build'], function () {
  browserSync({
    server: {
      baseDir: paths.base
    }
  });

  gulp.watch(paths.js.source, ['js']);
  gulp.watch(paths.css.source, ['css']);
  gulp.watch(paths.html.source, browserSync.reload);
});

// Default
gulp.task('default', ['serve']);
