const pkg = require('./package.json')
const gulp = require('gulp')
const browserify = require('gulp-browserify')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')

gulp.task('build', function () {
  return gulp.src('lib/main.js')
    .pipe(browserify())
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
