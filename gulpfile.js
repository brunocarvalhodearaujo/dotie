const gulp = require('gulp')
const plumber = require('plumber')
const browserify = require('browserify')

gulp.task('default', function () {
  return gulp.src('src/client/**/main.js')
    .pipe(plumber())
    .pipe(browserify({ transform: [ 'babelify', 'browserify-ngannotate' ] }))
    .pipe(gulp.dest('dist'))
})
