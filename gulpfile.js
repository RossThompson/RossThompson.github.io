const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

//complie sass & inject into browser

gulp.task('sass',()=>{
  return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','docs/scss/*.scss'])
  .pipe(sass())
  .pipe(gulp.dest("docs/css"))
  .pipe(browserSync.stream());
});
//move js files to src
gulp.task('js',()=>{
  return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
  .pipe(gulp.dest("docs/js"))
  .pipe(browserSync.stream());
});

//Watch Sass files & server
gulp.task('serve',['sass'],()=>{
  browserSync.init({
    server:"./docs"
  });

  gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass'])
  gulp.watch("docs/*.html").on('change',browserSync.reload);
});


//move fonts folder to src

gulp.task('fonts',()=>{
  return gulp.src('node_modules/font-awesome/fonts/*')
  .pipe(gulp.dest("docs/fonts"))
})

//move font-awseome css
gulp.task('fa',()=>{
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest("docs/css"))
});

gulp.task('default',['js','serve','fa','fonts'])
