// List Dependency
const {src, dest, watch, series } = require('gulp');
const minify = require('gulp-clean-css'); 
const imagemin = require('gulp-imagemin'); 
const imagewebp = require('gulp-webp'); 
const terser = require('gulp-terser');
const fileInclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();

///////////////////////////////
/// Config
//////////////////////////////

//Component
SRC_COMPONENT = ['src/**/*.html', '!src/component/**']
DEST_COMPONENT = './public'

//Js
SRC_JS = 'src/js/*.js'
DEST_JS = 'public/assets/js'

//Css
SRC_CSS = 'src/css/*.css'
DEST_CSS = 'public/assets/css'

//images
SRC_IMAGES = "src/images/**/*.{jpg,png}"
DEST_IMAGES = 'public/assets/images'



// Functions

// Include component
function includeComponent() {
    return src(SRC_COMPONENT)
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(dest(DEST_COMPONENT));
  };

// Minify css
function cssmin(){
    return src(SRC_CSS)
    .pipe(minify())
    .pipe(dest(DEST_CSS));
};

// Minify js
function jsmin(){
    return src(SRC_JS)
    .pipe(terser())
    .pipe(dest(DEST_JS));
};

// Images
function optimizeimg(){
    return src(SRC_IMAGES)
    .pipe(imagemin())
    .pipe(dest(DEST_IMAGES));
};

// Webp
function webpimage(){
    return src(SRC_IMAGES)
    .pipe(imagewebp())
    .pipe(dest(DEST_IMAGES));
};

// Markdown to HTML
function markdownToHtml(){
    return src('src/md/urbanartt-experience.md')
    .pipe(markdown())
    .pipe(dest('public/experiences'));
}

// WatchTask
function watchTask(){
    watch('src/*.html', includeComponent);
    watch(SRC_CSS, cssmin);
    watch(SRC_JS, jsmin);
    watch(SRC_IMAGES, optimizeimg);
    watch(SRC_IMAGES, webpimage);
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
    webpimage,
    //markdownToHtml,
    serve,
    watchTask
);
