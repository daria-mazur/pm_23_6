import gulp from "gulp"
import gulpSass from "gulp-sass"              // плагін компілює файли SASS (або SCSS) у CSS
import concat from "gulp-concat"              
import uglify from "gulp-uglify"              
import imagemin from "gulp-imagemin"          
import cleanCSS from "gulp-clean-css"         // зменшення файлів CSS
import browserSync from "browser-sync"        
import autoprefixer from "gulp-autoprefixer"  // сумісность з різними браузерами
import sassCompiler from "node-sass"

const sass = gulpSass(sassCompiler)           // sass об'єктом, який містить налаштування для компіляції SASS файлів у CSS за допомогою Gulp

gulp.task("html", function() {                
    return gulp.src("app/*.html")
        .pipe(gulp.dest("dist/html"))         
        .pipe(browserSync.stream())
})

gulp.task("sass", function() {                // oб'єднання, додавання префіксів і подальша мінімізація коду Sass в CSS
    return gulp.src("app/sass/*.scss")
        .pipe(sass())                         // потік SCSS файлів проходить через функцію sass(), яка компілює їх у CSS
        .pipe(concat("styles.min.css"))       
        .pipe(autoprefixer())                 // сумісність з різними браузерами
        .pipe(cleanCSS())                     
        .pipe(gulp.dest("dist/css"))          
})

gulp.task("scripts", function() {             // oб'єднання і стиснення js-файлів 
    return gulp.src("app/js/*.js")
        .pipe(concat("script.min.js"))        
        .pipe(uglify())
        .pipe(gulp.dest("dist/js"))
})

gulp.task("imgs", function() {
    return gulp.src("app/img/*.+(png|jpg|jpeg)")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"))
})

gulp.task("browserSync", function() {
    browserSync.init({                         
        server: {
            baseDir: "dist/html"               // шлях до кореневої теки сервера
        }
    })
})

gulp.task("watch", function() {                // відслідковування змін у файлах  та виклик відповідних Gulp-завдань
    gulp.watch("app/*.html", gulp.series("html"))
    gulp.watch("app/js/*.js", gulp.series("scripts"))
    gulp.watch("app/sass/*.scss", gulp.series("sass"))
    gulp.watch("app/img/*.+(png|jpg|jpeg)", gulp.series("imgs"))
})

gulp.task("default", gulp.series(              // визначає послідовність операцій, які будуть виконуватися за замовчуванням
    "scripts", "html", "imgs", "sass",
     gulp.parallel("browserSync", "watch")))