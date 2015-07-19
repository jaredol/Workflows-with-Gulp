var gulp = require('gulp');
var gutil = require('gulp-util');
var coffee = require('gulp-coffee');
var compass = require('gulp-compass');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');


var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss'];


gulp.task('coffee', function(){
  gulp.src('components/coffee/tagline.coffee')
    .pipe(coffee({ bare: true})
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'))
});


gulp.task('js', function(){
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
});


gulp.task('watch', function(){
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['js']);
  gulp.watch('components/sass/*.scss', ['compass'])
})


gulp.task('default', ['js', 'coffee']);




gulp.task('compass', function(){
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      image: 'builds/development/images',
      style: 'expanded'
    }))
    .pipe(gulp.dest('builds/development/css'))
});




