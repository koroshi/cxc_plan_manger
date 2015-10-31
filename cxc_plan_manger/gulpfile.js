var yargs = require('yargs').argv;
var gulp = require('gulp');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
// var minify = require('gulp-minify-css');
// var rename = require('gulp-rename');
// var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');

gulp.task('clean',function(){
    gulp.src('./dist/*', {read:false})
        .pipe(clean());
});

gulp.task('copy',function(){
    gulp.src('./views/index.html')
        .pipe(gulp.dest('./dist/views/'));
    gulp.src('./public/javascripts/build/{react*min.js,JSXTransformer.js}')
        .pipe(gulp.dest('./dist/public/javascripts/build/'));
    
});


gulp.task('usemin', function() {
  return gulp.src('./views/index.html')
    .pipe(usemin({
    //   css: [ rev() ],
    //   html: [ minifyHtml({ empty: true }) ],
    //   js: [ uglify(), rev() ],
    //   inlinejs: [ uglify() ],
    //   inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest('./dist/views/'));
});

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        ui: {
            port: 8081,
            weinre: {
                port: 9090
            }
        },
        port: 8080,
        startPath: '/views'
    });
});


// 参数说明
//  -w: 实时监听
//  -s: 启动服务器
//  -p: 服务器启动端口，默认8080
gulp.task('default', function () {
    if (yargs.s) {
        gulp.start('server');
    }
    if (yargs.w) {
        // gulp.start('release');
        // gulp.start('watch');
    } else {
        // gulp.start('release');
    }
});