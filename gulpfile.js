var gulp = require('gulp'), // gulp package
	bs = require('browser-sync').create(), // browser-sync package
	historyApiFallback = require('connect-history-api-fallback'), // all queries requested index file
	htmlmin = require('gulp-htmlmin'), // minification html files
	ngMin = require('gulp-ngmin'), // minification angular controllers
	ngAnnotate = require('gulp-ng-annotate'), // annotating angular controllers
	sass = require('gulp-sass'), // compile sass to css
	csso = require('gulp-csso'), // uglfify css
	autoprefixer = require('gulp-autoprefixer'), // autoprefix in css
	imagemin = require('gulp-imagemin'); // compress images

gulp.task('html', function() {
	gulp.src('./source/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./public'));
});

gulp.task('html-watch', ['html'], function(done) {
	bs.reload();
	done();
});

gulp.task('js', function() {
	gulp.src('./source/js/**/*.js')
		.pipe(ngAnnotate())
		.pipe(ngMin())
		.pipe(gulp.dest('./public/js'));
});

gulp.task('js-watch', ['js'], function(done) {
	bs.reload();
	done();
});

gulp.task('sass', function() {
	gulp.src('./source/styles/**/*.scss')
		.pipe(sass())
		.pipe(csso())
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('sass-watch', ['sass'], function(done) {
	bs.reload();
	done();
});

gulp.task('css', function() {
	gulp.src('./source/styles/**/*.css')
		.pipe(csso())
		.pipe(gulp.dest('./public/styles'));
});

gulp.task('css-watch', ['css'], function(done) {
	bs.reload();
	done();
});

gulp.task('imagemin', function() {
	gulp.src('./source/native/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./public/native'));
});

gulp.task('data', function() {
	gulp.src('./source/data/**/*.json')
		.pipe(gulp.dest('./public/data'));
});

gulp.task('data-watch', ['data'], function(done) {
	bs.reload();
	done();
});

gulp.task('serve', ['html', 'js', 'sass', 'css', 'imagemin', 'data'], function() {
	bs.init({
		server: {
			baseDir: './public',
			middleware: [ historyApiFallback() ]
		},
		notify: false
	});

	gulp.watch('./source/**/*.html', ['html-watch']);
	gulp.watch('./source/js/**/*.js', ['js-watch']);
	gulp.watch('./source/styles/**/*.scss', ['sass-watch']);
	gulp.watch('./source/styles/**/*.css', ['css-watch']);
	gulp.watch('./source/data/**/*.json', ['data-watch']);
});

gulp.task('default', ['serve']);

gulp.task('dev-build', function() {
	gulp.src('./source/**/*.html')
		.pipe(gulp.dest('./public'));

	gulp.src('./source/js/**/*')
		.pipe(gulp.dest('./public/js'));

	gulp.src('./source/styles/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('./public/styles'));

	gulp.src('./source/styles/**/*.css')
		.pipe(gulp.dest('./public/styles'));

	gulp.src('./source/native/**/*')
		.pipe(gulp.dest('./public/native'));

	gulp.src('./source/data/**/*')
		.pipe(gulp.dest('./public/data'));
});

gulp.task('build', function() {
	gulp.src('./source/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build'));

	gulp.src('./source/js/**/*.js')
		.pipe(ngAnnotate())
		.pipe(ngMin())
		.pipe(gulp.dest('./build/js'));

	gulp.src('./source/styles/**/*.scss')
		.pipe(sass())
		.pipe(csso())
		.pipe(autoprefixer({browsers: ['last 2 version']}))
		.pipe(gulp.dest('./build/styles'));

	gulp.src('./source/styles/**/*.css')
		.pipe(csso())
		.pipe(gulp.dest('./build/styles'));

	gulp.src('./source/native/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/native'));

	gulp.src('./source/data/**/*')
		.pipe(gulp.dest('./build/data'));
});
