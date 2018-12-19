const gulp       = require('gulp')
const gutil      = require('gulp-util')
const livereload = require('gulp-livereload')
const nodemon    = require('gulp-nodemon')
const notify     = require('gulp-notify')
const sass       = require('gulp-sass')
const pumbler    = require('gulp-plumber')
const changed    = require('gulp-changed')

const path = {
    htmlSrc: 'src/views/',
    sassSrc: 'public/scss/',
    jsSrc:   'public/js/',
    buildDir: 'build/'
}

let onError = (error) =>{
    gutil.beep()
    gutil.log(gutil.colors.red(error))
}

let initServer = ()=>{
    livereload.listen()

    nodemon({
        script: 'app.js',
        ext: 'js'
    })
    .on('restart', ()=>{
        gulp.src('app,.js')
            .pipe(livereload())
            .pipe(notify('Reloading...'))
    })
}

gulp.task('build-html', ()=>{
    return gulp
        .src(path.htmlSrc.concat('**/*.ejs'))
        .pipe(gulp.dest(path.buildDir.concat('/views')))
        .pipe(livereload())
})
gulp.task('build-css', ()=>{
    return gulp
        .src(path.sassSrc.concat('**/*.scss'))
        .pipe(sass({
            includePaths: require('node-neat').includePaths,
            style: 'nested',
            onError: ()=>{
                console.log('Sass error')
            }
        }))
        .pipe(pumbler({errorHandles: onError}))
        .pipe(gulp.dest(path.buildDir.concat('/css')))
        .pipe(livereload())
})

gulp.task('build-js', ()=>{
    return gulp
        .src(path.jsSrc.concat('*.js'))
        .pipe(pumbler({errorHandles: onError}))
        .pipe(changed(path.buildDir.concat('/js')))
        .pipe(gulp.dest(path.buildDir.concat('/js')))
        .pipe(livereload())
        
})

gulp.task('build', ['build-html', 'build-css', 'build-js'], ()=>{
    return initServer()
})

gulp.task('watch', ()=>{
    gulp.watch('src/views/**/*.ejs', ['build-html'])
    gulp.watch('public/scss/**', ['build-css'])
    gulp.watch('public/js/**/*.js', ['js'])
})

const env = process.env.NODE_ENV || 'development'

if (env == 'development') {
    return gulp.task('default', ['build', 'watch'])
}
