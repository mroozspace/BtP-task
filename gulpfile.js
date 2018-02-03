const gulp = require("gulp"),
			sass = require("gulp-sass"),
			uglify = require("gulp-uglify"),
			HTMLmin = require("gulp-minify-html"),
			concat = require("gulp-concat"),
			autoprefixer = require("gulp-autoprefixer"),
			browserSync = require("browser-sync").create();
			
//HTML minify
gulp.task("html", ()=>{
	gulp.src("src/views/*.html")
		.pipe(HTMLmin())
		.pipe(gulp.dest("dest"))
});

// Img and Icons copy
gulp.task("img", ()=>{
	gulp.src("src/public/img/*.*")
		.pipe(gulp.dest("dest/public/img"))
	gulp.src("src/public/icons/*.*")
		.pipe(gulp.dest("dest/public/icons"))
	gulp.src("src/views/*.png")
		.pipe(gulp.dest("dest"))	
});
		
// Javascript copy&minify
gulp.task("js", ()=>{
	gulp.src("src/public/js/*.js")
		.pipe(concat("main.js"))
		// .pipe(uglify())
		.pipe(gulp.dest("dest/public/js"))
});

// sass compile
gulp.task("sass", ()=>{
	return gulp.src("src/public/stylesheets/**/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 2 versions"],
			cascade: false
		}))
		.pipe(gulp.dest("dest/public/stylesheets/css"))
		.pipe(browserSync.stream()); //stream to browser
});

gulp.task("default", ["html", "img", "js", "sass"]);

// watch&serve
gulp.task("serve", ["sass"], ()=>{

	browserSync.init({
		server: "./dest"
	});

	gulp.watch("src/public/stylesheets/**/*.scss", ["sass"]);
	gulp.watch("src/public/js/*.js", ["js"]).on("change", browserSync.reload);
	gulp.watch("src/views/*.html", ["html"]).on("change", browserSync.reload);
});		