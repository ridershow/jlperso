// List Dependency
const {src, dest, watch, series } = require('gulp');
const minify = require('gulp-clean-css'); 
const imagemin = require('gulp-imagemin'); // Imagemin 7.1.0 required (not using ESM)
const imagewebp = require('gulp-webp'); 
const terser = require('gulp-terser');
const fileInclude = require('gulp-file-include');
const markdown = require('gulp-markdown') // Markdown 6.0.0 required (not using ESM)
const sitemap = require('gulp-sitemap')
const browserSync = require('browser-sync').create();

///////////////////////////////
/// Config
//////////////////////////////

//Component
const SRC_COMPONENT = ['src/**/*.html', '!src/component/**']
const PUBLIC = './public'

//Js
const SRC_JS = 'src/js/*.js'
const DEST_JS = 'public/assets/js'

//Css
const SRC_CSS = 'src/css/*.css'
const DEST_CSS = 'public/assets/css'

//images
const SRC_IMAGES = 'src/images/**/*.{jpg,png}'
const DEST_IMAGES = 'public/assets/images'

//MD files
const SRC_MD = 'src/md/*.md'
const DEST_MD = 'public/experiences'

//////////////////////////////

// Functions

// Include component
function includeComponent() {
    return src(SRC_COMPONENT)
      .pipe(fileInclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(dest(PUBLIC));
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
    return src(SRC_MD)
    .pipe(markdown())
    .pipe(dest(DEST_MD));
};

// Sitemap
function generateSitemap(){
    return src('./public/**/*.html', {
        read:false
    })
    .pipe(sitemap({
        siteUrl: 'https://jeremylanfranchi.com'
    })) // Returns sitemap.xml
    .pipe(dest('./public'));
};

// WatchTask
function watchTask(){
    watch(SRC_COMPONENT, includeComponent);
    watch(SRC_CSS, cssmin);
    watch(SRC_JS, jsmin);
    watch(SRC_IMAGES, optimizeimg);
    watch(SRC_IMAGES, webpimage);
};

// Static server
function serve(){
    browserSync.init({
        server: {
            baseDir: PUBLIC
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
    markdownToHtml,
    generateSitemap,
    serve,
    watchTask
);
