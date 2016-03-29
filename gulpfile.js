'use strict';
var Server = require('karma').Server;
var assign = require('lodash/assign');
var argv = require('yargs').argv;
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var watchify = require('watchify');

// add custom browserify options here
var customOpts = {
  entries: ['./src/sinon-vcr.js'],
  debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('sinon-vcr.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist'))
}

gulp.task('build', function () {
  // js
  return bundle();
});

gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

gulp.task('default', ['test']);
