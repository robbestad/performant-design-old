var gulp = require('gulp');
var concat = require('gulp-concat');
var scss = require('gulp-sass');
var uglify = require('gulp-uglify');
var prettify = require('gulp-prettify');
var cssmin = require('gulp-cssmin');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var notify = require("gulp-notify");
var pngcrush = require('imagemin-pngcrush');


var paths = {
  scripts: ['bower_components/jquery/dist/jquery.js', 'bower_components/barekit/js/barekit.min.js', 'dev/js/**/*.js'],
  images: 'dev/images/**/*',
  html: 'dev/html/**/*',
  scss: ['dev/scss/main.scss', 'bower_components/barekit/css/barekit.scss']
};

gulp.task('init', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['dist'], cb);
});

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('htmlcat', function(){
    return gulp.src(paths.html)
    .pipe(prettify())
    .pipe(gulp.dest('dist'));
});

gulp.task('prettify', function(){
    return gulp.src('html/**/*')
    .pipe(prettify())
    .pipe(notify("Created index.html"))

    .pipe(gulp.dest('html/**/*'));
});

gulp.task('sass', function() {
  return gulp.src(paths.scss)
  .pipe(scss())
  .pipe(autoprefixer())
  .pipe(cssmin())
  .pipe(gulp.dest('build/css'));
});

gulp.task('csscat', ['sass'], function() {
  return gulp.src('build/css/**/*')
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('uglifyjs', ['sass'], function() {
  return gulp.src(paths.scripts)
  .pipe(uglify())
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
    }))
    .pipe(gulp.dest('dist/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts','clean']);
  gulp.watch(paths.scss, ['csscat','clean']);
  gulp.watch(paths.html, ['htmlcat','clean']);
  gulp.watch(paths.images, ['images','clean']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'htmlcat', 'csscat','uglifyjs', 'images']);

