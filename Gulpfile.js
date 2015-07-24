'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    refresh = require('gulp-livereload'),
    nodemon = require('gulp-nodemon'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean');

// Local webserver: Express
var expressServer = require('./server');
gulp.task('serve_', function() {
  console.log('Server');
  expressServer.startServer();
});

gulp.task('serve', function () {
  nodemon({ script: 'server.js', ext: 'json js', ignore: ['public/*', 'client/*'] })
  .on('change', ['lint'])
  .on('restart', function () {
    console.log('Restarted webserver')
  });
});

// Dev task
gulp.task('dev', ['clean', 'sample', 'views', 'styles', 'lint', 'browserify', 'watch'], function() {});

// Clean out the public directory
gulp.task('clean', function() {
  console.log('Cleaning public ...');
  return gulp.src('public/js/*.js', {read: false})
        .pipe(clean());
});

// JSLint task
gulp.task('lint', function() {
  gulp.src('client/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('node_modules/bootstrap/dist/fonts/*')
  .pipe(gulp.dest('public/fonts/'));

  gulp.src('client/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('public/css/'));

});

// Browserify task
gulp.task('browserify', function() {
  var bundleStream = browserify({
    entries: ['./client/scripts/main.js'],
    debug: true
  })
  .bundle()
  .pipe(source('core.js'));

  return bundleStream.pipe(gulp.dest('./public/js'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('client/index.html')
  // And put it in the public folder
  .pipe(gulp.dest('public/'));

  // Any other view files from client/views
  gulp.src('client/views/**/*')
  // Will be put in the public/views folder
  .pipe(gulp.dest('public/views/'));
});

// Sample task
gulp.task('sample', function() {
  gulp.src('client/sample.hl7')
  .pipe(gulp.dest('public/'));
});

gulp.task('watch', ['serve', 'lint'], function() {
  // Start live reload server
  refresh.listen();

  // When scripts change, lint and browserify them
  gulp.watch(['client/scripts/*.js', 'client/scripts/**/*.js'],[
    'lint',
    'browserify'
  ]);

  // If sass files change, compile them
  gulp.watch(['client/styles/**/*.scss'], [
    'styles'
  ]);

  // If view files change, move them
  gulp.watch(['client/**/*.html'], [
    'views'
  ]);

  // If stuff changes in the public folder, refresh the express
  gulp.watch('./public/**').on('change', refresh.changed);

});

gulp.task('default', ['dev']);
