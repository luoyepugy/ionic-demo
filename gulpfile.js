var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var pngquant = require('imagemin-pngquant');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync').create();

// scss文件对象
var sassFiles = {
    "xxx" : {
        src: "./src/scss/*.scss",
        dest: "./www/css/"
    }
};

// css
gulp.task('scss',function (){
    return plugins.groupFiles(sassFiles,function (key,fileset){
        return gulp.src(fileset.src)
            .pipe(plugins.sass({
              errLogToConsole: true,
              outputStyle: 'compressed'
            }))
            .pipe(plugins.autoprefixer({
                browsers: ['last 2 versions','safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
                cascade: false,
                remove:true
            }))
            .pipe(plugins.rename({ suffix: '.min' }))
            .pipe(gulp.dest(fileset.dest))
            .pipe(browserSync.stream());
    })();
});

// js
gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./www/js/'));
});
// 等待js任务执行完成，在浏览器加载前
gulp.task('js-watch', ['js'], browserSync.reload);

// 图片压缩
gulp.task('imagemin', function () {
    return gulp.src('./src/img/*')
        .pipe(plugins.imagemin({
            progressive: true,                      //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],  //不要移除svg的viewbox属性
            use: [pngquant()]                       //使用pngquant深度压缩png图片的imagemin插件
        }))
        .pipe(gulp.dest('./www/img/'));
});

// 雪碧图
gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('./src/img/sprite/*') // source path of the sprite images
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.css',
        }));

    spriteData.img.pipe(gulp.dest('./www/css/sprite/')); // output path for the sprite
    spriteData.css.pipe(gulp.dest('./www/css/sprite/')); // output path for the CSS
});

// 监听
gulp.task('watch',['scss'], function() {
    browserSync.init({
        server: "./www"
    });
    gulp.watch('src/**/*.scss', ['scss']);
    gulp.watch('src/js/**/*.js', ['js-watch']);
    gulp.watch("www/**/*.html").on('change', browserSync.reload);
});

// 默认任务
gulp.task('default', ['watch']);
gulp.task('img', ['imagemin','sprite']);



// git-check
gulp.task('install', ['git-check'], function() {
    return plugins.bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
        '  ' + gutil.colors.red('Git is not installed.'),
        '\n  Git, the version control system, is required to download Ionic.',
        '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
        '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
