'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var docco = require("gulp-docco");
var browserify = require('gulp-browserify');
var babel = require("gulp-babel");
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var nodemon = require('gulp-nodemon');
var folderToc = require("folder-toc");

gulp.task('scripts', function() {
    return gulp.src('./app/app.js')
        .pipe(browserify({
            transform: ['babelify'],
            blacklist: ['useStrict'],
            insertGlobals : true,
            debug: true
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/'))
});

gulp.task('sass', function () {
    return gulp.src('./app/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src('./app/index.html')
        .pipe(gulp.dest('./dist/'));
});

gulp.task('webserver', ['chatserver', 'build'], function() {
   return gulp.src('./dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('chatserver', function (cb) {
    var called = false;
    return nodemon({
        script: 'server/server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    }).on('start', function() {
        if(!called) {
            called = true;
            cb();
        }
    });
});

gulp.task('coverage', ['chatserver', 'build'], function() {
    return gulp.src('./dist')
        .pipe(webserver({
            fallback: 'index.html',
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('docco', function() {
    gulp.src(['./app/**/*.js', './server/**/*.js'])
        .pipe(docco())
        .pipe(gulp.dest('./documentation'));

    folderToc('./documentation', {
        name : 'index.html',
        layout: 'classic',
        filter: '*.html',
        title: 'Overview'
    });
});

gulp.task('doccoserver', ['docco'], function (cb) {
    return gulp.src('./documentation')
        .pipe(webserver({
            fallback: 'app.html',
            livereload: false,
            directoryListing: false,
            open: true
        }));
});

gulp.task('mocha', function () {
    return gulp.src('test/**/*Spec.js', {read: false})
        .pipe(mocha({reporter: 'nyan', compilers:'js:babel-core/register'}));
});

gulp.task('coverage', function (cb) {
    gulp.src(['app/**/*.js', 'server/**/*.js'])
        .pipe(babel())
        .pipe(istanbul())
        .pipe(istanbul.hookRequire())
        .on('finish', function () {
            gulp.src(['test/*.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
                .on('end', cb);
        });
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.scss', ['sass']);
    gulp.watch('./app/**/*.js', ['scripts']);
    gulp.watch('./app/**/*.html', ['html']);
});

gulp.task('default', ['serve', 'watch']);
gulp.task('serve', ['webserver']);
gulp.task('build', ['sass', 'scripts', 'html']);
gulp.task('test', ['mocha', 'coverage']);
gulp.task('doc', ['doccoserver']);
