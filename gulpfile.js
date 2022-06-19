// List Dependency
const {src, dest, watch, series } = require('gulp');
const minify = require('gulp-clean-css'); 
const imagemin = require('gulp-imagemin'); 
const imagewebp = require('gulp-webp'); 
const terser = require('gulp-terser');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const markdownHTML = require('gulp-markdown');

///////////////////////////////
/// Config
//////////////////////////////


// Functions

// Include component
function includeComponent() {
    return src(['src/**/*.html', '!src/component/**'])
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(dest('./public'));
  };

//minify css
function cssmin(){
    return src('src/css/*.css')
    .pipe(minify())
    .pipe(dest('public/assets/css'));
};

//minify js
function jsmin(){
    return src('src/js/*.js')
    .pipe(terser())
    .pipe(dest('public/assets/js'));
};

// images
function optimizeimg(){
    return src('src/images/**/.*{jpg,png}')
    .pipe(imagemin())
    .pipe(dest('public/assets/images/minified'));
};

// webp
function webpImage(){
    return src('src/images/**/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('public/assets/images'))
};

//Markdown to HTML
function markdownToHTML(){
    return src('src/md')
    .pipe(markrdownHTML())
    .pipe(dest('public/experiences'))
}

// WatchTask
function watchTask(){
    watch('src/*.html', includeComponent);
    watch('src/css/*.css', cssmin);
    watch('src/js/*.js', jsmin);
    watch('src/images/**/*.{jpg,png}', optimizeimg);
    watch('src/images/**/*.{jpg,png}', webpImage);
};

// Static server
function serve(){
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });
};

// Default
exports.default = series(
    includeComponent,
    cssmin,
    jsmin,
    optimizeimg,
    webpImage,
    serve,
    watchTask
);
