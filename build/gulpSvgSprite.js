let path = require('path');

let gulp = require("gulp");
let watch = require('gulp-watch');
let svgSprite = require('gulp-svg-sprite');

let src = path.resolve(__dirname, '../src/svg'),
    dist = path.resolve(__dirname, '../public/dist');


let build = function () {
    console.log('Svg sprite build');
    return gulp.src(src + '/**/*.svg')
        .pipe(svgSprite({
            shape: {
                dimension: {
                    maxWidth: 32,
                    maxHeight: 32
                }
            },
            mode: {
                symbol: {
                    example: true
                },
            }
        }))
        .pipe(gulp.dest(dist));
};

gulp.task('default', build);

gulp.task('watch', function(){
    watch(src + '/**/*.svg', build);
});