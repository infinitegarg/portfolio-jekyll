var gulp        = require('gulp');
var browserSync = require('browser-sync');
var $           = require('gulp-load-plugins')();

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
var sassPaths = [
 'bower_components/normalize.scss/sass',
 'bower_components/foundation-sites/scss',
 'bower_components/motion-ui/src'
];

gulp.task('sass', function() {
 return gulp.src('scss/app.scss')
   .pipe($.sass({
     includePaths: sassPaths,
     outputStyle: 'compressed' // if css compressed **file size**
   })
     .on('error', $.sass.logError))
   .pipe($.autoprefixer({
     browsers: ['last 2 versions', 'ie >= 9']
   }))
   .pipe(browserSync.reload({stream:true}))
   .pipe(gulp.dest('css'));
});

gulp.task('browser-sync', ['sass'], function() {
  browserSync({
    // server: {
    //   baseDir: '_site'
    // },
    proxy: "127.0.0.1:4000"
  });
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('scss/*.scss', ['sass']);
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['sass']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
