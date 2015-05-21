var gulp = require('gulp'),
    opn = require('opn'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    filter = require('gulp-filter'),
    wiredep = require('wiredep').stream,
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    size = require('gulp-size'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;


//==============================================
//==============================================
//============= Local Development ==============

gulp.task('server', ['jade', 'sass'], function () {  
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: 'app'
    }
  });  
});

gulp.task('sass', function () {
    gulp.src('./app/scss/*.scss')
        .pipe(sass())
        .on('error', log)
        .pipe(gulp.dest('./app/css'));
});

gulp.task('jade', function() {
  gulp.src('./app/templates/pages/*.jade')
    .pipe(jade({
        pretty: true
    }))
    .on('error', log)
    .pipe(gulp.dest('./app/'))
     .pipe(reload({stream: true}));
});

gulp.task('wiredep', function () {
  gulp.src('app/templates/common/*.jade')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app/templates/common/'))
});

gulp.task('watch', function() {
    gulp.watch(['./app/templates/**/*.jade'], ['jade']);
    gulp.watch(['./app/scss/*.scss'], ['sass']);
    gulp.watch([
        './app/css/*.css',
        './app/js/*.js'
    ]).on('change', reload);
});

gulp.task('default', ['server', 'watch']);

//==============================================
//==============================================
//=============== Dist Building ================
// gulp.task('clean', function () {
//   return gulp.src('dist')
//     .pipe(clean());
// });

// gulp.task('useref', function () {
//   var assets = useref.assets();
//   return gulp.src('app/*.html')
//     .pipe(assets)
//     .pipe(gulpif('*.js', uglify()))
//     .pipe(gulpif('*.css', minifyCss({
//       compatibility: 'ie8'
//     })))
//     .pipe(assets.restore())
//     .pipe(useref())
//     .pipe(gulp.dest('dist'));
// });

// gulp.task('fonts', function() {
//   gulp.src('app/fonts/*')
//     .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
//     .pipe(gulp.dest('dist/fonts/'))
// });

// gulp.task('images', function () {
//   return gulp.src('app/images/**/*')
//     .pipe(imagemin({
//       progressive: true,
//       interlaced: true
//     }))
//     .pipe(gulp.dest('dist/images'));
// });

// gulp.task('extras', function () {
//   return gulp.src([
//     'app/*.*',
//     '!app/*.html'
//   ]).pipe(gulp.dest('dist'));
// });

// gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
//   return gulp.src('dist/**/*').pipe(size({title: 'build'}));
// });

// gulp.task('build', ['clean', 'jade'], function () {
//   gulp.start('dist');
// });

// gulp.task('server-dist', function () {  
//   browserSync({
//     notify: false,
//     port: 9000,
//     server: {
//       baseDir: 'dist'
//     }
//   });
// });

//==============================================
//==============================================
//================= Functions ==================
function log(error) {
    console.log([
        '',
        "----------ERROR MESSAGE START----------",
        ("[" + error.name + " in " + error.plugin + "]"),
        error.message,
        "----------ERROR MESSAGE END----------",
        ''
    ].join('\n'));
    this.end();
}