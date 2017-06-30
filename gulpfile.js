var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    csso = require('gulp-csso'),
    rename = require('gulp-rename');


gulp.task('sass', function () {
    return gulp.src('source/sass/main.sass')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(csso())
        .pipe(rename('main-min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('css-libs', function () {
    return gulp.src('css/main.css')
        .pipe(csso())
        .pipe(rename('main-min.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    browserSync.init({
        // server: {
        //     baseDir: './'
        // },
        proxy:'t',
        notify: false
    });
});

gulp.task('watch', ['browser-sync','sass'], function () {
    gulp.watch('source/sass/**/*.sass', ['sass']);
    gulp.watch('css/**/*.css', ['css-libs']);
    gulp.watch('*.php', browserSync.reload);
});