// generated on 2015-08-08 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import babelify from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import del from 'del';

// import Notification from 'node-notifier';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles', () => {
  return gulp.src('app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.', 'bower_components/bootstrap-sass/assets/stylesheets/']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/es6/**/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

// Combine svg files and inject it into index.html
gulp.task('svg', () => {
    var svgs = gulp
        .src('app/images/svg/*.svg')
        .pipe($.svgmin())
        .pipe($.svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('app/index.html')
        .pipe($.inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('app'));
});

var notifier = require('node-notifier');
// Standard handler
var standardHandler = function (err) {
  // Notification
  // var notifier = new notification();
  notifier.notify({ message: 'Error: ' + err.message });
  // Log to console
  $.util.log($.util.colors.red('Error'), err.message);
}

// Es6 browserify and babel
// enable module system
gulp.task('es6', () => {

  browserify({
    entries: './app/es6/main.js',
      debug: true
    })
    .transform(babelify)
    .on('error', standardHandler)
    .bundle()
    .on('error', standardHandler)
    .pipe(source('main.js'))
    .pipe(gulp.dest('./app/scripts/'));
});

// Copy google map dependecies for build
gulp.task('google-map', () => {

  var goMap = require('./bower_components/google-map/bower.json').dependencies;
  var src = ['./bower_components/google-map/*', './bower_components/iron-jsonp-library/*'];

  for(var attr in goMap){
    if (attr) {
      src.push('./bower_components/'+ attr.toString() + '/*');
    }
  }

  return gulp
      .src(src, { base: './' })
      .pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['svg', 'es6', 'styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['styles']);
  gulp.watch('app/es6/**/*.js', ['es6']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('app/images/svg/*.svg', ['svg']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'svg', 'es6', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
