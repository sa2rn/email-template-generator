var gulp = require('gulp');
var inlineCss = require('gulp-inline-css');
var taskListing = require('gulp-task-listing');
var browserSync = require('browser-sync').create();
var nodemailer = require('nodemailer');
var del = require('del');
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var _ = require('lodash');

var conf = require('./config.json');

var transport = nodemailer.createTransport(conf.smtp);

gulp.task('help', taskListing);

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

// array of template paths
var templates = glob.sync(conf.html);

// array of task names
var taskList = templates.map(function(file) {
    var parsedFile = path.parse(file);

    // create new task 4 template
    gulp.task('send:' + parsedFile.name, ['build'], function() {
        sendTemplate(parsedFile.base);
    });

    return parsedFile.name;
});

gulp.task('send', taskList);

gulp.task('serve', function() {
    browserSync.init({
        server: conf.dist
    });

    gulp.watch([conf.html, conf.css], ['build']);
});

gulp.task('default', ['build', 'serve']);

// Send email
function sendTemplate(basename) {
    fs.readFile(conf.dist + '/' + basename , 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        var options = _.assignIn(conf.email, {'subject': 'Template: ' + basename, 'html': data});
        transport.sendMail(options, function(error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    });
}
