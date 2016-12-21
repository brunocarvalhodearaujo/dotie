var pkg = require('./package.json')
var gulp = require('gulp')
var browserify = require('gulp-browserify')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')

gulp.task('build', function () {
  return gulp.src('src/main.js')
    .pipe(browserify({ transform: [ 'babelify' ] }))
    .pipe(uglify({ mangle: false, output: { beautify: true }, compress: false }))
    .pipe(rename({ basename: pkg.name }))
    .pipe(gulp.dest('dist'))
})

gulp.task('minify', [ 'build' ], function() {
  return gulp.src('dist/dotie.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'))
})

gulp.task('default', [ 'minify' ])
