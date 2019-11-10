const gulp = require('gulp');
const concat = require('gulp-concat');
const del = require('del');
const sass = require('gulp-sass');
const autoprefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function htmlBuild() {  // собираем все html файлы
  return gulp.src('src/*.html')
              .pipe(gulp.dest('build/'));
}

gulp.task('html', htmlBuild); // - регистрируем новую задачу


gulp.task('scripts', function() {
  return gulp.src('src/js/plugins/*.js') // собираем все js файлы
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js/'))
      .pipe(browserSync.stream());
});

gulp.task('clearBuild', function() {  // - очистка папки build от ненужных файлов
  return del(['build/*'])
});

gulp.task('css', function() {
  return gulp.src('src/scss/style.scss') // - сборка и преобразование scss в css
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(autoprefix({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gulp.dest('build/css/'))
      .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp.src('src/img/**/*.*')
      .pipe(gulp.dest('build/img/'));
});
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**/*.*')   // - сборка шрифтов и картинок
      .pipe(gulp.dest('build/fonts/'));
});

gulp.task('build',
  gulp.series(
      'clearBuild',
      gulp.parallel('html', 'scripts', 'css', 'fonts', 'img' )  // - серия вызовов тасков
  )
);

const config = {
  server: {
      baseDir: "./build"    // - конфиг для лок сервера
  },
  tunnel: false,
  host: 'localhost',
  port: 3333
};

gulp.task('watch', function() {
  browserSync.init(config);
  gulp.watch('src/scss/**/*.scss', gulp.series('css'));
  gulp.watch('src/js/plugins/*.js', gulp.series('scripts'));
  gulp.watch('src/*.html',  gulp.series('html')).on('change', browserSync.reload); // - наблюдаем за измением в файлах
});

gulp.task('start', gulp.series('build', 'watch'));  // - базовая серия с вотчером и сборкой в прод