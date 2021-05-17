const {src,dest,watch} = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
// 拷贝首页
function cIndex(){
    return src('./src/index.html').pipe(dest('./dist'));
}
//css压缩
function css(){
    return src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/css'));
}
// 压缩js
// function js(){
//     return src('./src/js*.js')
//     .pipe(babel({
//         presets: ['@babel/env']
//     }))
//     .pipe(uglify())
//     .pipe(rename({suffix : '.min'}))
//     .pipe(dest('./dist/js'));
// }
function js(){
    return src('./src/js/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(rename({suffix : '.min'}))
    .pipe(dest('./dist/js'));
}
// 压缩img
function img(){
    return src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
// 压缩html
function html(){
    return src('./src/pagas/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pagas'));
}
// 设置监听
function fnWatch(){
    watch('./src/index.html',cIndex);
    watch('./src/sass/*.scss',css);
    watch('./src/js/*.js',js);
    watch('./src/pages/*.html',html);
}
exports.index = cIndex;
exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
exports.default = fnWatch;