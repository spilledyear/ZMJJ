/**
 * Created by kaiyuyuan on 16/10/17.
 */
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'lazypipe']
});


// Handle config 开发环境
gulp.task('copy-config', function () {
  return gulp.src(['app/config/devConfig.json'])
    .pipe($.ngConfig('baseConfig'))
    .pipe($.rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

// Handle config 正式环境
gulp.task('copy-config-prod', function () {
  return gulp.src('app/config/prodConfig.json')
    .pipe($.ngConfig('baseConfig'))
    .pipe($.rename("baseConfig.js"))
    .pipe(gulp.dest('app/scripts'))
});

//下面者两个被我删了，谁会搞个不同的图标？

//配置开发环境 的正式环境的 config.Xml文件 和  app图标、启动页
// var configXMLPath = ['publish/dev/configxmlDev/*'];
// var configXMLProdPath = ['publish/prod/configxmlprod/*'];
//
// gulp.task('copy-configxml', function () {
//   return gulp.src(configXMLPath)
//     .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
//     .pipe($.sourcemaps.write('.'))
//     .pipe(gulp.dest(''));
// });
// gulp.task('copy-configxml-prod', function () {
//   return gulp.src(configXMLProdPath)
//     .pipe($.useref({noAssets: true}, $.lazypipe().pipe($.sourcemaps.init, {loadMaps: true})))
//     .pipe($.sourcemaps.write('.'))
//     .pipe(gulp.dest(''));
// });


// var resourcePath = ['publish/dev/resourcesDev/*/*/*', 'publish/dev/resourcesDev/*.png'];
// var resourcePathProd = ['publish/prod/resourcesProd/*/*/*', 'publish/prod/resourcesProd/*.png'];
// gulp.task('resource', function () {
//   return gulp.src(resourcePath)
//     .pipe(gulp.dest('resources'));
// });
// gulp.task('resourceProd', function () {
//   return gulp.src(resourcePathProd)
//     .pipe(gulp.dest('resources'));
// });





// Copy img
var imagePath = [
  "app/img/*",
  "app/img/*/*",
];
gulp.task('copy-img', function () {
  return gulp.src(imagePath)
    .pipe(gulp.dest('www/build/img'));
});

// Copy lib
var libPath = [
  'app/lib/**/*.*',
  'app/lib/**/**/*.*',
  'app/lib/**/**/**/*.*'
];
gulp.task('copy-lib', function () {
  return gulp.src(libPath)
    .pipe(gulp.dest('www/build/lib'));
});

// var libPublishFilePath = [
//   'app/lib/**/css/ionic.min.css',
//   'app/lib/**/fonts/*.*',
//   'app/lib/**/js/ionic.bundle.js',
//   'app/lib/**/rollups/md5.js',
//   'app/lib/**/dist/jquery.min.js',
//   'app/lib/**/dist/ng-cordova.js',
//   'app/lib/**/dist/ionic-datepicker.bundle.min.js',
//   'app/lib/**/hmsTable.html',
//   'app/lib/**/hmsDerective.js'
// ];
// gulp.task('copy-prod-libs', function () {
//   return gulp.src(libPublishFilePath)
//     .pipe(gulp.dest('www/build/lib'));
// });

// copy all files
// gulp.task('copy-dev', function () {
//   return gulp.src([
//       'src/**/*',
//       '!src/index.html',
//       '!src/scripts/*'])
//     .pipe(gulp.dest('www'));
// });

// copy product env files, ignore source and useless files
// gulp.task('copy-prod', function () {
//   return gulp.src([
//       'src/**/*',
//       '!src/index.html',
//       '!src/**/*.ts',
//       '!src/**/*.less',
//       '!src/**/*.sass',
//       '!src/**/*.styl',
//       '!src/css/*',
//       '!src/**/*.md',
//       '!src/scripts/*'])
//     .pipe(gulp.dest('www'));
// });
