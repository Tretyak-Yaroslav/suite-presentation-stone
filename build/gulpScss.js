let path = require('path');

let gulp = require("gulp");
let sass = require('gulp-sass');
sass.compiler = require('node-sass');
let sourcemaps = require('gulp-sourcemaps');
let cssimport = require("gulp-cssimport");
let sassGlob = require('gulp-sass-glob');
let autoprefixer = require('gulp-autoprefixer');

// let src = path.resolve(__dirname, '../src/scss'),
//     dist = path.resolve(__dirname, '../dist/');

gulp.task('default', function () {
    return gulp.src('../src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: [
                path.resolve(__dirname, '../node_modules')
            ],
        }).on('error', sass.logError))
        .pipe(cssimport({
            includePaths: [
                path.resolve(__dirname, '.'),
                path.resolve(__dirname, '../node_modules')
            ]
        }))
        .pipe(autoprefixer({
            browsers: ['since 2010'],
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../public/dist/'));
});

gulp.task('watch', function(){
    gulp.watch('../src/scss/**/*.scss', gulp.series('default'));
    gulp.watch('../src/app/components/**/*.scss', gulp.series('default'));
});