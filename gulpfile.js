var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var browserSync = require('browser-sync').create();
var nodemailer = require('nodemailer');
var del = require('del');
var fs = require('fs');

var conf = {
    html: './src/*.html',
    css: './src/*.css',
    dist: './dist/'
};

gulp.task('build', function() {
    return gulp.src(conf.html)
        .pipe(inlineCss({
            removeHtmlSelectors: true
        }))
        .pipe(gulp.dest(conf.dist))
        .pipe(browserSync.stream())
    ;
});

gulp.task('clean', function() {
    del(conf.dist);
});

gulp.task('serve', function() {
    browserSync.init({
        server: conf.dist
    });

    gulp.watch([conf.html, conf.css], ['build']);
});

gulp.task('default', ['build', 'serve']);
